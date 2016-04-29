///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/bootstrap/bootstrap.d.ts" />
///<reference path="../typings/knockout/knockout.d.ts" />
///<reference path="../typings/knockout.mapping/knockout.mapping.d.ts" />
///<reference path="../typings/knockout.validation/knockout.validation.d.ts" />
///<reference path="../typings/moment/moment.d.ts" />
///<reference path="../typings/requirejs/require.d.ts" />
///<reference path="../typings/custom/custom.d.ts" />
///<reference path="../typings/bootstrap-switch/bootstrap-switch.d.ts" />
///<reference path="../typings/bootbox/bootbox.d.ts" />
///<reference path="../clinike.ts" />
///<reference path="Clinike.Base.ts" />
///<reference path="../clinike.ajax.ts" />
///<reference path="../clinike.log.ts" />
///<reference path="../clinike.apiBaseUrls.ts" />
module ViewModels.Person {
    export class List extends ViewModels.BaseKoViewModel {
        protected saved: boolean;
        person: KnockoutObservable<ClinikeModels.IPerson> = ko.observable<ClinikeModels.Person>();
        private _tableSelector: string;
        private _tableToolbarSelector: string;

        constructor(targetElement: string, tableSelector: string, tableToolbarSelector: string = '') {
            super(targetElement);
            this._tableSelector = tableSelector;
            this._tableToolbarSelector = tableToolbarSelector;
            this.saved = false;

            $(document).ready(() => {
                $(this._tableToolbarSelector).find('button[name="new"]').on('click', (e) => {
                    this.person(new ClinikeModels.Person());
                    $(this.vmTargetElement).modal('show');
                });

                $(this._tableToolbarSelector).find('button[name="fullEdit"]').on('click', (e) => {
                    $log.verbose('People Table :: full edit clicked');
                    var url = this.getDetailPageUrl(this.person().Id);
                    $log.verbose('People Table :: full edit clicked url', url);
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
                        this.saved = false;
                    })
                    .on('hide.bs.modal', (hideElement): any => {
                        if (!this.saved) {
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
                            }, function (isConfirm) {
                                if (isConfirm) {
                                    $(hideElement.target).modal('show');
                                } /* else {
                                    setTimeout(() => {
                                        swal("Alterações descartadas.", "Tudo como estava antes! =)", "info");
                                    }, 150);
                                }*/
                            });
                        }
                    });
            },
            'click .personDelete': (e, value, row, index): any => {
                //$log.verbose('PeopleViewModel personDelete e', e);
                //$log.verbose('PeopleViewModel personDelete row', row);
                //$log.verbose('PeopleViewModel personDelete index', index);

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
                            url: $apis.person + '/' + this.person().Id,
                            contentType: "application/json",
                            async: true,
                            dataType: "json",
                            type: 'DELETE',
                            success: (data) => {
                                $log.verbose('PeopleViewModel personDelete ajax result data', data);
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

        private actionsFormatter = (value, row, index) => {
            return $('#peopleRowActions').html();
        };

        private renderPeopleGrid = () => {
            var table = $bootstrapTable.load({
                selector: this._tableSelector
                , defaultParser: true
                , selectCallback: (data, e) => {
                    $log.verbose('SelectRow :: Setting Person data', data);
                    this.person(data);
                    $log.verbose('SelectRow :: Activate Edit Button');
                    $(this._tableToolbarSelector).find('button[name="fullEdit"]').removeAttr('disabled');
                }
                , toolbar: this._tableToolbarSelector
                , columns: [
                    {
                        field: 'Id',
                        title: 'ID'
                    }
                    , {
                        field: 'DateIns',
                        title: 'Data de Criação',
                        formatter: $bootstrapTable.defaultDateFormatter,
                        width: '150px'
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
                , url: $apis.person
            });
        }

        public save = () => {
            this.saved = true;
            var personJs = ko.toJS(this.person());
            var type = 'POST';
            var url = $apis.person;

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
                    $log.verbose('Person Edit Save :: ajax result', data);

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
                    $log.error('Person :: Save Method', data);
                }
            });
        }
    }

    export class Detail extends ViewModels.BaseKoViewModel {
        private _personId: number;
        protected saved: boolean;
        person: KnockoutObservable<ClinikeModels.IPerson> = ko.observable(new ClinikeModels.Person());
        
        constructor(targetElement: string, personId: number) {
            super(targetElement);

            this._personId = personId;
            this.saved = false;

            if (this._personId > 0) {
                this.getPerson();
            }

            this.applyViewModel(this);
        }

        private getPerson = (successCallback?: () => any, errorCallback?: () => any) => {
            var url = $apis.person;

            new Clinike.Ajax<ClinikeModels.IPerson>({
                url: $apis.person,
                data: { id: this._personId }
            }, (data) => {
                this.person(data.Content);

                if (successCallback)
                    successCallback();
            }, (data) => {
                $log.error('Person :: Get Method', data);
            });
        }
    }
}

module ViewModels.Phone {
    export class List extends ViewModels.BaseKoViewModel {
        private _tableSelector: string;
        private _tableToolbarSelector: string;
        phonesLoaded: boolean = false;
        Detail: ViewModels.Phone.Detail;
        _personId: number;

        constructor(personId: number, targetElement: string, tableSelector: string, tableToolbarSelector: string = '') {
            super(targetElement);
            this._tableSelector = tableSelector;
            this._tableToolbarSelector = tableToolbarSelector;
            this._personId = personId;

            this.Detail = this.Detail || new ViewModels.Phone.Detail(this.vmTargetElementSelector);

            if (this._personId > 0) {
                $('#personChildrenTabs a[href="#phones"]').on('click', (e) => {
                    e.preventDefault();
                    this.getList();
                    $(e.target).tab('show');
                });
            }

            $(this._tableToolbarSelector).find('button[name="new"]').on('click', (e) => {
                this.Detail.phone(new ClinikeModels.KoPhone());
                $(this.vmTargetElementSelector).modal('show');
            });
        }

        private getList = () => {

            var actionsEvents = $bootstrapTable.defaultActionsEventsBuilder(this.vmTargetElementSelector
                , (e, row) => {
                    this.Detail.saved = false;
                }
                , (e, row) => {
                    if (!this.Detail.saved) {
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
                        }, function (isConfirm) {
                            if (isConfirm) {
                                $(e.target).modal('show');
                            } /*else {
                                setTimeout(() => {
                                    swal("Alterações descartadas.", "Tudo como estava antes! =)", "info");
                                }, 150);
                            }*/
                        });
                    }
                }
                , (row) => {
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
                                url: $apis.phone + '/' + row.Id,
                                contentType: "application/json",
                                async: true,
                                dataType: "json",
                                type: 'DELETE',
                                success: (data) => {
                                    $log.verbose('Phone Delete :: ajax result data', data);
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
                        } /*else {
                            setTimeout(() => {
                                swal("Cancelado", "Tudo como estava! =)", "info");
                            }, 150);
                        }*/
                    });
                });

            if (!this.phonesLoaded) {
                this.phonesLoaded = true;

                $bootstrapTable.load({
                    selector: this._tableSelector
                    , defaultParser: true
                    , customQueryParams: { personId: this._personId }
                    , responseHandler: (result) => {
                        var data = $bootstrapTable.defaultParser(result);
                        return data;
                    }
                    , selectCallback: (data, e) => {
                        $log.verbose('SelectRow :: Setting Phone data >', data);
                        var mapped = new ClinikeModels.KoPhone(data);
                        $log.verbose('SelectRow :: Setting Phone data mapped >', mapped);

                        this.Detail.phone(mapped);
                        
                        $log.verbose('SelectRow :: Activate Phone Edit Button');
                        $(this._tableToolbarSelector).find('button[name="fullEdit"]').removeAttr('disabled');
                    }
                    , toolbar: this._tableToolbarSelector
                    , columns: [
                        {
                            field: 'Id',
                            title: 'ID'
                        }
                        , {
                            field: 'DateIns',
                            title: 'Data de Criação',
                            formatter: $bootstrapTable.defaultDateFormatter,
                            width: '150px'
                        }
                        , {
                            field: 'Number',
                            title: 'Numero'
                        }
                        , {
                            field: 'Contact',
                            title: 'Contato'
                        }
                        , {
                            field: 'AcceptSMS',
                            title: 'Aceita SMS?'
                        }
                        , {
                            field: 'PhoneType',
                            title: 'Tipo'
                        }
                        , {
                            field: 'operate',
                            title: 'Ações',
                            align: 'center',
                            events: actionsEvents,
                            formatter: $bootstrapTable.defaultActionFormatter,
                            width: '100px'
                        }
                    ]
                    , url: $apis.phone
                });
            }
        }
    }

    export class Detail extends ViewModels.BaseKoViewModel {
        phone: KnockoutObservable<ClinikeModels.KoPhone> = ko.observable<ClinikeModels.KoPhone>();
        saved: boolean = false;
        
        constructor(targetElement: string, phone?: ClinikeModels.KoPhone) {
            super(targetElement);
            this.phone(phone);
            this.applyViewModel(this);
        }
        
        save = (callback?: (phone: ClinikeModels.KoPhone) => any) => {
            var data = new ClinikeModels.KoPhone();
            $log.checkpoint('ViewModels.Phone.Detail.save :: data >', data);
            //DO STUFF
            if (callback) {
                $log.checkpoint('ViewModels.Phone.Detail.save :: callback');
                callback(data);
                this.saved = true;
            }
        }
    }
}

module ViewModels.Document {
    export class List extends ViewModels.BaseKoViewModel {
        private _tableSelector: string;
        private _tableToolbarSelector: string;
        documentsLoaded: boolean = false;
        Detail: ViewModels.Document.Detail;
        _personId: number;

        constructor(personId: number, targetElement: string, tableSelector: string, tableToolbarSelector: string = '') {
            super(targetElement);
            this._tableSelector = tableSelector;
            this._tableToolbarSelector = tableToolbarSelector;
            this._personId = personId;

            this.Detail = this.Detail || new ViewModels.Document.Detail(this.vmTargetElementSelector);

            if (this._personId > 0) {
                $('#personChildrenTabs a[href="#documents"]').on('click', (e) => {
                    e.preventDefault();
                    this.getList();
                    $(e.target).tab('show');
                });
            }

            $(this._tableToolbarSelector).find('button[name="new"]').on('click', (e) => {
                this.Detail.document(new ClinikeModels.KoDocument());
                $(this.vmTargetElementSelector).modal('show');
            });
        }

        private getList = () => {

            var actionsEvents = $bootstrapTable.defaultActionsEventsBuilder(this.vmTargetElementSelector
                , (e, row) => {
                    this.Detail.saved = false;
                }
                , (e, row) => {
                    if (!this.Detail.saved) {
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
                        }, function (isConfirm) {
                            if (isConfirm) {
                                $(e.target).modal('show');
                            } /*else {
                                setTimeout(() => {
                                    swal("Alterações descartadas.", "Tudo como estava antes! =)", "info");
                                }, 150);
                            }*/
                        });
                    }
                }
                , (row) => {
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
                                url: $apis.document + '/' + row.Id,
                                contentType: "application/json",
                                async: true,
                                dataType: "json",
                                type: 'DELETE',
                                success: (data) => {
                                    $log.verbose('Document Delete :: ajax result data', data);
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
                });

            if (!this.documentsLoaded) {
                this.documentsLoaded = true;
                $bootstrapTable.load({
                    selector: this._tableSelector
                    , defaultParser: true
                    , customQueryParams: { personId: this._personId, include: 'DocumentType' }
                    , responseHandler: (result) => {
                        var data = $bootstrapTable.defaultParser(result);
                        return data;
                    }
                    , selectCallback: (data, e) => {
                        $log.verbose('SelectRow :: Setting Document data >', data);
                        var mapped = new ClinikeModels.KoDocument(data);
                        $log.verbose('SelectRow :: Setting Document data mapped >', mapped);

                        this.Detail.document(mapped);

                        $log.verbose('SelectRow :: Activate Document Edit Button');
                        $(this._tableToolbarSelector).find('button[name="fullEdit"]').removeAttr('disabled');
                    }
                    , toolbar: this._tableToolbarSelector
                    , columns: [
                        {
                            field: 'Id',
                            title: 'ID'
                        }
                        , {
                            field: 'DateIns',
                            title: 'Data de Criação',
                            formatter: $bootstrapTable.defaultDateFormatter,
                            width: '150px'
                        }
                        , {
                            field: 'Value',
                            title: 'Valor'
                        }
                        , {
                            field: 'operate',
                            title: 'Ações',
                            align: 'center',
                            events: actionsEvents,
                            formatter: $bootstrapTable.defaultActionFormatter,
                            width: '100px'
                        }
                    ]
                    , url: $apis.document
                });
            }
        }
    }

    export class Detail extends ViewModels.BaseKoViewModel {
        document: KnockoutObservable<ClinikeModels.KoDocument> = ko.observable<ClinikeModels.KoDocument>();
        saved: boolean = false;

        constructor(targetElement: string, document?: ClinikeModels.KoDocument) {
            super(targetElement);
            this.document(document);
            this.applyViewModel(this);
        }

        save = (callback?: (document: ClinikeModels.KoDocument) => any) => {
            var data = new ClinikeModels.KoDocument();
            $log.checkpoint('ViewModels.Document.Detail.save :: data >', data);
            //DO STUFF
            if (callback) {
                $log.checkpoint('ViewModels.Document.Detail.save :: callback');
                callback(data);
                this.saved = true;
            }
        }
    }
}

module ViewModels.Address {
    export class List extends ViewModels.BaseKoViewModel {
        private _tableSelector: string;
        private _tableToolbarSelector: string;
        loaded: boolean = false;
        Detail: ViewModels.Address.Detail;
        _personId: number;

        constructor(personId: number, targetElement: string, tableSelector: string, tableToolbarSelector: string = '') {
            super(targetElement);
            this._tableSelector = tableSelector;
            this._tableToolbarSelector = tableToolbarSelector;
            this._personId = personId;

            this.Detail = this.Detail || new ViewModels.Address.Detail(this.vmTargetElementSelector);

            if (this._personId > 0) {
                $('#personChildrenTabs a[href="#addresses"]').on('click', (e) => {
                    e.preventDefault();
                    this.getList();
                    $(e.target).tab('show');
                });
            }

            $(this._tableToolbarSelector).find('button[name="new"]').on('click', (e) => {
                this.Detail.address(new ClinikeModels.KoAddress());
                $(this.vmTargetElementSelector).modal('show');
            });
        }

        private getList = () => {

            var actionsEvents = $bootstrapTable.defaultActionsEventsBuilder(this.vmTargetElementSelector
                , (e, row) => {
                    this.Detail.saved = false;
                }
                , (e, row) => {
                    if (!this.Detail.saved) {
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
                        }, function (isConfirm) {
                            if (isConfirm) {
                                $(e.target).modal('show');
                            } /*else {
                                setTimeout(() => {
                                    swal("Alterações descartadas.", "Tudo como estava antes! =)", "info");
                                }, 150);
                            }*/
                        });
                    }
                }
                , (row) => {
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
                                url: $apis.address + '/' + row.Id,
                                contentType: "application/json",
                                async: true,
                                dataType: "json",
                                type: 'DELETE',
                                success: (data) => {
                                    $log.verbose('Address Delete :: ajax result data', data);
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
                });

            if (!this.loaded) {
                this.loaded = true;
                $bootstrapTable.load({
                    selector: this._tableSelector
                    , defaultParser: true
                    , customQueryParams: { personId: this._personId }
                    , responseHandler: (result) => {
                        var data = $bootstrapTable.defaultParser(result);
                        return data;
                    }
                    , selectCallback: (data, e) => {
                        $log.verbose('SelectRow :: Setting Address data >', data);
                        var mapped = new ClinikeModels.KoAddress(data);
                        $log.verbose('SelectRow :: Setting Address data mapped >', mapped);

                        this.Detail.address(mapped);

                        $log.verbose('SelectRow :: Activate Address Edit Button');
                        $(this._tableToolbarSelector).find('button[name="fullEdit"]').removeAttr('disabled');
                    }
                    , toolbar: this._tableToolbarSelector
                    , columns: [
                        {
                            field: 'Id',
                            title: 'ID'
                        }
                        , {
                            field: 'DateIns',
                            title: 'Data de Criação',
                            formatter: $bootstrapTable.defaultDateFormatter,
                            width: '150px'
                        }
                        , {
                            field: 'Street',
                            title: 'Rua'
                        }
                        , {
                            field: 'Number',
                            title: 'Número'
                        }
                        , {
                            field: 'Neighborhood',
                            title: 'Bairro'
                        }
                        , {
                            field: 'City',
                            title: 'Cidade'
                        }
                        , {
                            field: 'State',
                            title: 'Estado'
                        }
                        , {
                            field: 'ZipCode',
                            title: 'CEP'
                        }
                        , {
                            field: 'AddressType',
                            title: 'Tipe'
                        }
                        , {
                            field: 'operate',
                            title: 'Ações',
                            align: 'center',
                            events: actionsEvents,
                            formatter: $bootstrapTable.defaultActionFormatter,
                            width: '100px'
                        }
                    ]
                    , url: $apis.address
                });
            }
        }
    }

    export class Detail extends ViewModels.BaseKoViewModel {
        address: KnockoutObservable<ClinikeModels.KoAddress> = ko.observable<ClinikeModels.KoAddress>();
        saved: boolean = false;

        constructor(targetElement: string, address?: ClinikeModels.KoAddress) {
            super(targetElement);
            this.address(address);
            this.applyViewModel(this);
        }

        save = (callback?: (document: ClinikeModels.KoAddress) => any) => {
            var data = new ClinikeModels.KoAddress();
            $log.checkpoint('ViewModels.Address.Detail.save :: data >', data);
            //DO STUFF
            if (callback) {
                $log.checkpoint('ViewModels.Address.Detail.save :: callback');
                callback(data);
                this.saved = true;
            }
        }
    }
}