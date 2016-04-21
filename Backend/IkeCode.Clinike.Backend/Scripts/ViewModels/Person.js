var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/bootstrap/bootstrap.d.ts" />
///<reference path="../typings/knockout/knockout.d.ts" />
///<reference path="../typings/knockout.mapping/knockout.mapping.d.ts" />
///<reference path="../typings/moment/moment.d.ts" />
///<reference path="../typings/custom/custom.d.ts" />
var Person;
(function (Person_1) {
    var Models;
    (function (Models) {
        var Phone = (function () {
            function Phone(phone) {
                this.Id = ko.observable(0);
                this.DateIns = ko.observable(new Date());
                this.LastUpdate = ko.observable(new Date());
                this.Number = ko.observable('');
                $utils.log.verbose('Person.Models.Phone :: constructor [phone]', phone);
                if (phone) {
                    this.Id(phone.Id());
                    this.DateIns(phone.DateIns());
                    this.LastUpdate(phone.LastUpdate());
                    this.Number(phone.Number());
                }
            }
            return Phone;
        })();
        Models.Phone = Phone;
        var Person = (function () {
            function Person(person) {
                this.Id = ko.observable(0);
                this.DateIns = ko.observable(new Date());
                this.LastUpdate = ko.observable(new Date());
                this.Name = ko.observable('');
                this.Email = ko.observable('');
                $utils.log.verbose('Person.Models.Person :: constructor [person]', person);
                if (person) {
                    this.Id(person.Id());
                    this.DateIns(person.DateIns());
                    this.LastUpdate(person.LastUpdate());
                    this.Name(person.Name());
                    this.Email(person.Email());
                }
            }
            return Person;
        })();
        Models.Person = Person;
    })(Models = Person_1.Models || (Person_1.Models = {}));
})(Person || (Person = {}));
var Person;
(function (Person) {
    var ViewModel;
    (function (ViewModel) {
        var Base = (function () {
            function Base(targetElement) {
                this.person = ko.observable(new Person.Models.Person());
                this.vmTargetElement = targetElement;
            }
            Base.prototype.applyViewModel = function (data) {
                if (this.vmBinded) {
                    $utils.log.verbose('Ko :: Binding already applied to >', this.vmTargetElement);
                }
                else {
                    $utils.log.verbose('Ko :: Applying Binding to >', this.vmTargetElement);
                    ko.applyBindings(data, this.vmTargetElement);
                    this.vmBinded = true;
                }
            };
            return Base;
        })();
        var List = (function (_super) {
            __extends(List, _super);
            function List(targetElement, _tableSelector) {
                var _this = this;
                _super.call(this, targetElement);
                this.people = ko.observableArray([new Person.Models.Person()]);
                this.getDetailPageUrl = function (id) {
                    return (window.location.toString() + "/detalhe/{0}").format(id);
                };
                this.actionsEvents = {
                    'click .personEdit': function (e, value, row, index) {
                        $(_this.vmTargetElement)
                            .modal()
                            .on('shown.bs.modal', function (shownElement) {
                            _this.saved = false;
                        })
                            .on('hide.bs.modal', function (hideElement) {
                            if (!_this.saved) {
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
                                        setTimeout(function () {
                                            swal("Alterações descartadas.", "Tudo como estava antes! =)", "info");
                                        }, 150);
                                    }
                                });
                            }
                        });
                    },
                    'click .personDelete': function (e, value, row, index) {
                        //$utils.log.verbose('PeopleViewModel personDelete e', e);
                        //$utils.log.verbose('PeopleViewModel personDelete row', row);
                        //$utils.log.verbose('PeopleViewModel personDelete index', index);
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
                        }, function (isConfirm) {
                            if (isConfirm) {
                                $.ajax({
                                    url: $utils.baseApiUrls.person + '/' + _this.person().Id,
                                    contentType: "application/json",
                                    async: true,
                                    dataType: "json",
                                    type: 'DELETE',
                                    success: function (data) {
                                        $utils.log.verbose('PeopleViewModel personDelete ajax result data', data);
                                        if (data.Status == 'Success') {
                                            $(_this._tableSelector).bootstrapTable('remove', {
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
                                    error: function (data) {
                                        swal({
                                            title: "Ooops...",
                                            text: "Ocorreu um erro em sua requisição! (código: {0})".format(data.statusText),
                                            type: "error"
                                        });
                                    }
                                });
                            }
                            else {
                                setTimeout(function () {
                                    swal("Cancelado", "Tudo como estava! =)", "info");
                                }, 150);
                            }
                        });
                    }
                };
                this.dateFormatter = function (value, row, index) {
                    //$utils.log.verbose('Bootstrap Table dateFormatter :: value', value);
                    //$utils.log.verbose('Bootstrap Table dateFormatter :: row', row);
                    //$utils.log.verbose('Bootstrap Table dateFormatter :: index', index);
                    return moment(value).format('DD/MM/YYYY HH:mm:ss');
                };
                this.actionsFormatter = function (value, row, index) {
                    return $('#peopleRowActions').html();
                };
                this.renderPeopleGrid = function () {
                    var table = new $utils.bootstrapTable.load({
                        selector: _this._tableSelector,
                        defaultParser: true,
                        selectCallback: function (data, e) {
                            $utils.log.verbose('SelectRow :: Setting Person data', data);
                            _this.person(data);
                            $utils.log.verbose('SelectRow :: Activate Edit Button');
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
                                formatter: _this.dateFormatter
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
                                events: _this.actionsEvents,
                                formatter: _this.actionsFormatter,
                                width: '100px'
                            }
                        ],
                        url: $utils.baseApiUrls.person
                    });
                };
                this.save = function () {
                    _this.saved = true;
                    var personJs = ko.toJS(_this.person());
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
                        success: function (data) {
                            $utils.log.verbose('Person Edit Save :: ajax result', data);
                            if (data.Status == 'Success') {
                                swal({
                                    title: "Sucesso!",
                                    text: "Alterações realizadas com sucesso!",
                                    type: "success",
                                    showCancelButton: true,
                                    cancelButtonColor: "#4cb64c",
                                    cancelButtonText: "Ir para a edição completa"
                                }, function (isConfirm) {
                                    $(_this._tableSelector).bootstrapTable('refresh', { silent: true });
                                    $(_this.vmTargetElement).modal('hide');
                                    if (!isConfirm) {
                                        window.open(_this.getDetailPageUrl(data.Content.Id), '_blank');
                                    }
                                    var index = $(_this._tableSelector + ' tr.selected').data('index');
                                    if (index !== undefined) {
                                        $(_this._tableSelector).bootstrapTable('updateRow', { index: index, row: data.Content });
                                    }
                                    else {
                                        $(_this._tableSelector).bootstrapTable('append', data.Content);
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
                        error: function (data) {
                            $utils.log.error('Person :: Save Method', data);
                        }
                    });
                };
                this._tableSelector = _tableSelector;
                this.saved = false;
                $(document).ready(function () {
                    $('#peopleToolbar button[name="newPerson"]').on('click', function (e) {
                        _this.person(new Person.Models.Person());
                        $(_this.vmTargetElement).modal('show');
                    });
                    $('#peopleToolbar button[name="fullEditPerson"]').on('click', function (e) {
                        $utils.log.verbose('People Table :: full edit clicked');
                        var url = _this.getDetailPageUrl(_this.person().Id);
                        $utils.log.verbose('People Table :: full edit clicked url', url);
                        window.open(url, '_blank');
                    });
                });
                this.renderPeopleGrid();
                this.applyViewModel(this);
            }
            return List;
        })(Base);
        ViewModel.List = List;
        var Detail = (function (_super) {
            __extends(Detail, _super);
            function Detail(targetElement, personId) {
                var _this = this;
                _super.call(this, targetElement);
                this.phones = ko.observableArray([new Person.Models.Phone()]);
                this.getPhones = function () {
                    var url = $utils.baseApiUrls.phone;
                    $.ajax({
                        url: url,
                        contentType: "application/json",
                        async: true,
                        dataType: "json",
                        type: 'GET',
                        data: { personId: _this._personId },
                        success: function (data) {
                            $utils.log.verbose('Person getPhones :: ajax result', data);
                            if (data.Status == 'Success') {
                                _this.phones(data.Content.Items);
                            }
                            else {
                                swal({
                                    title: "Ooops...",
                                    text: "Ocorreu um problema em sua requisição, tente novamente!",
                                    type: "error"
                                });
                            }
                        },
                        error: function (data) {
                            $utils.log.error('Phone :: Get Method', data);
                        }
                    });
                };
                this.getPerson = function (successCallback, errorCallback) {
                    var url = $utils.baseApiUrls.person;
                    $.ajax({
                        url: url,
                        contentType: "application/json",
                        async: true,
                        dataType: "json",
                        type: 'GET',
                        data: { id: _this._personId },
                        success: function (data) {
                            $utils.log.verbose('Person getPerson :: ajax result', data);
                            if (data.Status == 'Success') {
                                _this.person(data.Content);
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
                        error: function (data) {
                            $utils.log.error('Person :: Get Method', data);
                        }
                    });
                };
                this._personId = personId;
                this.saved = false;
                $(document).ready(function () {
                    $('#personChildrenTabs')
                        .on('click a#phones', function (e) {
                        e.preventDefault();
                        _this.getPhones();
                        $(e.target).tab('show');
                    })
                        .on('click a#documents', function (e) {
                        e.preventDefault();
                        $(this).tab('show');
                    })
                        .on('click a#addresses', function (e) {
                        e.preventDefault();
                        $(this).tab('show');
                    });
                });
                this.getPerson(function () { _this.applyViewModel(_this); });
            }
            return Detail;
        })(Base);
        ViewModel.Detail = Detail;
    })(ViewModel = Person.ViewModel || (Person.ViewModel = {}));
})(Person || (Person = {}));
//# sourceMappingURL=Person.js.map