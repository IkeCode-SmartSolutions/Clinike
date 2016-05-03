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
///<reference path="ViewModels.Base.ts" />
///<reference path="../clinike.ajax.ts" />
///<reference path="../clinike.log.ts" />
///<reference path="../clinike.apiBaseUrls.ts" />
var ViewModels;
(function (ViewModels) {
    var Person;
    (function (Person) {
        class List extends ViewModels.BaseKoViewModel {
            constructor(targetElement, tableSelector, tableToolbarSelector = '') {
                super(targetElement);
                this.person = ko.observable();
                this.getDetailPageUrl = (id) => {
                    return (window.location.toString() + "/detalhe/{0}").format(id);
                };
                this.actionsEvents = {
                    'click .personEdit': (e, value, row, index) => {
                        $(this.vmTargetElement)
                            .modal()
                            .on('shown.bs.modal', (shownElement) => {
                            this.saved = false;
                        })
                            .on('hide.bs.modal', (hideElement) => {
                            if (!this.saved) {
                                swal({
                                    title: "Você tem certeza?",
                                    text: "Se mudanças tiverem sido feitas você perderá, deseja mesmo continuar?",
                                    type: "warning",
                                    allowEscapeKey: false,
                                    showCancelButton: true,
                                    cancelButtonColor: "#DD6B55",
                                    cancelButtonText: "Descartar!",
                                    confirmButtonText: "Voltar ao fomulário",
                                    closeOnConfirm: true,
                                    closeOnCancel: true
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
                    'click .personDelete': (e, value, row, index) => {
                        //$log.verbose('PeopleViewModel personDelete e', e);
                        //$log.verbose('PeopleViewModel personDelete row', row);
                        //$log.verbose('PeopleViewModel personDelete index', index);
                        swal({
                            title: "Você tem certeza?",
                            text: "Tem certeza que deseja excluir esse registro?",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Sim",
                            cancelButtonText: "Não",
                            closeOnConfirm: true,
                            showLoaderOnConfirm: true
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
                                                    title: "Excluido!",
                                                    text: "Registro excluido com sucesso!",
                                                    type: "success"
                                                });
                                            }
                                            else {
                                                swal({
                                                    title: "Ooops...",
                                                    text: "Esse registro parece já ter sido excluido, mas tudo bem, atualizamos seu grid.",
                                                    type: "info"
                                                });
                                            }
                                        }
                                        else {
                                            swal({
                                                title: "Ooops...",
                                                text: "Ocorreu um problema em sua requisição, tente novamente!",
                                                type: "error"
                                            });
                                        }
                                    },
                                    error: (data) => {
                                        swal({
                                            title: "Ooops...",
                                            text: "Ocorreu um erro em sua requisição! (código: {0})".format(data.statusText),
                                            type: "error"
                                        });
                                    }
                                });
                            }
                            else {
                                setTimeout(() => {
                                    swal("Cancelado", "Tudo como estava! =)", "info");
                                }, 150);
                            }
                        });
                    }
                };
                this.actionsFormatter = (value, row, index) => {
                    return $('#peopleRowActions').html();
                };
                this.renderPeopleGrid = () => {
                    var table = $bootstrapTable.load({
                        selector: this._tableSelector,
                        defaultParser: true,
                        selectCallback: (data, e) => {
                            $log.verbose('SelectRow :: Setting Person data', data);
                            this.person(data);
                            $log.verbose('SelectRow :: Activate Edit Button');
                            $(this._tableToolbarSelector).find('button[name="fullEdit"]').removeAttr('disabled');
                        },
                        toolbar: this._tableToolbarSelector,
                        columns: [
                            {
                                field: 'Id',
                                title: 'ID'
                            },
                            {
                                field: 'DateIns',
                                title: 'Data de Criação',
                                formatter: $bootstrapTable.defaultDateFormatter,
                                width: '150px'
                            },
                            {
                                field: 'Name',
                                title: 'Nome'
                            },
                            {
                                field: 'Email',
                                title: 'Email'
                            },
                            {
                                field: 'operate',
                                title: 'Ações',
                                align: 'center',
                                events: this.actionsEvents,
                                formatter: this.actionsFormatter,
                                width: '100px'
                            }
                        ],
                        url: $apis.person
                    });
                };
                this.save = () => {
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
                                    title: "Sucesso!",
                                    text: "Alterações realizadas com sucesso!",
                                    type: "success",
                                    showCancelButton: true,
                                    cancelButtonColor: "#4cb64c",
                                    cancelButtonText: "Ir para a edição completa"
                                }, (isConfirm) => {
                                    $(this._tableSelector).bootstrapTable('refresh', { silent: true });
                                    $(this.vmTargetElement).modal('hide');
                                    if (!isConfirm) {
                                        window.open(this.getDetailPageUrl(data.Content.Id), '_blank');
                                    }
                                    var index = $(this._tableSelector + ' tr.selected').data('index');
                                    if (index !== undefined) {
                                        $(this._tableSelector).bootstrapTable('updateRow', { index: index, row: data.Content });
                                    }
                                    else {
                                        $(this._tableSelector).bootstrapTable('append', data.Content);
                                    }
                                });
                            }
                            else {
                                swal({
                                    title: "Ooops...",
                                    text: "Ocorreu um problema em sua requisição, tente novamente!",
                                    type: "error"
                                });
                            }
                        },
                        error: (data) => {
                            $log.error('Person :: Save Method', data);
                        }
                    });
                };
                this._tableSelector = tableSelector;
                this._tableToolbarSelector = tableToolbarSelector;
                this.saved = false;
                $(document).ready(() => {
                    $(this._tableToolbarSelector).find('button[name="new"]').on('click', (e) => {
                        this.person(new Clinike.Models.KoPerson());
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
        }
        Person.List = List;
        class Detail extends ViewModels.BaseKoViewModel {
            constructor(targetElement, personId) {
                super(targetElement);
                this.person = ko.observable();
                this.getPerson = (successCallback, errorCallback) => {
                    var url = $apis.person;
                    new Clinike.Ajax({
                        url: $apis.person,
                        data: { id: this._personId }
                    }, (data) => {
                        this.person(data.Content);
                        if (successCallback)
                            successCallback();
                    }, (data) => {
                        $log.error('Person :: Get Method', data);
                    });
                };
                this._personId = personId;
                this.saved = false;
                if (this._personId > 0) {
                    this.getPerson();
                }
                this.applyViewModel(this);
            }
        }
        Person.Detail = Detail;
    })(Person = ViewModels.Person || (ViewModels.Person = {}));
})(ViewModels || (ViewModels = {}));
var ViewModels;
(function (ViewModels) {
    var Phone;
    (function (Phone) {
        class List extends ViewModels.BaseKoViewModel {
            constructor(personId, targetElement, tableSelector, tableToolbarSelector = '') {
                super(targetElement);
                this.phonesLoaded = false;
                this.getList = () => {
                    var actionsEvents = $bootstrapTable.defaultActionsEventsBuilder(this.vmTargetElementSelector, (e, row) => {
                        this.Detail.saved = false;
                    }, (e, row) => {
                        if (!this.Detail.saved) {
                            swal({
                                title: "Você tem certeza?",
                                text: "Se mudanças tiverem sido feitas você perderá, deseja mesmo continuar?",
                                type: "warning",
                                allowEscapeKey: false,
                                showCancelButton: true,
                                cancelButtonColor: "#DD6B55",
                                cancelButtonText: "Descartar!",
                                confirmButtonText: "Voltar ao fomulário",
                                closeOnConfirm: true,
                                closeOnCancel: true
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
                    }, (row) => {
                        swal({
                            title: "Você tem certeza?",
                            text: "Tem certeza que deseja excluir esse registro?",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Sim",
                            cancelButtonText: "Não",
                            closeOnConfirm: true,
                            showLoaderOnConfirm: true
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
                                                    title: "Excluido!",
                                                    text: "Registro excluido com sucesso!",
                                                    type: "success"
                                                });
                                            }
                                            else {
                                                swal({
                                                    title: "Ooops...",
                                                    text: "Esse registro parece já ter sido excluido, mas tudo bem, atualizamos seu grid.",
                                                    type: "info"
                                                });
                                            }
                                        }
                                        else {
                                            swal({
                                                title: "Ooops...",
                                                text: "Ocorreu um problema em sua requisição, tente novamente!",
                                                type: "error"
                                            });
                                        }
                                    },
                                    error: (data) => {
                                        swal({
                                            title: "Ooops...",
                                            text: "Ocorreu um erro em sua requisição! (código: {0})".format(data.statusText),
                                            type: "error"
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
                            selector: this._tableSelector,
                            defaultParser: true,
                            customQueryParams: { personId: this._personId },
                            responseHandler: (result) => {
                                var data = $bootstrapTable.defaultParser(result);
                                return data;
                            },
                            selectCallback: (data, e) => {
                                $log.verbose('SelectRow :: Setting Phone data >', data);
                                var mapped = new Clinike.Models.KoPhone(data);
                                $log.verbose('SelectRow :: Setting Phone data mapped >', mapped);
                                this.Detail.phone(mapped);
                                $log.verbose('SelectRow :: Activate Phone Edit Button');
                                $(this._tableToolbarSelector).find('button[name="fullEdit"]').removeAttr('disabled');
                            },
                            toolbar: this._tableToolbarSelector,
                            columns: [
                                {
                                    field: 'Id',
                                    title: 'ID'
                                },
                                {
                                    field: 'DateIns',
                                    title: 'Data de Criação',
                                    formatter: $bootstrapTable.defaultDateFormatter,
                                    width: '150px'
                                },
                                {
                                    field: 'Number',
                                    title: 'Numero'
                                },
                                {
                                    field: 'Contact',
                                    title: 'Contato'
                                },
                                {
                                    field: 'AcceptSMS',
                                    title: 'Aceita SMS?'
                                },
                                {
                                    field: 'PhoneType',
                                    title: 'Tipo'
                                },
                                {
                                    field: 'operate',
                                    title: 'Ações',
                                    align: 'center',
                                    events: actionsEvents,
                                    formatter: $bootstrapTable.defaultActionFormatter,
                                    width: '100px'
                                }
                            ],
                            url: $apis.phone
                        });
                    }
                };
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
                    this.Detail.phone(new Clinike.Models.KoPhone());
                    $(this.vmTargetElementSelector).modal('show');
                });
            }
        }
        Phone.List = List;
        class Detail extends ViewModels.BaseKoViewModel {
            constructor(targetElement, phone) {
                super(targetElement);
                this.phone = ko.observable();
                this.saved = false;
                this.save = (callback) => {
                    var data = new Clinike.Models.KoPhone();
                    $log.checkpoint('ViewModels.Phone.Detail.save :: data >', data);
                    //DO STUFF
                    if (callback) {
                        $log.checkpoint('ViewModels.Phone.Detail.save :: callback');
                        callback(data);
                        this.saved = true;
                    }
                };
                this.phone(phone);
                this.applyViewModel(this);
            }
        }
        Phone.Detail = Detail;
    })(Phone = ViewModels.Phone || (ViewModels.Phone = {}));
})(ViewModels || (ViewModels = {}));
var ViewModels;
(function (ViewModels) {
    var Document;
    (function (Document) {
        class List extends ViewModels.BaseKoViewModel {
            constructor(personId, targetElement, tableSelector, tableToolbarSelector = '') {
                super(targetElement);
                this.documentsLoaded = false;
                this.getList = () => {
                    var actionsEvents = $bootstrapTable.defaultActionsEventsBuilder(this.vmTargetElementSelector, (e, row) => {
                        this.Detail.saved = false;
                    }, (e, row) => {
                        if (!this.Detail.saved) {
                            swal({
                                title: "Você tem certeza?",
                                text: "Se mudanças tiverem sido feitas você perderá, deseja mesmo continuar?",
                                type: "warning",
                                allowEscapeKey: false,
                                showCancelButton: true,
                                cancelButtonColor: "#DD6B55",
                                cancelButtonText: "Descartar!",
                                confirmButtonText: "Voltar ao fomulário",
                                closeOnConfirm: true,
                                closeOnCancel: true
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
                    }, (row) => {
                        swal({
                            title: "Você tem certeza?",
                            text: "Tem certeza que deseja excluir esse registro?",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Sim",
                            cancelButtonText: "Não",
                            closeOnConfirm: true,
                            showLoaderOnConfirm: true
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
                                                    title: "Excluido!",
                                                    text: "Registro excluido com sucesso!",
                                                    type: "success"
                                                });
                                            }
                                            else {
                                                swal({
                                                    title: "Ooops...",
                                                    text: "Esse registro parece já ter sido excluido, mas tudo bem, atualizamos seu grid.",
                                                    type: "info"
                                                });
                                            }
                                        }
                                        else {
                                            swal({
                                                title: "Ooops...",
                                                text: "Ocorreu um problema em sua requisição, tente novamente!",
                                                type: "error"
                                            });
                                        }
                                    },
                                    error: (data) => {
                                        swal({
                                            title: "Ooops...",
                                            text: "Ocorreu um erro em sua requisição! (código: {0})".format(data.statusText),
                                            type: "error"
                                        });
                                    }
                                });
                            }
                            else {
                                setTimeout(() => {
                                    swal("Cancelado", "Tudo como estava! =)", "info");
                                }, 150);
                            }
                        });
                    });
                    if (!this.documentsLoaded) {
                        this.documentsLoaded = true;
                        $bootstrapTable.load({
                            selector: this._tableSelector,
                            defaultParser: true,
                            customQueryParams: { personId: this._personId, include: 'DocumentType' },
                            responseHandler: (result) => {
                                var data = $bootstrapTable.defaultParser(result);
                                return data;
                            },
                            selectCallback: (data, e) => {
                                $log.verbose('SelectRow :: Setting Document data >', data);
                                var mapped = new Clinike.Models.KoDocument(data);
                                $log.verbose('SelectRow :: Setting Document data mapped >', mapped);
                                this.Detail.document(mapped);
                                $log.verbose('SelectRow :: Activate Document Edit Button');
                                $(this._tableToolbarSelector).find('button[name="fullEdit"]').removeAttr('disabled');
                            },
                            toolbar: this._tableToolbarSelector,
                            columns: [
                                {
                                    field: 'Id',
                                    title: 'ID'
                                },
                                {
                                    field: 'DateIns',
                                    title: 'Data de Criação',
                                    formatter: $bootstrapTable.defaultDateFormatter,
                                    width: '150px'
                                },
                                {
                                    field: 'Value',
                                    title: 'Valor'
                                },
                                {
                                    field: 'operate',
                                    title: 'Ações',
                                    align: 'center',
                                    events: actionsEvents,
                                    formatter: $bootstrapTable.defaultActionFormatter,
                                    width: '100px'
                                }
                            ],
                            url: $apis.document
                        });
                    }
                };
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
                    this.Detail.document(new Clinike.Models.KoDocument());
                    $(this.vmTargetElementSelector).modal('show');
                });
            }
        }
        Document.List = List;
        class Detail extends ViewModels.BaseKoViewModel {
            constructor(targetElement, document) {
                super(targetElement);
                this.document = ko.observable();
                this.saved = false;
                this.save = (callback) => {
                    var data = new Clinike.Models.KoDocument();
                    $log.checkpoint('ViewModels.Document.Detail.save :: data >', data);
                    //DO STUFF
                    if (callback) {
                        $log.checkpoint('ViewModels.Document.Detail.save :: callback');
                        callback(data);
                        this.saved = true;
                    }
                };
                this.document(document);
                this.applyViewModel(this);
            }
        }
        Document.Detail = Detail;
    })(Document = ViewModels.Document || (ViewModels.Document = {}));
})(ViewModels || (ViewModels = {}));
var ViewModels;
(function (ViewModels) {
    var Address;
    (function (Address) {
        class List extends ViewModels.BaseKoViewModel {
            constructor(personId, targetElement, tableSelector, tableToolbarSelector = '') {
                super(targetElement);
                this.loaded = false;
                this.getList = () => {
                    var actionsEvents = $bootstrapTable.defaultActionsEventsBuilder(this.vmTargetElementSelector, (e, row) => {
                        this.Detail.saved = false;
                    }, (e, row) => {
                        if (!this.Detail.saved) {
                            swal({
                                title: "Você tem certeza?",
                                text: "Se mudanças tiverem sido feitas você perderá, deseja mesmo continuar?",
                                type: "warning",
                                allowEscapeKey: false,
                                showCancelButton: true,
                                cancelButtonColor: "#DD6B55",
                                cancelButtonText: "Descartar!",
                                confirmButtonText: "Voltar ao fomulário",
                                closeOnConfirm: true,
                                closeOnCancel: true
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
                    }, (row) => {
                        swal({
                            title: "Você tem certeza?",
                            text: "Tem certeza que deseja excluir esse registro?",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Sim",
                            cancelButtonText: "Não",
                            closeOnConfirm: true,
                            showLoaderOnConfirm: true
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
                                                    title: "Excluido!",
                                                    text: "Registro excluido com sucesso!",
                                                    type: "success"
                                                });
                                            }
                                            else {
                                                swal({
                                                    title: "Ooops...",
                                                    text: "Esse registro parece já ter sido excluido, mas tudo bem, atualizamos seu grid.",
                                                    type: "info"
                                                });
                                            }
                                        }
                                        else {
                                            swal({
                                                title: "Ooops...",
                                                text: "Ocorreu um problema em sua requisição, tente novamente!",
                                                type: "error"
                                            });
                                        }
                                    },
                                    error: (data) => {
                                        swal({
                                            title: "Ooops...",
                                            text: "Ocorreu um erro em sua requisição! (código: {0})".format(data.statusText),
                                            type: "error"
                                        });
                                    }
                                });
                            }
                            else {
                                setTimeout(() => {
                                    swal("Cancelado", "Tudo como estava! =)", "info");
                                }, 150);
                            }
                        });
                    });
                    if (!this.loaded) {
                        this.loaded = true;
                        $bootstrapTable.load({
                            selector: this._tableSelector,
                            defaultParser: true,
                            customQueryParams: { personId: this._personId },
                            responseHandler: (result) => {
                                var data = $bootstrapTable.defaultParser(result);
                                return data;
                            },
                            selectCallback: (data, e) => {
                                $log.verbose('SelectRow :: Setting Address data >', data);
                                var mapped = new Clinike.Models.KoAddress(data);
                                $log.verbose('SelectRow :: Setting Address data mapped >', mapped);
                                this.Detail.address(mapped);
                                $log.verbose('SelectRow :: Activate Address Edit Button');
                                $(this._tableToolbarSelector).find('button[name="fullEdit"]').removeAttr('disabled');
                            },
                            toolbar: this._tableToolbarSelector,
                            columns: [
                                {
                                    field: 'Id',
                                    title: 'ID'
                                },
                                {
                                    field: 'DateIns',
                                    title: 'Data de Criação',
                                    formatter: $bootstrapTable.defaultDateFormatter,
                                    width: '150px'
                                },
                                {
                                    field: 'Street',
                                    title: 'Rua'
                                },
                                {
                                    field: 'Number',
                                    title: 'Número'
                                },
                                {
                                    field: 'Neighborhood',
                                    title: 'Bairro'
                                },
                                {
                                    field: 'City',
                                    title: 'Cidade'
                                },
                                {
                                    field: 'State',
                                    title: 'Estado'
                                },
                                {
                                    field: 'ZipCode',
                                    title: 'CEP'
                                },
                                {
                                    field: 'AddressType',
                                    title: 'Tipe'
                                },
                                {
                                    field: 'operate',
                                    title: 'Ações',
                                    align: 'center',
                                    events: actionsEvents,
                                    formatter: $bootstrapTable.defaultActionFormatter,
                                    width: '100px'
                                }
                            ],
                            url: $apis.address
                        });
                    }
                };
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
                    this.Detail.address(new Clinike.Models.KoAddress());
                    $(this.vmTargetElementSelector).modal('show');
                });
            }
        }
        Address.List = List;
        class Detail extends ViewModels.BaseKoViewModel {
            constructor(targetElement, address) {
                super(targetElement);
                this.address = ko.observable();
                this.saved = false;
                this.save = (callback) => {
                    var data = new Clinike.Models.KoAddress();
                    $log.checkpoint('ViewModels.Address.Detail.save :: data >', data);
                    //DO STUFF
                    if (callback) {
                        $log.checkpoint('ViewModels.Address.Detail.save :: callback');
                        callback(data);
                        this.saved = true;
                    }
                };
                this.address(address);
                this.applyViewModel(this);
            }
        }
        Address.Detail = Detail;
    })(Address = ViewModels.Address || (ViewModels.Address = {}));
})(ViewModels || (ViewModels = {}));
//# sourceMappingURL=Person.js.map