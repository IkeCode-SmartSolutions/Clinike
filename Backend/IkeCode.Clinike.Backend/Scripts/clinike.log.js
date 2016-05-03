///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/bootstrap/bootstrap.d.ts" />
///<reference path="typings/knockout/knockout.d.ts" />
///<reference path="typings/knockout.mapping/knockout.mapping.d.ts" />
///<reference path="typings/moment/moment.d.ts" />
///<reference path="typings/requirejs/require.d.ts" />
///<reference path="typings/custom/custom.d.ts" />
"use strict";
var Clinike;
(function (Clinike) {
    class Log {
        constructor() {
            this.globalEnabled = true;
            this.write = (identifier, message, data) => {
                try {
                    if (this.globalEnabled && console !== undefined && console != null
                        && console.log !== undefined && console.log != null) {
                        var parsedData = data !== undefined && data != null ? data : '';
                        console.log('[{0}] {1}'.format(identifier, message), parsedData);
                    }
                }
                catch (ex) { }
            };
            this.checkpointEnabled = true;
            this.checkpoint = (message, data) => {
                this.write('CHECKPOINT', message, data);
            };
            this.verboseEnabled = true;
            this.verbose = (message, data) => {
                this.write('VERBOSE', message, data);
            };
            this.infoEnabled = false;
            this.info = (message, data) => {
                this.write('INFO', message, data);
            };
            this.warningEnabled = true;
            this.warning = (message, data) => {
                this.write('WARNING', message, data);
            };
            this.errorEnabled = true;
            this.error = (message, data) => {
                this.write('ERROR', message, data);
            };
        }
    }
    Clinike.Log = Log;
})(Clinike || (Clinike = {}));
var $log = new Clinike.Log();
//# sourceMappingURL=clinike.log.js.map