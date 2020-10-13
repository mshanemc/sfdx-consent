# `sfdx-sosl`

[![npm version](https://badge.fury.io/js/%40mshanemc%2Fsfdx-sosl.svg)](https://badge.fury.io/js/%40mshanemc%2Fsfdx-sosl)

SOSL via CLI plugin

# Usage

Install like this:

`sfdx plugins:install @mshanemc/sfdx-sosl`

Command inventory:

```
$ sfdx sosl --help
```

# Commands

<!-- commands -->
* [`sfdx consent:export -p <string> -i <id> [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-consentexport--p-string--i-id--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx consent:export -p <string> -i <id> [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

export data using a portability policy

```
USAGE
  $ sfdx consent:export -p <string> -i <id> [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -i, --recordid=recordid                                                           (required) record ID for a
                                                                                    User/Lead/Contact/PersonAccount/Indi
                                                                                    vidual

  -p, --policy=policy                                                               (required) API name of a portability
                                                                                    policy

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

  --verbose                                                                         emit additional command output to
                                                                                    stdout

EXAMPLE
  sfdx consent:export -p SomePortabilityPolicy -i 0PK0t000000heLTGAY
```

_See code: [src/commands/consent/export.ts](https://github.com/mshanemc/sfdx-consent/blob/v1.3.0/src/commands/consent/export.ts)_
<!-- commandsstop -->
