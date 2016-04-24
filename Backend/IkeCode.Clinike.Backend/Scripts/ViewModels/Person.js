///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/bootstrap/bootstrap.d.ts" />
///<reference path="../typings/knockout/knockout.d.ts" />
///<reference path="../typings/knockout.mapping/knockout.mapping.d.ts" />
///<reference path="../typings/moment/moment.d.ts" />
///<reference path="../typings/requirejs/require.d.ts" />
///<reference path="../typings/custom/custom.d.ts" />
///<reference path="../clinike.ts" />
var Person;
(function (Person_1) {
    var Models;
    (function (Models) {
        class Address {
            constructor(addr) {
                this.Id = ko.observable(0);
                this.DateIns = ko.observable(new Date());
                this.LastUpdate = ko.observable(new Date());
                this.Street = ko.observable('');
                this.Number = ko.observable('');
                $log.verbose('Person.Models.Document :: constructor [address]', addr);
                if (addr) {
                    this.Id(addr.Id());
                    this.DateIns(addr.DateIns());
                    this.LastUpdate(addr.LastUpdate());
                    this.Number(addr.Number());
                    this.Street(addr.Street());
                }
            }
        }
        Models.Address = Address;
        class Document {
            constructor(doc) {
                this.Id = ko.observable(0);
                this.DateIns = ko.observable(new Date());
                this.LastUpdate = ko.observable(new Date());
                this.Value = ko.observable('');
                $log.verbose('Person.Models.Document :: constructor [document]', doc);
                if (doc) {
                    this.Id(doc.Id());
                    this.DateIns(doc.DateIns());
                    this.LastUpdate(doc.LastUpdate());
                    this.Value(doc.Value());
                }
            }
        }
        Models.Document = Document;
        class Phone {
            constructor(phone) {
                this.Id = ko.observable(0);
                this.DateIns = ko.observable(new Date());
                this.LastUpdate = ko.observable(new Date());
                this.Number = ko.observable('');
                $log.verbose('Person.Models.Phone :: constructor [phone]', phone);
                if (phone) {
                    this.Id(phone.Id());
                    this.DateIns(phone.DateIns());
                    this.LastUpdate(phone.LastUpdate());
                    this.Number(phone.Number());
                }
            }
        }
        Models.Phone = Phone;
        class Person {
            constructor(person) {
                this.Id = ko.observable(0);
                this.DateIns = ko.observable(new Date());
                this.LastUpdate = ko.observable(new Date());
                this.Name = ko.observable('');
                this.Email = ko.observable('');
                $log.verbose('Person.Models.Person :: constructor [person]', person);
                if (person) {
                    this.Id(person.Id());
                    this.DateIns(person.DateIns());
                    this.LastUpdate(person.LastUpdate());
                    this.Name(person.Name());
                    this.Email(person.Email());
                }
            }
        }
        Models.Person = Person;
    })(Models = Person_1.Models || (Person_1.Models = {}));
})(Person || (Person = {}));
var Person;
(function (Person) {
    var ViewModel;
    (function (ViewModel) {
        class Base {
            constructor(targetElement) {
                this.person = ko.observable(new Person.Models.Person());
                this.dateFormatter = (value, row, index) => {
                    //$log.verbose('Bootstrap Table dateFormatter :: value', value);
                    //$log.verbose('Bootstrap Table dateFormatter :: row', row);
                    //$log.verbose('Bootstrap Table dateFormatter :: index', index);
                    return moment(value).format('DD/MM/YYYY HH:mm:ss');
                };
                this.vmTargetElement = targetElement;
            }
            applyViewModel(data) {
                if (this.vmBinded) {
                    $log.verbose('Ko :: Binding already applied to >', this.vmTargetElement);
                }
                else {
                    $log.verbose('Ko :: Applying Binding to >', this.vmTargetElement);
                    ko.applyBindings(data, this.vmTargetElement);
                    this.vmBinded = true;
                }
            }
        }
        ViewModel.Base = Base;
        class List extends Base {
            constructor(targetElement, _tableSelector) {
                super(targetElement);
                this.people = ko.observableArray([new Person.Models.Person()]);
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
                                    }
                                    else {
                                        setTimeout(() => {
                                            swal("Alterações descartadas.", "Tudo como estava antes! =)", "info");
                                        }, 150);
                                    }
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
                            $('#peopleToolbar button[name="fullEditPerson"]').removeAttr('disabled');
                        },
                        toolbar: '#peopleToolbar',
                        columns: [
                            {
                                field: 'Id',
                                title: 'ID'
                            },
                            {
                                field: 'DateIns',
                                title: 'Data de Criação',
                                formatter: this.dateFormatter
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
                this._tableSelector = _tableSelector;
                this.saved = false;
                $(document).ready(() => {
                    $('#peopleToolbar button[name="newPerson"]').on('click', (e) => {
                        this.person(new Person.Models.Person());
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
        }
        ViewModel.List = List;
        class Detail extends Base {
            constructor(targetElement, personId) {
                super(targetElement);
                this.phones = ko.observableArray(new Array());
                this.phonesLoaded = false;
                this.phone = ko.observable(new Person.Models.Phone());
                this.document = ko.observable(new Person.Models.Document());
                this.documentsLoaded = false;
                this.documents = ko.observableArray(new Array());
                this.address = ko.observable(new Person.Models.Address());
                this.addressesLoaded = false;
                this.addresses = ko.observableArray(new Array());
                this.getPhones = () => {
                    if (!this.phonesLoaded) {
                        this.phonesLoaded = true;
                        $bootstrapTable.load({
                            selector: "#dtPhones",
                            defaultParser: true,
                            customQueryParams: { personId: this._personId },
                            responseHandler: (result) => {
                                this.phones(result.Content.Items);
                                var data = $bootstrapTable.defaultParser(result);
                                return data;
                            },
                            selectCallback: (data, e) => {
                                $log.verbose('SelectRow :: Setting Phone data', data);
                                this.phone(data);
                                $log.verbose('SelectRow :: Activate Phone Edit Button');
                                $('#phonesToolbar button[name="fullEdit"]').removeAttr('disabled');
                            },
                            toolbar: '#phonesToolbar',
                            columns: [
                                {
                                    field: 'Id',
                                    title: 'ID'
                                },
                                {
                                    field: 'DateIns',
                                    title: 'Data de Criação',
                                    formatter: this.dateFormatter
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
                                }
                            ],
                            url: $apis.phone
                        });
                    }
                };
                this.getDocuments = () => {
                    if (!this.documentsLoaded) {
                        this.documentsLoaded = true;
                        $bootstrapTable.load({
                            selector: "#dtDocuments",
                            defaultParser: true,
                            customQueryParams: { personId: this._personId },
                            responseHandler: (result) => {
                                var data = $bootstrapTable.defaultParser(result);
                                this.documents(result.Content.Items);
                                return data;
                            },
                            selectCallback: (data, e) => {
                                $log.verbose('SelectRow :: Setting Documents data', data);
                                this.document(data);
                                $log.verbose('SelectRow :: Activate Document Edit Button');
                                $('#documentsToolbar button[name="fullEdit"]').removeAttr('disabled');
                            },
                            toolbar: '#documentsToolbar',
                            columns: [
                                {
                                    field: 'Id',
                                    title: 'ID'
                                },
                                {
                                    field: 'DateIns',
                                    title: 'Data de Criação',
                                    formatter: this.dateFormatter
                                },
                                {
                                    field: 'Value',
                                    title: 'Valor'
                                }
                            ],
                            url: $apis.document
                        });
                    }
                };
                this.getAddresses = () => {
                    if (!this.addressesLoaded) {
                        this.addressesLoaded = true;
                        $bootstrapTable.load({
                            selector: "#dtAddresses",
                            defaultParser: true,
                            customQueryParams: { personId: this._personId },
                            responseHandler: (result) => {
                                var data = $bootstrapTable.defaultParser(result);
                                this.addresses(result.Content.Items);
                                return data;
                            },
                            selectCallback: (data, e) => {
                                $log.verbose('SelectRow :: Setting Addresses data', data);
                                this.address(data);
                                $log.verbose('SelectRow :: Activate Address Edit Button');
                                $('#addressesToolbar button[name="fullEdit"]').removeAttr('disabled');
                            },
                            toolbar: '#addressesToolbar',
                            columns: [
                                {
                                    field: 'Id',
                                    title: 'ID'
                                },
                                {
                                    field: 'DateIns',
                                    title: 'Data de Criação',
                                    formatter: this.dateFormatter
                                },
                                {
                                    field: 'Street',
                                    title: 'Rua'
                                },
                                {
                                    field: 'Number',
                                    title: 'Numero'
                                }
                            ],
                            url: $apis.address
                        });
                    }
                };
                this.getPerson = (successCallback, errorCallback) => {
                    var url = $apis.person;
                    $.ajax({
                        url: url,
                        contentType: "application/json",
                        async: true,
                        dataType: "json",
                        type: 'GET',
                        data: { id: this._personId },
                        success: (data) => {
                            $log.verbose('Person getPerson :: ajax result', data);
                            if (data.Status == 'Success') {
                                this.person(data.Content);
                                if (successCallback)
                                    successCallback();
                            }
                            else {
                                swal({
                                    title: "Ooops...",
                                    text: "Ocorreu um problema em sua requisição, tente novamente!",
                                    type: "error"
                                });
                                if (errorCallback)
                                    errorCallback();
                            }
                        },
                        error: (data) => {
                            $log.error('Person :: Get Method', data);
                        }
                    });
                };
                this._personId = personId;
                this.saved = false;
                var loadGrid = (e, callback) => {
                    e.preventDefault();
                    callback();
                    $(e.target).tab('show');
                };
                this.applyViewModel(this);
                if (this._personId > 0) {
                    $('#personChildrenTabs a[href="#phones"]').on('click', (e) => {
                        loadGrid(e, this.getPhones);
                    });
                    $('#personChildrenTabs a[href="#documents"]').on('click', (e) => {
                        loadGrid(e, this.getDocuments);
                    });
                    $('#personChildrenTabs a[href="#addresses"]').on('click', (e) => {
                        loadGrid(e, this.getAddresses);
                    });
                    this.getPerson();
                }
            }
        }
        ViewModel.Detail = Detail;
    })(ViewModel = Person.ViewModel || (Person.ViewModel = {}));
})(Person || (Person = {}));
//# sourceMappingURL=Person.js.map