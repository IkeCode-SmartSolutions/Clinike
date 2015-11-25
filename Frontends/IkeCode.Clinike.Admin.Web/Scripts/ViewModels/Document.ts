///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.easyui.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.mask.d.ts" />
///<reference path="../typings/bootstrap/bootstrap.d.ts" />
///<reference path="../typings/knockout/knockout.d.ts" />
///<reference path="../typings/knockout.mapping/knockout.mapping.d.ts" />

module DocumentModule {
    export class KoViewModel extends KoDocument {

        DocumentTypes: KnockoutObservable<any> = ko.observable();

        private _targetSelector: string;
        private _saveCallback: (oldId: any, parsedData: any) => any;
        private _validationGroup: KnockoutValidationGroup = ko.validatedObservable(this);
        private _validationErrors: KnockoutValidationErrors = ko.validation.group(this);

        constructor(targetSelector: string, saveCallback: (oldId: any, parsedData: any) => any) {
            super();

            if (common.EnableLogGlobal) {
                console.log('Document ctor');
            }

            this._saveCallback = saveCallback;

            if (targetSelector) {
                this._targetSelector = targetSelector;

                //this.PhoneTypeId.extend({ required: { params: true, message: '*' }, min: { params: 1, message: '*' } });
            }
        }

        public Init = () => {
            if (this._targetSelector) {
                //common.GetJsonEnum('PhoneType'
                //    , null
                //    , null
                //    , (data) => {
                //        this.PhoneTypes(data);
                //    });

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

            if (!this._validationGroup.isValid()) {
                this._validationErrors.showAllMessages();
            } else {
                $.ajax({
                    url: '/Document/Post'
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
                    , error: (err) => {
                        console.log(err);
                    }
                });
            }
        };
    }

    export class GridViewModel extends BaseDataGridModel implements IDataGridModel {
        _toolBarSelector: string = '#documentsToolbar';
        _gridSelector: string = '#documentsGrid';
        _modalSelector: string = '#documentEditorModal';
        documentViewModel: DocumentModule.KoViewModel;
        private _parentId: number = 0;

        constructor(_parentId: number) {
            super();
            console.log('GridViewModel ctor');
            this._parentId = _parentId;

            this.documentViewModel = new DocumentModule.KoViewModel('#documentEditorModal div[data-type="kobind"]'
                , (oldId, parsedData) => {
                    $(this._modalSelector).modal('hide');
                    if (oldId > 0) {
                        $(this._gridSelector).datagrid('updateRow', { index: this.SelectedIndex, row: parsedData.Record });
                    } else {
                        $(this._gridSelector).datagrid('appendRow', parsedData.Record);
                    }
                });

            $(this._toolBarSelector).find('button[data-buttontype="add"]').bind('click',
                () => {
                    var newPoco = new PhonePoco();
                    newPoco.PersonId = this._parentId;
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
                console.log('Document Delete');
            }

            confirmModal.Show({
                Title: 'Confirmação'
                , Message: 'Deseja realmente excluir o registro selecionado?'
                , ConfirmCallback: () => {
                    $.ajax({
                        url: '/Document/Delete'
                        , data: { id: this.SelectedRow.Id }
                        , type: 'POST'
                        , dataType: 'json'
                        , success: (data, textStatus, jqXHR) => {
                            if (common.EnableLogGlobal) {
                                console.log('Delete Success');
                                console.log('data', data);
                                console.log('textStatus', textStatus);
                            }

                            var newPoco = new DocumentPoco();
                            newPoco.PersonId = this.SelectedRow.PersonId;
                            this.documentViewModel.Update(newPoco);

                            if (common.EnableLogGlobal) {
                                console.log('this.Id', this.SelectedRow.Id);
                                console.log('this.SelectedIndex', this.SelectedIndex);
                            }

                            $(this._toolBarSelector).find('button[data-buttontype="edit"], button[data-buttontype="delete"]').attr('disabled', 'disabled');
                            $(this._gridSelector).datagrid('deleteRow', this.SelectedIndex);
                        }
                        , error: (err) => {
                            if (common.EnableLogGlobal) {
                                console.log('Delete Error!', err);
                            }
                        }
                    });
                }
            });
        }

        public LoadDataGrid = (selector: string = this._gridSelector) => {
            console.log('Document parentId', this._parentId);

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
                    , { field: 'DocumentTypeId', hidden: true }
                    , { field: 'Value', title: 'Valor', width: 200 }
                    , {
                        field: 'DocumentType'
                        , title: 'Tipo'
                        , width: 200
                        , formatter: function (value, row, index) {
                            return value.Name;
                        }
                    }
                ]]
                , onClickRow: (index, row) => {
                    this.OnClickRow(index, row);
                }
                , onDblClickRow: (index, row) => {
                    this.OnClickRow(index, row);
                }
                , loader: (param, success, error) => {
                    dataGridHelper.Loader('/Document/GetList', { personId: this._parentId }, success, error);
                }
                , onLoadSuccess: (items) => {

                    if (common.EnableLogGlobal) {
                        console.log('document.LoadDataGrid onLoadSuccess');
                    }

                    dataGridHelper.CollapseBoxAfterLoad(this._gridSelector);

                    this.documentViewModel.Init();
                }
            });
        }

        private OnClickRow(index, row) {
            this.SelectedIndex = index;
            this.SelectedRow = row;
            this.documentViewModel.Update(row);

            $(this._toolBarSelector).find('button[data-buttontype="edit"], button[data-buttontype="delete"]').removeAttr('disabled');
        }

        private ShowModal(objToUpdate: any) {
            if (common.EnableLogGlobal) {
                console.log('objToUpdate', objToUpdate);
            }

            this.documentViewModel.Update(objToUpdate);
            $(this._modalSelector).modal('show');
        }
    }
}