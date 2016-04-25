///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/bootstrap/bootstrap.d.ts" />
///<reference path="typings/knockout/knockout.d.ts" />
///<reference path="typings/knockout.mapping/knockout.mapping.d.ts" />
///<reference path="typings/moment/moment.d.ts" />
///<reference path="typings/requirejs/require.d.ts" />
///<reference path="typings/custom/custom.d.ts" />
module Clinike {
    export interface ILog {
        write(type: string, message: string, data?: any): void;

        globalEnabled: boolean;

        checkpoint(message: string, data?: any): void;
        checkpointEnabled: boolean;

        verbose(message: string, data?: any): void;
        verboseEnabled: boolean;

        info(message: string, data?: any): void;
        infoEnabled: boolean;

        warning(message: string, data?: any): void;
        warningEnabled: boolean;

        error(message: string, data?: any): void;
        errorEnabled: boolean;
    }

    export class Log implements ILog {
        globalEnabled: boolean = true;

        write = (identifier: string, message: string, data?: any): void => {
            try {
                if (this.globalEnabled && console !== undefined && console != null
                    && console.log !== undefined && console.log != null) {
                    var parsedData = data !== undefined && data != null ? data : '';
                    console.log('[{0}] {1}'.format(identifier, message), parsedData);
                }
            }
            catch (ex) { }
        };

        checkpointEnabled: boolean = true;
        checkpoint = (message: string, data?: any): void => {
            this.write('CHECKPOINT', message, data);
        };

        verboseEnabled: boolean = true;
        verbose = (message: string, data?: any): void => {
            this.write('VERBOSE', message, data);
        };

        infoEnabled: boolean = false;
        info = (message: string, data?: any): void => {
            this.write('INFO', message, data);
        };

        warningEnabled: boolean = true;
        warning = (message: string, data?: any): void => {
            this.write('WARNING', message, data);
        };

        errorEnabled: boolean = true;
        error = (message: string, data?: any): void => {
            this.write('ERROR', message, data);
        }
    }
}

var $log = new Clinike.Log();

