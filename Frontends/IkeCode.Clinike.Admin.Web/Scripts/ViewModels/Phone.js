///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.mask.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.bootgrid.d.ts" />
///<reference path="../typings/bootstrap/bootstrap.d.ts" />
///<reference path="../typings/knockout/knockout.d.ts" />
///<reference path="../typings/knockout.mapping/knockout.mapping.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PhoneModule;
(function (PhoneModule) {
    var KoViewModel = (function (_super) {
        __extends(KoViewModel, _super);
        function KoViewModel(targetSelector, saveCallback) {
            var _this = this;
            _super.call(this);
            this.PhoneTypes = ko.observable();
            this._validationGroup = ko.validatedObservable(this);
            this._validationErrors = ko.validation.group(this);
            this.Init = function () {
                if (_this._targetSelector) {
                    common.GetJsonEnum('PhoneType', null, null, function (data) {
                        _this.PhoneTypes(data);
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
                        url: '/Phone/Post',
                        data: dataJS,
                        type: 'POST',
                        dataType: 'json',
                        success: function (data, textStatus, jqXHR) {
                            if (common.EnableLogGlobal) {
                                console.log('textStatus', textStatus);
                                console.log('data', data);
                            }
                            var oldId = _this.Id;
                            _this.Update(data.Record);
                            if (common.EnableLogGlobal) {
                                console.log('this.Id', _this.Id);
                            }
                            _this._saveCallback(oldId, data);
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    });
                }
            };
            if (common.EnableLogGlobal) {
                console.log('Phone ctor');
            }
            this._saveCallback = saveCallback;
            if (targetSelector) {
                this._targetSelector = targetSelector;
                this.PhoneTypeId.extend({ required: { params: true, message: '* obrigatório' }, min: { params: -1, message: '* obrigatório' } });
            }
        }
        return KoViewModel;
    })(KoPhone);
    PhoneModule.KoViewModel = KoViewModel;
    var GridViewModel = (function (_super) {
        __extends(GridViewModel, _super);
        function GridViewModel(_parentId) {
            var _this = this;
            _super.call(this);
            this._gridSelector = '#phonesGrid';
            this._modalSelector = '#phoneEditorModal';
            this._parentId = 0;
            this._parentId = _parentId;
            this.phoneViewModel = new PhoneModule.KoViewModel('#phoneEditorModal div[data-type="kobind"]', function (oldId, parsedData) {
                $(_this._modalSelector).modal('hide');
                $(_this._gridSelector).bootgrid('reload');
            });
            common.GetJsonEnum('PhoneType');
        }
        GridViewModel.prototype.Delete = function () {
            var _this = this;
            if (common.EnableLogGlobal) {
                console.log('Phone Delete');
            }
            confirmModal.Show({
                Title: 'Confirmação',
                Message: 'Deseja realmente excluir o registro selecionado?',
                ConfirmCallback: function () {
                    $.ajax({
                        url: '/Phone/Delete',
                        data: { id: _this.SelectedRow.Id },
                        type: 'POST',
                        dataType: 'json',
                        success: function (data, textStatus, jqXHR) {
                            if (common.EnableLogGlobal) {
                                console.log('Delete Success');
                                console.log('data', data);
                                console.log('textStatus', textStatus);
                            }
                            var newPoco = new PhonePoco();
                            newPoco.PersonId = _this.SelectedRow.PersonId;
                            _this.phoneViewModel.Update(newPoco);
                            if (common.EnableLogGlobal) {
                                console.log('this.Id', _this.SelectedRow.Id);
                            }
                            $(_this._gridSelector).bootgrid('reload');
                        },
                        error: function (err) {
                            if (common.EnableLogGlobal) {
                                console.log('Phone Delete Error!', err);
                            }
                        }
                    });
                }
            });
        };
        GridViewModel.prototype.LoadDataGrid = function (selector) {
            var _this = this;
            if (selector === void 0) { selector = this._gridSelector; }
            $(this._gridSelector).bootgrid(this.GetBootgridOptions({
                url: "/phone/GetList",
                post: function () {
                    return {
                        personId: _this._parentId
                    };
                },
                formatters: {
                    "Number": function (column, row) {
                        return '<span name="spanNumber">' + row.Number + '</span>';
                    },
                    "commands": this.GetDefaultCommands
                }
            }))
                .on("loaded.rs.jquery.bootgrid", function (e) {
                if (common.EnableLogGlobal) {
                    console.log('Phone (loaded.rs.jquery.bootgrid) -> e', e);
                }
                $('[name="spanNumber"]').each(function () {
                    var val = $(this).text();
                    var result = val.length == 10 || val.length == 14 ? '(00) 0000-0000' : '(00) 00000-0000';
                    $(this).mask(result);
                });
                _this.phoneViewModel.Init();
                $(_this._gridSelector).find(".command-edit")
                    .on("click", function (e) {
                    var row = _this.GetCurrentRow(_this._gridSelector, e);
                    _this.ShowModal(_this.SelectedRow);
                })
                    .end().find(".command-delete").on("click", function (e) {
                    var row = _this.GetCurrentRow(_this._gridSelector, e);
                    _this.phoneViewModel.Update(row);
                    _this.Delete();
                })
                    .end().parent().find(".bootgrid-header .command-add").on("click", function () {
                    var newPoco = new PhonePoco();
                    newPoco.PersonId = _this._parentId;
                    _this.ShowModal(newPoco);
                });
            });
        };
        GridViewModel.prototype.ShowModal = function (objToUpdate) {
            if (common.EnableLogGlobal) {
                console.log('objToUpdate', objToUpdate);
            }
            this.phoneViewModel.Update(objToUpdate);
            $(this._modalSelector).modal('show');
            $('input[data-mask="phoneNumber"]').each(function () {
                var val = $(this).text();
                var result = val.length == 10 || val.length == 14 ? '(00) 0000-0000' : '(00) 00000-0000';
                $(this).mask(result);
            });
            var maskBehavior = function (val) {
                return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
            }, options = {
                onKeyPress: function (val, e, field, options) {
                    field.mask(maskBehavior.apply({}, arguments), options);
                }
            };
            $('input[data-mask="phoneNumber"]').mask(maskBehavior, options);
        };
        return GridViewModel;
    })(BaseDataGridModel);
    PhoneModule.GridViewModel = GridViewModel;
})(PhoneModule || (PhoneModule = {}));
