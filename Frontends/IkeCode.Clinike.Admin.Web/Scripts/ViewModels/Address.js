///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.mask.d.ts" />
///<reference path="../typings/bootstrap/bootstrap.d.ts" />
///<reference path="../typings/knockout/knockout.d.ts" />
///<reference path="../typings/knockout.mapping/knockout.mapping.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AddressModule;
(function (AddressModule) {
    var KoViewModel = (function (_super) {
        __extends(KoViewModel, _super);
        function KoViewModel(targetSelector, saveCallback) {
            var _this = this;
            _super.call(this);
            this._validationGroup = ko.validatedObservable(this);
            this._validationErrors = ko.validation.group(this);
            this.AddressTypes = ko.observable();
            this.Apply = function () {
                if (_this._targetSelector) {
                    common.GetJsonEnum('AddressType', null, null, function (data) {
                        _this.AddressTypes(data);
                    });
                    var vm = ko.mapping.fromJS(_this);
                    var target = $(_this._targetSelector).get(0);
                    ko.cleanNode(target);
                    ko.applyBindings(vm, target);
                }
            };
            this.Save = function () {
                var dataJS = _this.toJS();
                if (common.EnableLogGlobal) {
                    console.log('dataJS', dataJS);
                }
                if (!_this._validationGroup.isValid()) {
                    _this._validationErrors.showAllMessages();
                }
                else {
                    $.ajax({
                        url: '/Address/Post',
                        data: dataJS,
                        type: 'POST',
                        dataType: 'json',
                        success: function (data, textStatus, jqXHR) {
                            if (common.EnableLogGlobal) {
                                console.log('textStatus', textStatus);
                                console.log('data', data);
                            }
                            var oldId = _this.Id();
                            _this.Update(data.Record);
                            if (common.EnableLogGlobal) {
                                console.log('this.Id', _this.Id);
                            }
                            _this._saveCallback(data, oldId > 0);
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    });
                }
            };
            if (common.EnableLogGlobal) {
                console.log('Address ctor');
            }
            this._saveCallback = saveCallback;
            if (targetSelector) {
                this._targetSelector = targetSelector;
                this.AddressTypeId.extend({ required: { params: true, message: '* obrigatório' }, min: { params: 1, message: '* obrigatório' } });
            }
        }
        return KoViewModel;
    })(KoAddress);
    AddressModule.KoViewModel = KoViewModel;
    var GridViewModel = (function (_super) {
        __extends(GridViewModel, _super);
        function GridViewModel(_parentId) {
            var _this = this;
            _super.call(this);
            this._gridSelector = '#addressesGrid';
            this._modalSelector = '#addressEditorModal';
            this._parentId = 0;
            this.LoadDataGrid = function (selector) {
                if (selector === void 0) { selector = _this._gridSelector; }
                $(_this._gridSelector).bootgrid(_this.GetBootgridOptions({
                    url: "/Address/GetList",
                    post: function () {
                        return {
                            personId: _this._parentId
                        };
                    },
                    formatters: {
                        "ZipCode": function (column, row) {
                            return '<span name="spanZipCode">' + row.ZipCode + '</span>';
                        },
                        "commands": _this.GetDefaultCommands
                    }
                }))
                    .on("loaded.rs.jquery.bootgrid", function (e) {
                    if (common.EnableLogGlobal) {
                        console.log('Address (loaded.rs.jquery.bootgrid) -> e', e);
                    }
                    _this.addressViewModel.Apply();
                    $('[name="spanZipCode"]').mask('00000-000');
                    $(_this._gridSelector).find(".command-edit")
                        .on("click", function (e) {
                        var row = _this.GetCurrentRow(_this._gridSelector, e);
                        _this.ShowModal(_this.SelectedRow);
                    })
                        .end().find(".command-delete").on("click", function (e) {
                        var row = _this.GetCurrentRow(_this._gridSelector, e);
                        _this.addressViewModel.Update(row);
                        _this.Delete();
                    })
                        .end().parent().find(".bootgrid-header .command-add").on("click", function () {
                        var newPoco = new PhonePoco();
                        newPoco.PersonId = _this._parentId;
                        _this.ShowModal(newPoco);
                    });
                });
            };
            this.ShowModal = function (objToUpdate) {
                if (common.EnableLogGlobal) {
                    console.log('objToUpdate', objToUpdate);
                }
                _this.addressViewModel.Update(objToUpdate);
                $(_this._modalSelector).modal('show');
                $('input[data-mask="zipCode"]').mask('00000-000');
            };
            this._parentId = _parentId;
            this.addressViewModel = new AddressModule.KoViewModel('#addressEditorModal div[data-type="kobind"]', function (oldId, data) {
                $(_this._modalSelector).modal('hide');
                $(_this._gridSelector).bootgrid('reload');
            });
            common.GetJsonEnum('AddressType');
        }
        GridViewModel.prototype.Delete = function () {
            var _this = this;
            if (common.EnableLogGlobal) {
                console.log('Address Delete');
            }
            confirmModal.Show({
                Title: 'Confirmação',
                Message: 'Deseja realmente excluir o registro selecionado?',
                ConfirmCallback: function () {
                    $.ajax({
                        url: '/Address/Delete',
                        data: { id: _this.SelectedRow.Id },
                        type: 'POST',
                        dataType: 'json',
                        success: function (data, textStatus, jqXHR) {
                            if (common.EnableLogGlobal) {
                                console.log('Delete Success');
                                console.log('data', data);
                                console.log('textStatus', textStatus);
                            }
                            var newPoco = new AddressPoco();
                            newPoco.PersonId = _this.SelectedRow.PersonId;
                            _this.addressViewModel.Update(newPoco);
                            if (common.EnableLogGlobal) {
                                console.log('this.Id', _this.SelectedRow.Id);
                            }
                            $(_this._gridSelector).bootgrid('reload');
                        },
                        error: function (err) {
                            if (common.EnableLogGlobal) {
                                console.log('Delete Error!', err);
                            }
                        }
                    });
                }
            });
        };
        return GridViewModel;
    })(BaseDataGridModel);
    AddressModule.GridViewModel = GridViewModel;
})(AddressModule || (AddressModule = {}));
;
