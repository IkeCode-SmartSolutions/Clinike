///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/bootstrap/bootstrap.d.ts" />
///<reference path="typings/knockout/knockout.d.ts" />
///<reference path="typings/knockout.mapping/knockout.mapping.d.ts" />
///<reference path="typings/moment/moment.d.ts" />
///<reference path="typings/requirejs/require.d.ts" />
///<reference path="typings/custom/custom.d.ts" />
module ClinikeAjax {
    interface IkeCodeResult {
        Content: any;
        Status: string;
    }

    interface IkeCodeResultListModel {
        Offset: number;
        Limit: number;
        TotalCount: number;
        Items: any;
    }

    interface IkeCodeResultList {
        Content: IkeCodeResultListModel[];
        Status: string;
    }

    export class Ajax {
        private successCallback: (data: any) => any;
        private errorCallback: (data: JQueryXHR) => any;

        private defaultSuccessCallback = (data: any): any => {
            if (data.Status == 'Success') {
                if (this.successCallback)
                    this.successCallback(data);
            } else {
                this.defaultErrorCallback(data);
            }
        }

        private defaultErrorCallback = (data: JQueryXHR): any => {
            swal({
                title: "Ooops..."
                , text: "Ocorreu um problema em sua requisição, tente novamente!"
                , type: "error"
            });

            if (this.errorCallback)
                this.errorCallback(data);
        }

        private defaults: JQueryAjaxSettings = {
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
        constructor(settings: JQueryAjaxSettings
            , successCallback: (data: any) => any
            , errorCallback?: (data: any) => any) {

        }
    }
}

