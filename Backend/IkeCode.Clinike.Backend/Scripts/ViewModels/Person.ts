///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/bootstrap/bootstrap.d.ts" />
///<reference path="../typings/knockout/knockout.d.ts" />
///<reference path="../typings/knockout.mapping/knockout.mapping.d.ts" />
///<reference path="../typings/moment/moment.d.ts" />
///<reference path="../typings/custom/custom.d.ts" />
module Person.Models {
    export interface IPerson {
        Id: KnockoutObservable<number>;
        DateIns: KnockoutObservable<Date>;
        LastUpdate: KnockoutObservable<Date>;
        Name: KnockoutObservable<string>;
        Email: KnockoutObservable<string>;
    }

    export class Person implements IPerson {
        Id: KnockoutObservable<number> = ko.observable(0);
        DateIns: KnockoutObservable<Date> = ko.observable(new Date());
        LastUpdate: KnockoutObservable<Date> = ko.observable(new Date());
        Name: KnockoutObservable<string> = ko.observable('');
        Email: KnockoutObservable<string> = ko.observable('');

        constructor(person?: IPerson) {
            if (person) {
                this.Id(person.Id());
                this.DateIns(person.DateIns());
                this.LastUpdate(person.LastUpdate());
                this.Name(person.Name());
                this.Email(person.Email());
            }
        }
    }
}

module Person.ViewModel {
    class Base {
        protected vmBinded: boolean;
        protected vmTargetElement: any;

        constructor(targetElement: any) {
            this.vmTargetElement = targetElement;
        }

        protected applyViewModel(data: any) {
            if (this.vmBinded) {
                $utils.log.verbose('Ko :: Binding already applied to >', this.vmTargetElement);
            } else {
                $utils.log.verbose('Ko :: Applying Binding to >', this.vmTargetElement);
                ko.applyBindings(data, this.vmTargetElement);
                this.vmBinded = true;
            }
        }
    }

    export class List extends Base {
        People: KnockoutObservableArray<Person.Models.IPerson> = ko.observableArray([new Person.Models.Person()]);
        Person: KnockoutObservable<Person.Models.IPerson> = ko.observable(new Person.Models.Person());
        private _tableSelector: string;
        private _saved: boolean;

        constructor(targetElement: HTMLElement, _tableSelector: string) {
            super(targetElement);
            this._tableSelector = _tableSelector;
            this._saved = false;

            $(document).ready(() => {
                $('#peopleToolbar button[name="newPerson"]').on('click', (e) => {
                    this.Person(new Person.Models.Person());
                    $(this.vmTargetElement).modal('show');
                });

                $('#peopleToolbar button[name="fullEditPerson"]').on('click', (e) => {
                    $utils.log.verbose('People Table :: full edit clicked');
                    var url = this.getDetailPageUrl(this.Person().Id);
                    $utils.log.verbose('People Table :: full edit clicked url', url);
                    window.open(url, '_blank');
                });
            });

            this.renderPeopleGrid();

            this.applyViewModel(this);
        }

        private getDetailPageUrl = (id) => {
            return (window.location.toString() + "/detalhe/{0}").format(id);
        }

        private actionsEvents = {
            'click .personEdit': (e, value, row, index): any => {
                $(this.vmTargetElement)
                    .modal()
                    .on('shown.bs.modal', (shownElement): any => {

                    })
                    .on('hide.bs.modal', (hideElement): any => {
                        if (!this._saved) {
                            swal({
                                title: "Você tem certeza?"
                                , text: "Se mudanças tiverem sido feitas você perderá, deseja mesmo continuar?"
                                , type: "warning"
                                , allowEscapeKey: false
                                , showCancelButton: true
                                , cancelButtonColor: "#DD6B55"
                                , cancelButtonText: "Descartar!"
                                , confirmButtonText: "Voltar ao fomulário"
                                , closeOnConfirm: true
                                , closeOnCancel: true
                                , showLoaderOnConfirm: true
                            }, function (isConfirm) {
                                if (isConfirm) {
                                    $(hideElement.target).modal('show');
                                } else {
                                    setTimeout(() => {
                                        swal("Alterações descartadas.", "Tudo como estava antes! =)", "info");
                                    }, 150);
                                }
                            });
                        }
                    });
            },
            'click .personDelete': (e, value, row, index): any => {
                //$utils.log.verbose('PeopleViewModel personDelete e', e);
                //$utils.log.verbose('PeopleViewModel personDelete row', row);
                //$utils.log.verbose('PeopleViewModel personDelete index', index);

                swal({
                    title: "Você tem certeza?"
                    , text: "Tem certeza que deseja excluir esse registro?"
                    , type: "warning"
                    , showCancelButton: true
                    , confirmButtonColor: "#DD6B55"
                    , confirmButtonText: "Sim"
                    , cancelButtonText: "Não"
                    , closeOnConfirm: true
                    , showLoaderOnConfirm: true
                }, (isConfirm) => {
                    if (isConfirm) {
                        $.ajax({
                            url: $utils.baseApiUrls.person + '/' + this.Person().Id,
                            contentType: "application/json",
                            async: true,
                            dataType: "json",
                            type: 'DELETE',
                            success: (data) => {
                                $utils.log.verbose('PeopleViewModel personDelete ajax result data', data);
                                if (data.Status == 'Success') {
                                    $(this._tableSelector).bootstrapTable('remove', {
                                        field: 'Id',
                                        values: [row.Id]
                                    });

                                    if (data.Content > 0) {
                                        swal({
                                            title: "Excluido!"
                                            , text: "Registro excluido com sucesso!"
                                            , type: "success"
                                        });
                                    } else {
                                        swal({
                                            title: "Ooops..."
                                            , text: "Esse registro parece já ter sido excluido, mas tudo bem, atualizamos seu grid."
                                            , type: "info"
                                        });
                                    }
                                } else {
                                    swal({
                                        title: "Ooops..."
                                        , text: "Ocorreu um problema em sua requisição, tente novamente!"
                                        , type: "error"
                                    });
                                }
                            },
                            error: (data) => {
                                swal({
                                    title: "Ooops..."
                                    , text: "Ocorreu um erro em sua requisição! (código: {0})".format(data.statusText)
                                    , type: "error"
                                });
                            }
                        });
                    } else {
                        setTimeout(() => {
                            swal("Cancelado", "Tudo como estava! =)", "info");
                        }, 150);
                    }
                });
            }
        };

        private dateFormatter = (value, row, index) => {
            //$utils.log.verbose('Bootstrap Table dateFormatter :: value', value);
            //$utils.log.verbose('Bootstrap Table dateFormatter :: row', row);
            //$utils.log.verbose('Bootstrap Table dateFormatter :: index', index);
            return moment(value).format('DD/MM/YYYY HH:mm:ss');
        };

        private actionsFormatter = (value, row, index) => {
            return $('#peopleRowActions').html();
        };

        private renderPeopleGrid = () => {
            var table = new $utils.bootstrapTable.load({
                selector: this._tableSelector
                , defaultParser: true
                , selectCallback: (data, e) => {
                    $utils.log.verbose('SelectRow :: Setting Person');
                    this.Person(data);
                    $utils.log.verbose('SelectRow :: Activate Edit Button');
                    $('#peopleToolbar button[name="fullEditPerson"]').removeAttr('disabled');
                }
                , toolbar: '#peopleToolbar'
                , columns: [
                    {
                        field: 'Id',
                        title: 'ID'
                    }
                    , {
                        field: 'DateIns',
                        title: 'Data de Criação',
                        formatter: this.dateFormatter
                    }
                    , {
                        field: 'Name',
                        title: 'Nome'
                    }
                    , {
                        field: 'Email',
                        title: 'Email'
                    }
                    , {
                        field: 'operate',
                        title: 'Ações',
                        align: 'center',
                        events: this.actionsEvents,
                        formatter: this.actionsFormatter,
                        width: '100px'
                    }
                ]
                , url: $utils.baseApiUrls.person
            });
        }

        public Save = () => {
            this._saved = true;
            var personJs = ko.toJS(this.Person());
            var type = 'POST';
            var url = $utils.baseApiUrls.person;

            if (personJs.Id > 0) {
                type = 'PUT';
                url += '/' + personJs.Id;
            }

            $.ajax({
                url: url,
                contentType: "application/json",
                async: true,
                dataType: "json",
                type: type,
                data: JSON.stringify(personJs),
                success: (data) => {
                    $utils.log.verbose('Person Edit Save :: ajax result', data);

                    if (data.Status == 'Success') {
                        swal({
                            title: "Sucesso!"
                            , text: "Alterações realizadas com sucesso!"
                            , type: "success"
                            , showCancelButton: true
                            , cancelButtonColor: "#4cb64c"
                            , cancelButtonText: "Ir para a edição completa"
                        }, (isConfirm) => {
                            $(this._tableSelector).bootstrapTable('refresh', { silent: true });

                            $(this.vmTargetElement).modal('hide');

                            if (!isConfirm) {
                                window.open(this.getDetailPageUrl(data.Content.Id), '_blank');
                            }

                            var index = $(this._tableSelector + ' tr.selected').data('index');
                            if (index !== undefined) {
                                $(this._tableSelector).bootstrapTable('updateRow', { index: index, row: data.Content });
                            } else {
                                $(this._tableSelector).bootstrapTable('append', data.Content);
                            }
                        });
                    } else {
                        swal({
                            title: "Ooops..."
                            , text: "Ocorreu um problema em sua requisição, tente novamente!"
                            , type: "error"
                        });
                    }
                },
                error: (data) => {
                    $utils.log.error('Person :: Save Method', data);
                }
            });
        }
    }
}