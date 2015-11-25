///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.easyui.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.mask.d.ts" />
///<reference path="../typings/bootstrap/bootstrap.d.ts" />
///<reference path="../typings/knockout/knockout.d.ts" />
///<reference path="../typings/knockout.mapping/knockout.mapping.d.ts" />
var ViewHelpers;
(function (ViewHelpers) {
    var ConfirmModalModel = (function () {
        function ConfirmModalModel() {
            var _this = this;
            this._targetSelector = '#confirmModal';
            this.Title = ko.observable('');
            this.Message = ko.observable('');
            this.CancelCallback = function () {
                if (_this._cancelCallback) {
                    _this._cancelCallback();
                }
            };
            this.ConfirmCallback = function () {
                if (_this._confirmCallback) {
                    _this._confirmCallback();
                }
                $(_this._targetSelector).modal('hide');
            };
            this.Show = function (modelData) {
                if ($(_this._targetSelector).length == 0) {
                    $.ajax({
                        url: '/Helpers/GetConfirmModal',
                        success: function (data) {
                            $('body').append(data);
                            if (modelData) {
                                _this.Update(modelData);
                            }
                            var vm = ko.mapping.fromJS(_this);
                            var target = $(_this._targetSelector).get(0);
                            ko.cleanNode(target);
                            ko.applyBindings(vm, target);
                            $(_this._targetSelector).modal('show');
                        }
                    });
                }
                else {
                    if (modelData) {
                        _this.Update(modelData);
                    }
                    $(_this._targetSelector).modal('show');
                }
            };
        }
        ConfirmModalModel.prototype.Update = function (data) {
            this.Title(data.Title);
            this.Message(data.Message);
            this._cancelCallback = data.CancelCallback;
            this._confirmCallback = data.ConfirmCallback;
        };
        return ConfirmModalModel;
    })();
    ViewHelpers.ConfirmModalModel = ConfirmModalModel;
})(ViewHelpers || (ViewHelpers = {}));
var confirmModal = new ViewHelpers.ConfirmModalModel();
