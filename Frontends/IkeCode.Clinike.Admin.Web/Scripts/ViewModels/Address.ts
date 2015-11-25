///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.easyui.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.mask.d.ts" />
///<reference path="../typings/bootstrap/bootstrap.d.ts" />
///<reference path="../typings/knockout/knockout.d.ts" />
///<reference path="../typings/knockout.mapping/knockout.mapping.d.ts" />

module AddressModule {
    export class KoViewModel extends KoAddress {

        AddressTypes: KnockoutObservable<any> = ko.observable();
        private _targetSelector: string;
        private _saveCallback: (oldId: any, parsedData: any) => any;

        constructor(targetSelector: string, saveCallback: (oldId: any, parsedData: any) => any) {
            super();

            if (common.EnableLogGlobal) {
                console.log('Address ctor');
            }

            this._saveCallback = saveCallback;

            if (targetSelector) {
                this._targetSelector = targetSelector;

                this.ZipCode.subscribe((newValue) => {
                    console.log('newValue', newValue);
                });

                if (common.EnableLogGlobal) {
                    console.log('Address ctor -> this._targetSelector', this._targetSelector);
                }
            }
        }

        public Init = () => {
            if (this._targetSelector) {
                ko.validation.init({ decorateInputElement: true, errorClass: 'has-error', insertMessages: false });

                common.GetJsonEnum('AddressType'
                    , null
                    , null
                    , (data) => {
                        this.AddressTypes(data);
                    });

                var vm = ko.mapping.fromJS(this);

                var target = $(this._targetSelector).get(0);
                ko.cleanNode(target);
                ko.applyBindings(vm, target);
            }
        }

        public Save = () => {
            var dataJS = this.toJS();

            if (common.EnableLogGlobal) {
                console.log('dataJS', dataJS);
            }

            $.ajax({
                url: '/Address/Post'
                , data: dataJS
                , type: 'POST'
                , dataType: 'json'
                , success: (data, textStatus, jqXHR) => {
                    var oldId = this.Id;
                    var parsedData = $.parseJSON(data);

                    if (common.EnableLogGlobal) {
                        console.log('textStatus', textStatus);
                        console.log('parsedData', parsedData);
                    }

                    this.Update(parsedData.Record);

                    if (common.EnableLogGlobal) {
                        console.log('this.Id', this.Id);
                    }

                    this._saveCallback(oldId, parsedData);
                }
                , error: function (err) {
                    console.log(err);
                }
            });
        };
    }

    export class GridViewModel extends BaseDataGridModel implements IDataGridModel {
        _toolBarSelector: string = '#addressesToolbar';
        _gridSelector: string = '#addressesGrid';
        _modalSelector: string = '#addressEditorModal';
        addressViewModel: AddressModule.KoViewModel;

        constructor() {
            super();

            this.addressViewModel = new AddressModule.KoViewModel('#addressEditorModal div[data-type="kobind"]'
                , (oldId, parsedData) => {
                    $(this._modalSelector).modal('hide');
                    if (oldId > 0) {
                        $(this._gridSelector).datagrid('updateRow', { index: this.SelectedIndex, row: parsedData.Record });
                    } else {
                        $(this._gridSelector).datagrid('appendRow', parsedData.Record);
                    }
                });

            common.GetJsonEnum('AddressType');

            $(this._toolBarSelector).find('button[data-buttontype="add"]').bind('click',
                () => {
                    var newPoco = new AddressPoco();
                    newPoco.PersonId = person.Id;
                    this.ShowModal(newPoco);
                });

            $(this._toolBarSelector).find('button[data-buttontype="edit"]').bind('click',
                () => {
                    this.ShowModal(this.SelectedRow);
                });

            $(this._toolBarSelector).find('button[data-buttontype="delete"]').bind('click',
                () => {
                    this.Delete();
                });
        }

        public Delete() {
            if (common.EnableLogGlobal) {
                console.log('Delete');
            }

            confirmModal.Show({
                Title: 'Confirmação'
                , Message: 'Deseja realmente excluir o registro selecionado?'
                , ConfirmCallback: () => {
                    $.ajax({
                        url: '/Address/Delete'
                        , data: { id: this.SelectedRow.Id }
                        , type: 'POST'
                        , dataType: 'json'
                        , success: (data, textStatus, jqXHR) => {
                            if (common.EnableLogGlobal) {
                                console.log('Delete Success');
                                console.log('data', data);
                                console.log('textStatus', textStatus);
                            }

                            var newPoco = new AddressPoco();
                            newPoco.PersonId = this.SelectedRow.PersonId;
                            this.addressViewModel.Update(newPoco);

                            if (common.EnableLogGlobal) {
                                console.log('this.Id', this.SelectedRow.Id);
                                console.log('this.SelectedIndex', this.SelectedIndex);
                            }

                            $(this._toolBarSelector).find('button[data-buttontype="edit"], button[data-buttontype="delete"]').attr('disabled', 'disabled');
                            $(this._gridSelector).datagrid('deleteRow', this.SelectedIndex);
                        }
                        , error: function (err) {
                            if (common.EnableLogGlobal) {
                                console.log('Delete Error!', err);
                            }
                        }
                    });
                }
            });
        }

        public LoadDataGrid(selector: string = this._gridSelector) {
            $(selector).datagrid({
                idField: 'Id'
                , toolbar: this._toolBarSelector
                , rownumbers: true
                , pagination: true
                , singleSelect: true
                , striped: true
                , loadMsg: dataGridHelper.LoadMessage
                , columns: [[
                    { field: 'Id', hidden: true }
                    , { field: 'PersonId', hidden: true }
                    , { field: 'DateIns', hidden: true }
                    , { field: 'LastUpdate', hidden: true }
                    , { field: 'AddressTypeId', hidden: true }
                    , { field: 'Street', title: 'Endereço', width: 200 }
                    , { field: 'Number', title: 'Nº', width: 60 }
                    , { field: 'Neighborhood', title: 'Bairro', width: 110 }
                    , { field: 'Complement', title: 'Complemento', width: 110 }
                    , {
                        field: 'ZipCode'
                        , title: 'CEP'
                        , width: 100
                        , formatter: function (value, row, index) {
                            return '<span name="spanZipCode">' + value + '</span>';
                        }
                    }
                    , {
                        field: 'AddressType'
                        , title: 'Tipo'
                        , width: 150
                    }
                    , { field: 'City', title: 'Cidade', width: 80 }
                    , { field: 'State', title: 'UF', width: 40 }
                ]]
                , onClickRow: (index, row) => {
                    this.OnClickRow(index, row);
                }
                , onDblClickRow: (index, row) => {
                    this.OnClickRow(index, row);
                    $(this._modalSelector).modal('show');
                    $('input[data-mask="zipCode"]').mask('00000-000');
                }
                , loader: (param, success, error) => {
                    dataGridHelper.Loader('/Address/GetList', { personId: person.Id }, success, error);
                }
                , onLoadSuccess: (items) => {
                    if (common.EnableLogGlobal) {
                        console.log('address.LoadDataGrid onLoadSuccess');
                    }

                    dataGridHelper.CollapseBoxAfterLoad(this);
                    $('[name="spanZipCode"]').mask('00000-000');

                    this.addressViewModel.Init();
                }
            });
        }

        private OnClickRow(index, row) {
            this.SelectedIndex = index;
            this.SelectedRow = row;
            this.addressViewModel.Update(row);

            $(this._toolBarSelector).find('button[data-buttontype="edit"], button[data-buttontype="delete"]').removeAttr('disabled');
        }

        private ShowModal(objToUpdate: any) {
            if (common.EnableLogGlobal) {
                console.log('objToUpdate', objToUpdate);
            }

            this.addressViewModel.Update(objToUpdate);
            $(this._modalSelector).modal('show');
            $('input[data-mask="zipCode"]').mask('00000-000');
        }
    }
};