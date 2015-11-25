///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.easyui.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.mask.d.ts" />
///<reference path="../typings/bootstrap/bootstrap.d.ts" />
///<reference path="../typings/knockout/knockout.d.ts" />
///<reference path="../typings/knockout.mapping/knockout.mapping.d.ts" />

module ViewHelpers {
    export interface IConfirmModalModelSettings {
        Title?: string;
        Message: string;
        CancelCallback?: () => any;
        ConfirmCallback?: () => any;
    }

    export class ConfirmModalModel {
        private _targetSelector: string = '#confirmModal';
        private _cancelCallback: () => any;
        private _confirmCallback: () => any;

        Title: KnockoutObservable<string> = ko.observable('');
        Message: KnockoutObservable<string> = ko.observable('');

        public CancelCallback = () => {
            if (this._cancelCallback) {
                this._cancelCallback();
            }
        }

        public ConfirmCallback = () => {
            if (this._confirmCallback) {
                this._confirmCallback();
            }
            $(this._targetSelector).modal('hide');
        }

        public Update(data: IConfirmModalModelSettings): any {
            this.Title(data.Title);
            this.Message(data.Message);
            this._cancelCallback = data.CancelCallback;
            this._confirmCallback = data.ConfirmCallback;
        }

        public Show = (modelData?: IConfirmModalModelSettings) => {
            if ($(this._targetSelector).length == 0) {
                $.ajax({
                    url: '/Helpers/GetConfirmModal'
                    , success: (data) => {
                        $('body').append(data);

                        if (modelData) {
                            this.Update(modelData);
                        }
                        var vm = ko.mapping.fromJS(this);
                        
                        var target = $(this._targetSelector).get(0);
                        ko.cleanNode(target);
                        ko.applyBindings(vm, target);

                        $(this._targetSelector).modal('show');
                    }
                });
            } else {
                if (modelData) {
                    this.Update(modelData);
                }

                $(this._targetSelector).modal('show');
            }
        }
    }
}
var confirmModal = new ViewHelpers.ConfirmModalModel();