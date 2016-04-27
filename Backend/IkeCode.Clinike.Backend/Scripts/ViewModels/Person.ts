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
    export class List extends Clinike.BaseKoViewModel {
        protected saved: boolean;
        person: KnockoutObservable<ClinikeModels.IPerson> = ko.observable(new ClinikeModels.Person());
        people: KnockoutObservableArray<ClinikeModels.IPerson> = ko.observableArray([new ClinikeModels.Person()]);
        private _tableSelector: string;

        constructor(targetElement: HTMLElement, _tableSelector: string) {
            super(targetElement);
            this._tableSelector = _tableSelector;
            this.saved = false;

            $(document).ready(() => {
                $('#peopleToolbar button[name="newPerson"]').on('click', (e) => {
                    this.person(new ClinikeModels.Person());
                    $(this.vmTargetElement).modal('show');
                });

                $('#peopleToolbar button[name="fullEditPerson"]').on('click', (e) => {
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

    export class Detail extends Clinike.BaseKoViewModel {
        private _personId: number;
        protected saved: boolean;
        person: KnockoutObservable<ClinikeModels.IPerson> = ko.observable(new ClinikeModels.Person());

        documents: KnockoutObservableArray<ClinikeModels.IDocument> = ko.observableArray(new Array<ClinikeModels.Document>());
        documentsLoaded: boolean = false;
        document: KnockoutObservable<ClinikeModels.IDocument> = ko.observable(new ClinikeModels.Document());
        documentSaved: boolean = false;

        addresses: KnockoutObservableArray<ClinikeModels.IAddress> = ko.observableArray(new Array<ClinikeModels.Address>());
        addressesLoaded: boolean = false;
        address: KnockoutObservable<ClinikeModels.IAddress> = ko.observable(new ClinikeModels.Address());
        addressSaved: boolean = false;

        constructor(targetElement: HTMLElement, personId: number) {
            super(targetElement);

            this._personId = personId;
            this.saved = false;

            var loadGrid = (e: JQueryEventObject, callback: () => any) => {
                e.preventDefault();
                callback();
                $(e.target).tab('show');
            }

            this.applyViewModel(this);

            if (this._personId > 0) {
                $('#personChildrenTabs a[href="#documents"]').on('click', (e) => {
                    loadGrid(e, this.getDocuments);
                });

                $('#personChildrenTabs a[href="#addresses"]').on('click', (e) => {
                    loadGrid(e, this.getAddresses);
                });

                this.getPerson();
            }
        }

        private buildActionsEvents = (modalTarget: any
            , editModalShownElement?: (shownElement, row) => any
            , editModalHideCallback?: (hideElement, row) => any
            , deleteCallback?: (row) => any) => {
            var result = {
                'click .edit': (e, value, row, index): any => {
                    $(modalTarget)
                        .modal()
                        .on('shown.bs.modal', (shownElement): any => {
                            if (editModalShownElement)
                                editModalShownElement(shownElement, row);
                        })
                        .on('hide.bs.modal', (hideElement): any => {
                            if (editModalHideCallback)
                                editModalHideCallback(hideElement, row);
                        });
                },
                'click .delete': (e, value, row, index): any => {
                    //$log.verbose('PeopleViewModel personDelete e', e);
                    //$log.verbose('PeopleViewModel personDelete row', row);
                    //$log.verbose('PeopleViewModel personDelete index', index);
                    if (deleteCallback)
                        deleteCallback(row);
                }
            };

            return result;
        };
        
        private getDocuments = () => {
            var actionsEvents = this.buildActionsEvents('#defaultEditor'
                , (e, row) => {
                    this.documentSaved = false;
                }
                , (e, row) => {
                    if (!this.documentSaved) {
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
                                    $log.verbose('Documents Delete :: ajax result data', data);
                                    if (data.Status == 'Success') {
                                        $('#dtDocuments').bootstrapTable('remove', {
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
                    selector: "#dtDocuments"
                    , defaultParser: true
                    , customQueryParams: { personId: this._personId }
                    , responseHandler: (result) => {
                        var data = $bootstrapTable.defaultParser(result);

                        this.documents(result.Content.Items);

                        return data;
                    }
                    , selectCallback: (data, e) => {
                        $log.verbose('SelectRow :: Setting Documents data', data);
                        this.document(data);
                        $log.verbose('SelectRow :: Activate Document Edit Button');
                        $('#documentsToolbar button[name="fullEdit"]').removeAttr('disabled');
                    }
                    , toolbar: '#documentsToolbar'
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
                            formatter: (value, row, index) => {
                                return $('#defaultRowActions').html();
                            },
                            width: '100px'
                        }
                    ]
                    , url: $apis.document
                });
            }
        }

        private getAddresses = () => {
            var actionsEvents = this.buildActionsEvents('#defaultEditor'
                , (e, row) => {
                    this.addressSaved = false;
                }
                , (e, row) => {
                    if (!this.addressSaved) {
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
                            } /* else {
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
                                    $log.verbose('Address Delete :: ajax result data', data);
                                    if (data.Status == 'Success') {
                                        $('#dtAddresses').bootstrapTable('remove', {
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

            if (!this.addressesLoaded) {
                this.addressesLoaded = true;
                $bootstrapTable.load({
                    selector: "#dtAddresses"
                    , defaultParser: true
                    , customQueryParams: { personId: this._personId }
                    , responseHandler: (result) => {
                        var data = $bootstrapTable.defaultParser(result);

                        this.addresses(result.Content.Items);

                        return data;
                    }
                    , selectCallback: (data, e) => {
                        $log.verbose('SelectRow :: Setting Addresses data', data);
                        this.address(data);
                        $log.verbose('SelectRow :: Activate Address Edit Button');
                        $('#addressesToolbar button[name="fullEdit"]').removeAttr('disabled');
                    }
                    , toolbar: '#addressesToolbar'
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
                            title: 'Numero'
                        }
                        , {
                            field: 'operate',
                            title: 'Ações',
                            align: 'center',
                            events: actionsEvents,
                            formatter: (value, row, index) => {
                                return $('#defaultRowActions').html();
                            },
                            width: '100px'
                        }
                    ]
                    , url: $apis.address
                });
            }
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
    export class List extends Clinike.BaseKoViewModel {
        private _tableSelector: string;
        phones: KnockoutObservableArray<ClinikeModels.IPhone> = ko.observableArray(new Array<ClinikeModels.Phone>());
        phonesLoaded: boolean = false;
        phone: KnockoutObservable<ClinikeModels.IPhone> = ko.observable(new ClinikeModels.Phone());
        phoneSaved: boolean = false;
        _personId: number;

        constructor(targetElement: HTMLElement, _tableSelector: string, personId: number) {
            super(targetElement);
            this._tableSelector = _tableSelector;
            this._personId = personId;

            if (this._personId > 0) {
                $('#personChildrenTabs a[href="#phones"]').on('click', (e) => {
                    e.preventDefault();
                    this.getPhones();
                    $(e.target).tab('show');
                });
            }

            this.applyViewModel(this);
        }

        private getPhones = () => {

            var actionsEvents = $bootstrapTable.defaultBuildActionsEvents('#divPhoneEditForm'
                , (e, row) => {
                    this.phoneSaved = false;
                }
                , (e, row) => {
                    if (!this.phoneSaved) {
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
                                        $('#dtPhones').bootstrapTable('remove', {
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
                $('#inputAcceptSMS').bootstrapSwitch({ size: 'mini', onText: 'Sim', offText: 'Não' });

                $bootstrapTable.load({
                    selector: this._tableSelector
                    , defaultParser: true
                    , customQueryParams: { personId: this._personId }
                    , responseHandler: (result) => {
                        this.phones(result.Content.Items);

                        var data = $bootstrapTable.defaultParser(result);
                        return data;
                    }
                    , selectCallback: (data, e) => {
                        $log.verbose('SelectRow :: Setting Phone data', data);
                        this.phone(data);
                        $log.verbose('SelectRow :: Activate Phone Edit Button');
                        $('#phonesToolbar button[name="fullEdit"]').removeAttr('disabled');
                    }
                    , toolbar: '#phonesToolbar'
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
                            formatter: (value, row, index) => {
                                return $('#defaultRowActions').html();
                            },
                            width: '100px'
                        }
                    ]
                    , url: $apis.phone
                });
            }
        }
    }
}