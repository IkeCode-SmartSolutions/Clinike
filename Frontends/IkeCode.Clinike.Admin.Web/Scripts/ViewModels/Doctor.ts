///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.mask.d.ts" />
///<reference path="../typings/bootstrap/bootstrap.d.ts" />
///<reference path="../typings/knockout/knockout.d.ts" />
///<reference path="../typings/knockout.mapping/knockout.mapping.d.ts" />

class Doctor {
    Id: number = 0;
    private DeleteButtonSelector: string = "";

    constructor(deleteButtonSelector: string = "") {
        this.DeleteButtonSelector = deleteButtonSelector;

        if (this.DeleteButtonSelector != null && this.DeleteButtonSelector.length > 0) {
            this.BindClickDeleteButton();
        }
    }

    public BindClickDeleteButton = () => {
        $(this.DeleteButtonSelector).on('click', (e) => {
            e.preventDefault();
            this.Delete();
        });
    }

    public Delete() {
        //if (common.EnableLogGlobal) {
            console.log('Doctor Delete');
        //}

        confirmModal.Show({
            Title: 'Confirmação'
            , Message: 'Deseja realmente excluir esse registro?'
            , ConfirmCallback: () => {
                $.ajax({
                    url: apiConfigs._baseUrlPersonApi + 'Doctor/' + this.Id
                    , method: 'DELETE'
                    , dataType: 'json'
                    , crossDomain: true
                    , contentType: 'application/json'
                    , success: (data, textStatus, jqXHR) => {
                        //if (common.EnableLogGlobal) {
                            console.log('Doctor Delete Success');
                            console.log('data', data);
                            console.log('textStatus', textStatus);
                        //}

                        common.AddNotification({ title: 'Registro excluído com sucesso!' });
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