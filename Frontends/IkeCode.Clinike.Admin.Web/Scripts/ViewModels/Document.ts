///<reference path="../typings/jquery/jquery.d.ts" />
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

                $.getJSON('/Document/GetDocumentTypes',
                    (data, textStatus) => {
                        if (common.EnableLogGlobal) {
                            console.log('GetDocumentTypes data', data);
                        }

                        if (data) {
                            this.DocumentTypes(data.Options);
                        }
                    });
                this.DocumentTypeId.extend({ required: { params: true, message: '* obrigatório' }, min: { params: -1, message: '* obrigatório' } });
            }
        }

        public Init = () => {
            if (this._targetSelector) {
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

                        if (common.EnableLogGlobal) {
                            console.log('textStatus', textStatus);
                            console.log('data', data);
                        }

                        this.Update(data.Record);

                        if (common.EnableLogGlobal) {
                            console.log('this.Id', this.Id);
                        }

                        this._saveCallback(oldId, data);
                    }
                    , error: (err) => {
                        console.log(err);
                    }
                });
            }
        };
    }

    export class GridViewModel extends BaseDataGridModel implements IDataGridModel {
        _gridSelector: string = '#documentsGrid';
        _modalSelector: string = '#documentEditorModal';
        documentViewModel: DocumentModule.KoViewModel;
        private _parentId: number = 0;

        constructor(_parentId: number) {
            super();
            this._parentId = _parentId;

            this.documentViewModel = new DocumentModule.KoViewModel('#documentEditorModal div[data-type="kobind"]'
                , (oldId, parsedData) => {
                    $(this._modalSelector).modal('hide');
                    $(this._gridSelector).bootgrid('reload');
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
                            }

                            $(this._gridSelector).bootgrid('reload');
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
            $(this._gridSelector).bootgrid(this.GetBootgridOptions({
                url: "/Document/GetList",
                post: () => {
                    return {
                        personId: this._parentId
                    };
                },
                formatters: {
                    "DocumentType": function (column, row) {
                        return row.DocumentType.Name;
                    },
                    "commands": this.GetDefaultCommands
                }
            }))
                .on("loaded.rs.jquery.bootgrid", (e) => {
                    if (common.EnableLogGlobal) {
                        console.log('Document (loaded.rs.jquery.bootgrid) -> e', e);
                    }

                    this.documentViewModel.Init();

                    $(this._gridSelector).find(".command-edit")
                        .on("click", (e) => {
                            var row = this.GetCurrentRow(this._gridSelector, e);

                            this.ShowModal(this.SelectedRow);
                        })
                        .end().find(".command-delete").on("click", (e) => {
                            var row = this.GetCurrentRow(this._gridSelector, e);

                            this.documentViewModel.Update(row);
                            this.Delete();
                        })
                        .end().parent().find(".bootgrid-header .command-add").on("click", () => {
                            var newPoco = new PhonePoco();
                            newPoco.PersonId = this._parentId;
                            this.ShowModal(newPoco);
                        });
                });
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