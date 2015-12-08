///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.mask.d.ts" />
///<reference path="../typings/bootstrap/bootstrap.d.ts" />
///<reference path="../typings/knockout/knockout.d.ts" />
///<reference path="../typings/knockout.mapping/knockout.mapping.d.ts" />
///<reference path="../typings/snarl/snarl.d.ts" />
///<reference path="../typings/ikecode/ko.customBindingHandlers.d.ts" />

module DoctorModule {
    export class KoViewModel extends KoDoctor implements IKoViewModel {
        _targetSelector: string;
        _validationGroup: KnockoutValidationGroup = ko.validatedObservable(this);
        _validationErrors: KnockoutValidationErrors = ko.validation.group(this);

        private _personId: number;

        constructor(targetSelector: string, personId: number) {
            super();

            this._targetSelector = targetSelector;
            this._personId = personId;

            common.ApplyKnockoutCustoms();

            $('input[name="AdmissionDate"]').mask('99/99/9999');
        }

        public Init = () => {
            if (this._targetSelector) {
                var vm = ko.mapping.fromJS(this);

                var target = $(this._targetSelector).get(0);
                ko.cleanNode(target);
                ko.applyBindings(vm, target);
            }

            this.AdmissionDate.subscribe((oldValue: string) => {
                //console.log('subscribe -> oldValue', oldValue);

                var utcDate = new Date(new Date(oldValue).toUTCString());
                //console.log('subscribe -> this.AdmissionDate.subscribe toLocaleDateString', utcDate.toLocaleDateString());
                
                //this.AdmissionDate(utcDate.toLocaleDateString());
                //var date = moment(oldValue).format("DD/MM/YY");
                //console.log('moment date', date);
            });
        }

        public FetchDoctor = (personId: number = this._personId) => {
            //console.log('DoctorModule.KoViewModel.FetchDoctor(personId)', personId);
            if (personId > 0) {
                $.ajax({
                    url: apiConfigs._baseUrlPersonApi + 'Doctor/' + personId,
                    data: { children: 'Person' },
                    method: 'GET',
                    success: (data) => {
                        console.log('FetchDoctor data', data);
                        if (data !== null && data !== undefined) {
                            this.Update(data);
                        }
                    },
                    error: (text) => {
                        Snarl.addNotification({ title: 'Ooops...', text: 'Ocorreu um erro ao tentar pegar os detalhes do médico' });
                    }
                });
            } else {
                Snarl.addNotification({ title: 'Ooops...', text: 'Nenhum médico associado a essa pessoa' });
            }
        }

        public Save = () => {
            var data = this.toJS();
            //data.Person = new PersonPoco();
            //data.Person.Id = this._personId;

            console.log('data', data);

            var isEdit = this.Id() > 0;

            var method = "POST";
            var url = apiConfigs._baseUrlPersonApi + "Doctor";

            if (isEdit) {
                method = "PUT";
                url += "/" + this.Id();
            }

            $.ajax({
                url: url
                , data: JSON.stringify(data)
                , method: method
                , dataType: 'json'
                , crossDomain: true
                , contentType: 'application/json'
                , success: (data, textStatus, jqXHR) => {
                    //if (common.EnableLogGlobal) {
                    console.log('Doctor Save Success');
                    console.log('Doctor Save data', data);
                    console.log('Doctor Save textStatus', textStatus);
                    //}
            
                    Snarl.addNotification({ title: 'Registro inserido com sucesso!' });
                }
                , error: (err) => {
                    console.log('Save Error! -> method (' + method + ') | url (' + url + ') | error ---->', err);
                }
            });
        }

        public Delete = () => {
            if (common.EnableLogGlobal) {
                console.log('Doctor Delete');
            }

            confirmModal.Show({
                Title: 'Confirmação'
                , Message: 'Deseja realmente excluir esse registro?'
                , ConfirmCallback: () => {
                    $.ajax({
                        url: apiConfigs._baseUrlPersonApi + 'Doctor/' + this.Id()
                        , method: 'DELETE'
                        , dataType: 'json'
                        , crossDomain: true
                        , contentType: 'application/json'
                        , success: (data, textStatus, jqXHR) => {
                            if (common.EnableLogGlobal) {
                                console.log('Doctor Delete Success');
                                console.log('data', data);
                                console.log('textStatus', textStatus);
                            }

                            Snarl.addNotification({ title: 'Registro excluído com sucesso!' });
                        }
                        , error: (err) => {
                            if (common.EnableLogGlobal) {
                                console.log('Doctor Delete Error!', err);
                            }
                        }
                    });
                }
            });
        }
    }
}