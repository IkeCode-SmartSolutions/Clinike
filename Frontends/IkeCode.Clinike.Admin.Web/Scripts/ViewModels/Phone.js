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
            this._toolBarSelector = '#phonesToolbar';
            this._gridSelector = '#phonesGrid';
            this._modalSelector = '#phoneEditorModal';
            this._parentId = 0;
            this._parentId = _parentId;
            this.phoneViewModel = new PhoneModule.KoViewModel('#phoneEditorModal div[data-type="kobind"]', function (oldId, parsedData) {
                $(_this._modalSelector).modal('hide');
                //if (oldId > 0) {
                //    $(this._gridSelector).datagrid('updateRow', { index: this.SelectedIndex, row: parsedData.Record });
                //} else {
                //    $(this._gridSelector).datagrid('appendRow', parsedData.Record);
                //}
            });
            common.GetJsonEnum('PhoneType');
            $(this._toolBarSelector).find('button[data-buttontype="add"]').bind('click', function () {
                var newPoco = new PhonePoco();
                newPoco.PersonId = _this._parentId;
                _this.ShowModal(newPoco);
            });
            $(this._toolBarSelector).find('button[data-buttontype="edit"]').bind('click', function () {
                _this.ShowModal(_this.SelectedRow);
            });
            $(this._toolBarSelector).find('button[data-buttontype="delete"]').bind('click', function () {
                _this.Delete();
            });
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
                                console.log('this.SelectedIndex', _this.SelectedIndex);
                            }
                            $(_this._toolBarSelector).find('button[data-buttontype="edit"], button[data-buttontype="delete"]').attr('disabled', 'disabled');
                            //$(this._gridSelector).datagrid('deleteRow', this.SelectedIndex);
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
            //$(selector).datagrid({
            //    idField: 'Id'
            //    , toolbar: this._toolBarSelector
            //    , rownumbers: true
            //    , pagination: true
            //    , singleSelect: true
            //    , striped: true
            //    , loadMsg: dataGridHelper.LoadMessage
            //    , columns: [[
            //        { field: 'Id', title: 'Id', hidden: true }
            //        , { field: 'PersonId', title: 'PersonId', hidden: true }
            //        , { field: 'DateIns', title: 'DateIns', hidden: true }
            //        , { field: 'LastUpdate', title: 'LastUpdate', hidden: true }
            //        , {
            //            field: 'Number'
            //            , title: 'Número'
            //            , width: 200
            //            , formatter: function (value, row, index) {
            //                return '<span name="spanNumber">' + value + '</span>';
            //            }
            //        }
            //        , { field: 'PhoneType', title: 'Tipo', width: 200 }
            //    ]]
            //    , onClickRow: (index, row) => {
            //        this.OnClickRow(index, row);
            //    }
            //    , onDblClickRow: (index, row) => {
            //        this.OnClickRow(index, row);
            //    }
            //    , loader: (param, success, error) => {
            //        dataGridHelper.Loader('/Phone/GetList', { personId: this._parentId }, success, error);
            //    }
            //    , onLoadSuccess: (items) => {
            var _this = this;
            if (selector === void 0) { selector = this._gridSelector; }
            //        if (common.EnableLogGlobal) {
            //            console.log('phone.LoadDataGrid onLoadSuccess');
            //        }
            //        dataGridHelper.CollapseBoxAfterLoad(this._gridSelector);
            //        $('[name="spanNumber"]').mask('(00) 00000-0000');
            //        this.phoneViewModel.Init();
            //    }
            //});
            $(this._gridSelector).bootgrid({
                ajax: true,
                ajaxSettings: {
                    method: "GET",
                    cache: false
                },
                url: "/phone/GetList",
                post: function () {
                    return {
                        personId: _this._parentId
                    };
                },
                selection: true,
                multiSelect: false,
                rowSelect: true,
                keepSelection: true,
                formatters: {
                    "Number": function (column, row) {
                        console.log('column', column);
                        console.log('row', row);
                        return '<span name="spanNumber">' + row.Number + '</span>';
                    }
                }
            }).on("selected.rs.jquery.bootgrid", function (e, selectedRows) {
                console.log('e', e);
                console.log('selectedRows', selectedRows);
                console.log('this', _this);
            }).on("loaded.rs.jquery.bootgrid", function (e) {
                console.log('e', e);
                var maskBehavior = function (val) {
                    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
                };
                var options = {
                    onKeyPress: function (val, e, field, options) {
                        field.mask(maskBehavior.apply({}, arguments), options);
                    }
                };
                $('[name="spanNumber"]').mask(maskBehavior, options);
                _this.phoneViewModel.Init();
            });
        };
        GridViewModel.prototype.OnClickRow = function (index, row) {
            this.SelectedIndex = index;
            this.SelectedRow = row;
            this.phoneViewModel.Update(row);
            $(this._toolBarSelector).find('button[data-buttontype="edit"], button[data-buttontype="delete"]').removeAttr('disabled');
        };
        GridViewModel.prototype.ShowModal = function (objToUpdate) {
            if (common.EnableLogGlobal) {
                console.log('objToUpdate', objToUpdate);
            }
            this.phoneViewModel.Update(objToUpdate);
            $(this._modalSelector).modal('show');
            $('input[data-mask="phoneNumber"]').mask('(00) 00000-0000');
        };
        return GridViewModel;
    })(BaseDataGridModel);
    PhoneModule.GridViewModel = GridViewModel;
})(PhoneModule || (PhoneModule = {}));
