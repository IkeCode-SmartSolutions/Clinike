///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/bootstrap/bootstrap.d.ts" />
///<reference path="../typings/knockout/knockout.d.ts" />
///<reference path="../typings/knockout.mapping/knockout.mapping.d.ts" />
///<reference path="../typings/moment/moment.d.ts" />
///<reference path="../typings/requirejs/require.d.ts" />
///<reference path="../typings/custom/custom.d.ts" />
///<reference path="../clinike.ts" />
///<reference path="../clinike.ajax.ts" />
///<reference path="../clinike.log.ts" />
///<reference path="../clinike.apiBaseUrls.ts" />
module Person.Models {
    export interface IAddress {
        Id: KnockoutObservable<number>;
        DateIns: KnockoutObservable<Date>;
        LastUpdate: KnockoutObservable<Date>;
        Street: KnockoutObservable<string>;
        Number: KnockoutObservable<string>;
    }

    export class Address implements IAddress {
        Id: KnockoutObservable<number> = ko.observable(0);
        DateIns: KnockoutObservable<Date> = ko.observable(new Date());
        LastUpdate: KnockoutObservable<Date> = ko.observable(new Date());
        Street: KnockoutObservable<string> = ko.observable('');
        Number: KnockoutObservable<string> = ko.observable('');

        constructor(addr?: IAddress) {
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

    export interface IDocument {
        Id: KnockoutObservable<number>;
        DateIns: KnockoutObservable<Date>;
        LastUpdate: KnockoutObservable<Date>;
        Value: KnockoutObservable<string>;
    }

    export class Document implements IDocument {
        Id: KnockoutObservable<number> = ko.observable(0);
        DateIns: KnockoutObservable<Date> = ko.observable(new Date());
        LastUpdate: KnockoutObservable<Date> = ko.observable(new Date());
        Value: KnockoutObservable<string> = ko.observable('');

        constructor(doc?: IDocument) {
            $log.verbose('Person.Models.Document :: constructor [document]', doc);
            if (doc) {
                this.Id(doc.Id());
                this.DateIns(doc.DateIns());
                this.LastUpdate(doc.LastUpdate());
                this.Value(doc.Value());
            }
        }
    }

    export interface IPhone {
        Id: KnockoutObservable<number>;
        DateIns: KnockoutObservable<Date>;
        LastUpdate: KnockoutObservable<Date>;
        Number: KnockoutObservable<string>;
    }

    export class Phone implements IPhone {
        Id: KnockoutObservable<number> = ko.observable(0);
        DateIns: KnockoutObservable<Date> = ko.observable(new Date());
        LastUpdate: KnockoutObservable<Date> = ko.observable(new Date());
        Number: KnockoutObservable<string> = ko.observable('');

        constructor(phone?: IPhone) {
            $log.verbose('Person.Models.Phone :: constructor [phone]', phone);
            if (phone) {
                this.Id(phone.Id());
                this.DateIns(phone.DateIns());
                this.LastUpdate(phone.LastUpdate());
                this.Number(phone.Number());
            }
        }
    }

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
}

module Person.ViewModel {
    export class Base {
        protected vmBinded: boolean;
        protected vmTargetElement: any;
        protected saved: boolean;
        person: KnockoutObservable<Person.Models.IPerson> = ko.observable(new Person.Models.Person());

        constructor(targetElement: any) {
            this.vmTargetElement = targetElement;
        }

        protected applyViewModel(data: any) {
            if (this.vmBinded) {
                $log.verbose('Ko :: Binding already applied to >', this.vmTargetElement);
            } else {
                $log.verbose('Ko :: Applying Binding to >', this.vmTargetElement);
                ko.applyBindings(data, this.vmTargetElement);
                this.vmBinded = true;
            }
        }

        protected dateFormatter = (value, row, index) => {
            //$log.verbose('Bootstrap Table dateFormatter :: value', value);
            //$log.verbose('Bootstrap Table dateFormatter :: row', row);
            //$log.verbose('Bootstrap Table dateFormatter :: index', index);
            return moment(value).format('DD/MM/YYYY HH:mm:ss');
        };
    }

    export class List extends Base {
        people: KnockoutObservableArray<Person.Models.IPerson> = ko.observableArray([new Person.Models.Person()]);
        private _tableSelector: string;

        constructor(targetElement: HTMLElement, _tableSelector: string) {
            super(targetElement);
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

    export class Detail extends Base {
        private _personId: number;

        phones: KnockoutObservableArray<Person.Models.IPhone> = ko.observableArray(new Array<Person.Models.Phone>());
        phonesLoaded: boolean = false;
        phone: KnockoutObservable<Person.Models.IPhone> = ko.observable(new Person.Models.Phone());

        document: KnockoutObservable<Person.Models.IDocument> = ko.observable(new Person.Models.Document());
        documentsLoaded: boolean = false;
        documents: KnockoutObservableArray<Person.Models.IDocument> = ko.observableArray(new Array<Person.Models.Document>());

        address: KnockoutObservable<Person.Models.IAddress> = ko.observable(new Person.Models.Address());
        addressesLoaded: boolean = false;
        addresses: KnockoutObservableArray<Person.Models.IAddress> = ko.observableArray(new Array<Person.Models.Address>());

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

        private getPhones = () => {
            if (!this.phonesLoaded) {
                this.phonesLoaded = true;
                $bootstrapTable.load({
                    selector: "#dtPhones"
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
                            formatter: this.dateFormatter
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
                        //, {
                        //    field: 'operate',
                        //    title: 'Ações',
                        //    align: 'center',
                        //    events: this.actionsEvents,
                        //    formatter: this.actionsFormatter,
                        //    width: '100px'
                        //}
                    ]
                    , url: $apis.phone
                });
            }
        }

        private getDocuments = () => {
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
                            formatter: this.dateFormatter
                        }
                        , {
                            field: 'Value',
                            title: 'Valor'
                        }
                        //, {
                        //    field: 'operate',
                        //    title: 'Ações',
                        //    align: 'center',
                        //    events: this.actionsEvents,
                        //    formatter: this.actionsFormatter,
                        //    width: '100px'
                        //}
                    ]
                    , url: $apis.document
                });
            }
        }

        private getAddresses = () => {
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
                            formatter: this.dateFormatter
                        }
                        , {
                            field: 'Street',
                            title: 'Rua'
                        }
                        , {
                            field: 'Number',
                            title: 'Numero'
                        }
                        //, {
                        //    field: 'operate',
                        //    title: 'Ações',
                        //    align: 'center',
                        //    events: this.actionsEvents,
                        //    formatter: this.actionsFormatter,
                        //    width: '100px'
                        //}
                    ]
                    , url: $apis.address
                });
            }
        }

        private getPerson = (successCallback?: () => any, errorCallback?: () => any) => {
            var url = $apis.person;

            new Clinike.Ajax<Person.Models.IPerson>({
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