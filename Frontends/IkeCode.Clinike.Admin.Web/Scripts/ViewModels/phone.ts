///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.mask.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.bootgrid.d.ts" />
///<reference path="../typings/bootstrap/bootstrap.d.ts" />
///<reference path="../typings/knockout/knockout.d.ts" />
///<reference path="../typings/knockout.mapping/knockout.mapping.d.ts" />

module PhoneModule {
    export class KoViewModel extends KoPhone {

        PhoneTypes: KnockoutObservable<any> = ko.observable();
        private _targetSelector: string;
        private _saveCallback: (oldId: any, parsedData: any) => any;
        private _validationGroup: KnockoutValidationGroup = ko.validatedObservable(this);
        private _validationErrors: KnockoutValidationErrors = ko.validation.group(this);

        constructor(targetSelector: string, saveCallback: (oldId: any, parsedData: any) => any) {
            super();

            if (common.EnableLogGlobal) {
                console.log('Phone ctor');
            }

            this._saveCallback = saveCallback;

            if (targetSelector) {
                this._targetSelector = targetSelector;

                this.PhoneTypeId.extend({ required: { params: true, message: '* obrigatório' }, min: { params: -1, message: '* obrigatório' } });
            }
        }

        public Init = () => {
            if (this._targetSelector) {
                common.GetJsonEnum('PhoneType'
                    , null
                    , null
                    , (data) => {
                        this.PhoneTypes(data);
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
                    url: '/Phone/Post'
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
        _gridSelector: string = '#phonesGrid';
        _modalSelector: string = '#phoneEditorModal';
        phoneViewModel: PhoneModule.KoViewModel;
        private _parentId: number = 0;

        constructor(_parentId: number) {
            super();
            this._parentId = _parentId;

            this.phoneViewModel = new PhoneModule.KoViewModel('#phoneEditorModal div[data-type="kobind"]'
                , (oldId, parsedData) => {
                    $(this._modalSelector).modal('hide');
                    $(this._gridSelector).bootgrid('reload');
                });

            common.GetJsonEnum('PhoneType');
        }

        public Delete() {
            if (common.EnableLogGlobal) {
                console.log('Phone Delete');
            }

            confirmModal.Show({
                Title: 'Confirmação'
                , Message: 'Deseja realmente excluir o registro selecionado?'
                , ConfirmCallback: () => {
                    $.ajax({
                        url: '/Phone/Delete'
                        , data: { id: this.SelectedRow.Id }
                        , type: 'POST'
                        , dataType: 'json'
                        , success: (data, textStatus, jqXHR) => {
                            if (common.EnableLogGlobal) {
                                console.log('Delete Success');
                                console.log('data', data);
                                console.log('textStatus', textStatus);
                            }

                            var newPoco = new PhonePoco();
                            newPoco.PersonId = this.SelectedRow.PersonId;
                            this.phoneViewModel.Update(newPoco);

                            if (common.EnableLogGlobal) {
                                console.log('this.Id', this.SelectedRow.Id);
                            }

                            $(this._gridSelector).bootgrid('reload');
                        }
                        , error: (err) => {
                            if (common.EnableLogGlobal) {
                                console.log('Phone Delete Error!', err);
                            }
                        }
                    });
                }
            });
        }

        public LoadDataGrid(selector: string = this._gridSelector) {
            $(this._gridSelector).bootgrid(this.GetBootgridOptions({
                url: "/phone/GetList",
                post: () => {
                    return {
                        personId: this._parentId
                    };
                },
                formatters: {
                    "Number": function (column, row) {
                        return '<span name="spanNumber">' + row.Number + '</span>';
                    },
                    "commands": this.GetDefaultCommands
                }
            }))
                .on("loaded.rs.jquery.bootgrid", (e) => {
                    if (common.EnableLogGlobal) {
                        console.log('Phone (loaded.rs.jquery.bootgrid) -> e', e);
                    }

                    $('[name="spanNumber"]').each(function () {
                        var val = $(this).text();
                        var result = val.length == 10 || val.length == 14 ? '(00) 0000-0000' : '(00) 00000-0000';

                        $(this).mask(result)
                    });

                    this.phoneViewModel.Init();

                    $(this._gridSelector).find(".command-edit")
                        .on("click", (e) => {
                            var row = this.GetCurrentRow(this._gridSelector, e);

                            this.ShowModal(this.SelectedRow);
                        })
                        .end().find(".command-delete").on("click", (e) => {
                            var row = this.GetCurrentRow(this._gridSelector, e);

                            this.phoneViewModel.Update(row);
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

            this.phoneViewModel.Update(objToUpdate);
            $(this._modalSelector).modal('show');

            $('input[data-mask="phoneNumber"]').each(function () {
                var val = $(this).text();
                var result = val.length == 10 || val.length == 14 ? '(00) 0000-0000' : '(00) 00000-0000';

                $(this).mask(result)
            });

            var maskBehavior = function (val) {
                return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
            },
                options = {
                    onKeyPress: function (val, e, field, options) {
                        field.mask(maskBehavior.apply({}, arguments), options);
                    }
                };
            $('input[data-mask="phoneNumber"]').mask(maskBehavior, options);
        }
    }
}