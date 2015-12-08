///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.mask.d.ts" />
///<reference path="../typings/bootstrap/bootstrap.d.ts" />
///<reference path="../typings/knockout/knockout.d.ts" />
///<reference path="../typings/knockout.mapping/knockout.mapping.d.ts" />
///<reference path="../typings/snarl/snarl.d.ts" />
///<reference path="../typings/ikecode/ko.customBindingHandlers.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DoctorModule;
(function (DoctorModule) {
    var KoViewModel = (function (_super) {
        __extends(KoViewModel, _super);
        function KoViewModel(targetSelector, personId) {
            var _this = this;
            _super.call(this);
            this._validationGroup = ko.validatedObservable(this);
            this._validationErrors = ko.validation.group(this);
            this.Init = function () {
                if (_this._targetSelector) {
                    var vm = ko.mapping.fromJS(_this);
                    var target = $(_this._targetSelector).get(0);
                    ko.cleanNode(target);
                    ko.applyBindings(vm, target);
                }
                _this.AdmissionDate.subscribe(function (oldValue) {
                    //console.log('subscribe -> oldValue', oldValue);
                    var utcDate = new Date(new Date(oldValue).toUTCString());
                    //console.log('subscribe -> this.AdmissionDate.subscribe toLocaleDateString', utcDate.toLocaleDateString());
                    //this.AdmissionDate(utcDate.toLocaleDateString());
                    //var date = moment(oldValue).format("DD/MM/YY");
                    //console.log('moment date', date);
                });
            };
            this.FetchDoctor = function (personId) {
                if (personId === void 0) { personId = _this._personId; }
                //console.log('DoctorModule.KoViewModel.FetchDoctor(personId)', personId);
                if (personId > 0) {
                    $.ajax({
                        url: apiConfigs._baseUrlPersonApi + 'Doctor/' + personId,
                        data: { children: 'Person' },
                        method: 'GET',
                        success: function (data) {
                            console.log('FetchDoctor data', data);
                            if (data !== null && data !== undefined) {
                                _this.Update(data);
                            }
                        },
                        error: function (text) {
                            Snarl.addNotification({ title: 'Ooops...', text: 'Ocorreu um erro ao tentar pegar os detalhes do médico' });
                        }
                    });
                }
                else {
                    Snarl.addNotification({ title: 'Ooops...', text: 'Nenhum médico associado a essa pessoa' });
                }
            };
            this.Save = function () {
                var data = _this.toJS();
                //data.Person = new PersonPoco();
                //data.Person.Id = this._personId;
                console.log('data', data);
                var isEdit = _this.Id() > 0;
                var method = "POST";
                var url = apiConfigs._baseUrlPersonApi + "Doctor";
                if (isEdit) {
                    method = "PUT";
                    url += "/" + _this.Id();
                }
                $.ajax({
                    url: url,
                    data: JSON.stringify(data),
                    method: method,
                    dataType: 'json',
                    crossDomain: true,
                    contentType: 'application/json',
                    success: function (data, textStatus, jqXHR) {
                        //if (common.EnableLogGlobal) {
                        console.log('Doctor Save Success');
                        console.log('Doctor Save data', data);
                        console.log('Doctor Save textStatus', textStatus);
                        //}
                        Snarl.addNotification({ title: 'Registro inserido com sucesso!' });
                    },
                    error: function (err) {
                        console.log('Save Error! -> method (' + method + ') | url (' + url + ') | error ---->', err);
                    }
                });
            };
            this.Delete = function () {
                if (common.EnableLogGlobal) {
                    console.log('Doctor Delete');
                }
                confirmModal.Show({
                    Title: 'Confirmação',
                    Message: 'Deseja realmente excluir esse registro?',
                    ConfirmCallback: function () {
                        $.ajax({
                            url: apiConfigs._baseUrlPersonApi + 'Doctor/' + _this.Id(),
                            method: 'DELETE',
                            dataType: 'json',
                            crossDomain: true,
                            contentType: 'application/json',
                            success: function (data, textStatus, jqXHR) {
                                if (common.EnableLogGlobal) {
                                    console.log('Doctor Delete Success');
                                    console.log('data', data);
                                    console.log('textStatus', textStatus);
                                }
                                Snarl.addNotification({ title: 'Registro excluído com sucesso!' });
                            },
                            error: function (err) {
                                if (common.EnableLogGlobal) {
                                    console.log('Doctor Delete Error!', err);
                                }
                            }
                        });
                    }
                });
            };
            this._targetSelector = targetSelector;
            this._personId = personId;
            common.ApplyKnockoutCustoms();
            $('input[name="AdmissionDate"]').mask('99/99/9999');
        }
        return KoViewModel;
    })(KoDoctor);
    DoctorModule.KoViewModel = KoViewModel;
})(DoctorModule || (DoctorModule = {}));
