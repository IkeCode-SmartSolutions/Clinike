///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.mask.d.ts" />
///<reference path="../typings/bootstrap/bootstrap.d.ts" />
///<reference path="../typings/knockout/knockout.d.ts" />
///<reference path="../typings/knockout.mapping/knockout.mapping.d.ts" />

module AddressModule {
    export class KoViewModel extends KoAddress {

        private _targetSelector: string;
        private _saveCallback: (data: any, isUpdate: boolean) => any;
        private _validationGroup: KnockoutValidationGroup = ko.validatedObservable(this);
        private _validationErrors: KnockoutValidationErrors = ko.validation.group(this);

        AddressTypes: KnockoutObservable<any> = ko.observable();

        constructor(targetSelector: string, saveCallback: (data: any, isUpdate: boolean) => any) {
            super();

            if (common.EnableLogGlobal) {
                console.log('Address ctor');
            }

            this._saveCallback = saveCallback;

            if (targetSelector) {
                this._targetSelector = targetSelector;

                this.AddressTypeId.extend({ required: { params: true, message: '* obrigatório' }, min: { params: 1, message: '* obrigatório' } });
            }
        }

        public Apply = () => {
            if (this._targetSelector) {
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

            if (!this._validationGroup.isValid()) {
                this._validationErrors.showAllMessages();
            } else {
                $.ajax({
                    url: '/Address/Post'
                    , data: dataJS
                    , type: 'POST'
                    , dataType: 'json'
                    , success: (data, textStatus, jqXHR) => {
                        if (common.EnableLogGlobal) {
                            console.log('textStatus', textStatus);
                            console.log('data', data);
                        }

                        var oldId = this.Id;

                        this.Update(data.Record);

                        if (common.EnableLogGlobal) {
                            console.log('this.Id', this.Id);
                        }

                        this._saveCallback(data, oldId > 0);
                    }
                    , error: (err) => {
                        console.log(err);
                    }
                });
            }
        };
    }

    export class GridViewModel extends BaseDataGridModel implements IDataGridModel {
        _gridSelector: string = '#addressesGrid';
        _modalSelector: string = '#addressEditorModal';
        addressViewModel: AddressModule.KoViewModel;
        private _parentId: number = 0;

        constructor(_parentId: number) {
            super();
            this._parentId = _parentId;

            this.addressViewModel = new AddressModule.KoViewModel('#addressEditorModal div[data-type="kobind"]'
                , (oldId, data) => {
                    $(this._modalSelector).modal('hide');
                    $(this._gridSelector).bootgrid('reload');
                });

            common.GetJsonEnum('AddressType');
        }

        public Delete() {
            if (common.EnableLogGlobal) {
                console.log('Address Delete');
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
                url: "/Address/GetList",
                post: () => {
                    return {
                        personId: this._parentId
                    };
                },
                formatters: {
                    "ZipCode": function (column, row) {
                        return '<span name="spanZipCode">' + row.ZipCode + '</span>';
                    },
                    "commands": this.GetDefaultCommands
                }
            }))
                .on("loaded.rs.jquery.bootgrid", (e) => {
                    if (common.EnableLogGlobal) {
                        console.log('Address (loaded.rs.jquery.bootgrid) -> e', e);
                    }

                    this.addressViewModel.Apply();

                    $('[name="spanZipCode"]').mask('00000-000');
                    $(this._gridSelector).find(".command-edit")
                        .on("click", (e) => {
                            var row = this.GetCurrentRow(this._gridSelector, e);

                            this.ShowModal(this.SelectedRow);
                        })
                        .end().find(".command-delete").on("click", (e) => {
                            var row = this.GetCurrentRow(this._gridSelector, e);

                            this.addressViewModel.Update(row);
                            this.Delete();
                        })
                        .end().parent().find(".bootgrid-header .command-add").on("click", () => {
                            var newPoco = new PhonePoco();
                            newPoco.PersonId = this._parentId;
                            this.ShowModal(newPoco);
                        });
                });
        }

        private ShowModal = (objToUpdate: any) => {
            if (common.EnableLogGlobal) {
                console.log('objToUpdate', objToUpdate);
            }

            this.addressViewModel.Update(objToUpdate);
            $(this._modalSelector).modal('show');
            $('input[data-mask="zipCode"]').mask('00000-000');
        }
    }
};