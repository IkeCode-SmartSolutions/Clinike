///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/bootstrap/bootstrap.d.ts" />
///<reference path="typings/knockout/knockout.d.ts" />
///<reference path="typings/knockout.mapping/knockout.mapping.d.ts" />
///<reference path="typings/moment/moment.d.ts" />
///<reference path="typings/requirejs/require.d.ts" />
///<reference path="typings/custom/custom.d.ts" />
module Clinike {
    export interface IkeCodeResult<T> {
        Content: T;
        Status: string;
    }

    export interface IkeCodeResultListModel {
        Offset: number;
        Limit: number;
        TotalCount: number;
        Items: any;
    }

    export class Ajax<TAjaxResult> {
        private _successCallback: (data: any) => any;
        private _errorCallback: (data: JQueryXHR) => any;
        private _parseIkeCodeResult: boolean = true;

        private _settingsFactory = (settings: JQueryAjaxSettings): JQueryAjaxSettings => {
            var defaults = {
                contentType: "application/json",
                async: true,
                dataType: "json",
                type: 'GET'
            };

            var callbacks = {
                success: (data: IkeCodeResult<TAjaxResult>): any => {
                    $log.verbose('Clinike.Ajax {0} :: result', data);
                    if (this._successCallback) {
                        this._successCallback(data);
                    }
                    else if (this._parseIkeCodeResult) {
                        this.defaultSuccessCallback(data);
                    }
                },
                error: (data): any => {
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
        }

        private defaultSuccessCallback = (data: IkeCodeResult<TAjaxResult>): any => {
            if (data.Status == 'Success') {
                if (this._successCallback)
                    this._successCallback(data);
            } else {
                this.defaultErrorCallback(data);
            }
        }

        private defaultErrorCallback = (data: any): any => {
            $log.error('Clinike.Ajax {0} :: Error data', data);

            swal({
                title: "Ooops..."
                , text: "Ocorreu um problema em sua requisição, tente novamente!"
                , type: "error"
            });

            if (this._errorCallback)
                this._errorCallback(data);
        }

        constructor(settings: JQueryAjaxSettings, successCallback?: (data: any) => any, errorCallback?: (data: any) => any
            , parseIkeCodeResult: boolean = true) {

            this._successCallback = successCallback;
            this._errorCallback = errorCallback;
            this._parseIkeCodeResult = parseIkeCodeResult;

            var ajaxSettings = this._settingsFactory(settings);

            $.ajax(ajaxSettings);
        }
    }
}
