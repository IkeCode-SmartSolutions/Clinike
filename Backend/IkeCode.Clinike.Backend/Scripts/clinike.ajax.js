///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/bootstrap/bootstrap.d.ts" />
///<reference path="typings/knockout/knockout.d.ts" />
///<reference path="typings/knockout.mapping/knockout.mapping.d.ts" />
///<reference path="typings/moment/moment.d.ts" />
///<reference path="typings/requirejs/require.d.ts" />
///<reference path="typings/custom/custom.d.ts" />
var Clinike;
(function (Clinike) {
    class Ajax {
        constructor(settings, successCallback, errorCallback, parseIkeCodeResult = true) {
            this._parseIkeCodeResult = true;
            this._settingsFactory = (settings) => {
                var defaults = {
                    contentType: "application/json",
                    async: true,
                    dataType: "json",
                    type: 'GET'
                };
                var callbacks = {
                    success: (data) => {
                        $log.verbose('Clinike.Ajax {0} :: result', data);
                        if (this._successCallback) {
                            this._successCallback(data);
                        }
                        else if (this._parseIkeCodeResult) {
                            this.defaultSuccessCallback(data);
                        }
                    },
                    error: (data) => {
                        if (this._errorCallback) {
                            this._errorCallback(data);
                        }
                        else {
                            this.defaultErrorCallback(data);
                        }
                    }
                };
                var merged = $.extend(true, {}, defaults, settings, callbacks);
                return merged;
            };
            this.defaultSuccessCallback = (data) => {
                if (data.Status == 'Success') {
                    if (this._successCallback)
                        this._successCallback(data);
                }
                else {
                    this.defaultErrorCallback(data);
                }
            };
            this.defaultErrorCallback = (data) => {
                $log.error('Clinike.Ajax {0} :: Error data', data);
                swal({
                    title: "Ooops...",
                    text: "Ocorreu um problema em sua requisição, tente novamente!",
                    type: "error"
                });
                if (this._errorCallback)
                    this._errorCallback(data);
            };
            this._successCallback = successCallback;
            this._errorCallback = errorCallback;
            this._parseIkeCodeResult = parseIkeCodeResult;
            var ajaxSettings = this._settingsFactory(settings);
            $.ajax(ajaxSettings);
        }
    }
    Clinike.Ajax = Ajax;
})(Clinike || (Clinike = {}));
//# sourceMappingURL=clinike.ajax.js.map