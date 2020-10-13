import { flags, SfdxCommand } from '@salesforce/command';
import { retry } from '@lifeomic/attempt';

export default class DataExport extends SfdxCommand {
    public static description = `export data using a portability policy`;

    public static examples = [
        `sfdx consent:export -p SomeConsentPolicy -i customerID"
        `,
        `sfdx force:data:sosl:query -q "find {Jack} returning User(Name), Account(Name),Contact(FirstName,LastName,Department)" -u platformers
// search across several objects with different results fields on a specified org
`
    ];

    protected static flagsConfig = {
        policy: flags.string({
            char: 'p',
            description: 'API name of a portability policy',
            required: true
        }),
        recordid: flags.id({
            char: 'i',
            description: 'record ID for a User/Lead/Contact/PersonAccount/Individual',
            required: true
        }),
        verbose: flags.builtin()
    };

    protected static requiresUsername = true;

    public async run(): Promise<any> {
        const conn = this.org.getConnection();
        const url = `${conn.baseUrl()}/consent/dsr/rtp/execute`.replace('.com//', '.com/');
        this.ux.startSpinner('Request the portability file be generated');
        const createResult = (await conn.request({
            url,
            method: 'POST',
            body: JSON.stringify({
                dataSubjectId: this.flags.recordid,
                policyName: this.flags.policy
            })
        })) as any;
        if (!this.flags.json && this.flags.verbose) {
            this.ux.logJson(createResult);
        }
        this.ux.setSpinnerStatus('Waiting for file to be ready');
        const fileUrl = (await retry(
            async () => {
                const statusResponse = (await conn.request(`${url}?policyFileId=${createResult.result.policyFileId}`)) as any;
                if (statusResponse.result.policyFileStatus === 'Complete') {
                    return statusResponse.result.policyFileUrl;
                }
                throw new Error('not ready yet.  retry.');
            },
            {
                maxAttempts: 10,
                delay: 1000,
                factor: 2
            }
        )) as any;
        this.ux.stopSpinner(`file is ready at ${fileUrl}`);

        return {
            policyFileUrl: fileUrl,
            policyFileId: createResult.result.policyFileId
        };
    }
}
