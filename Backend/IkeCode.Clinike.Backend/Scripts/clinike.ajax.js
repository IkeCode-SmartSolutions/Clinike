///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/bootstrap/bootstrap.d.ts" />
///<reference path="typings/knockout/knockout.d.ts" />
///<reference path="typings/knockout.mapping/knockout.mapping.d.ts" />
///<reference path="typings/moment/moment.d.ts" />
///<reference path="typings/requirejs/require.d.ts" />
///<reference path="typings/custom/custom.d.ts" />
var ClinikeAjax;
(function (ClinikeAjax) {
    class Ajax {
        constructor(settings, successCallback, errorCallback) {
            this.defaultSuccessCallback = (data) => {
                if (data.Status == 'Success') {
                    if (this.successCallback)
                        this.successCallback(data);
                }
                else {
                    this.defaultErrorCallback(data);
                }
            };
            this.defaultErrorCallback = (data) => {
                swal({
                    title: "Ooops...",
                    text: "Ocorreu um problema em sua requisição, tente novamente!",
                    type: "error"
                });
                if (this.errorCallback)
                    this.errorCallback(data);
            };
            this.defaults = {
                contentType: "application/json",
                async: true,
                dataType: "json",
                type: 'GET',
                success: (data) => {
                    $log.verbose('Clinike.Ajax :: result', data);
                    this.defaultSuccessCallback(data);
                },
                error: this.defaultErrorCallback
            };
        }
    }
    ClinikeAjax.Ajax = Ajax;
})(ClinikeAjax || (ClinikeAjax = {}));
//# sourceMappingURL=clinike.ajax.js.map