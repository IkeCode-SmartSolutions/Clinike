///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.mask.d.ts" />
///<reference path="../typings/bootstrap/bootstrap.d.ts" />
///<reference path="../typings/knockout/knockout.d.ts" />
///<reference path="../typings/knockout.mapping/knockout.mapping.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Doctor = (function (_super) {
    __extends(Doctor, _super);
    function Doctor(deleteButtonSelector) {
        var _this = this;
        if (deleteButtonSelector === void 0) { deleteButtonSelector = ""; }
        _super.call(this);
        this.DeleteButtonSelector = "";
        this.BindClickDeleteButton = function () {
            $(_this.DeleteButtonSelector).on('click', function (e) {
                e.preventDefault();
                _this.Delete();
            });
        };
        this.DeleteButtonSelector = deleteButtonSelector;
        if (this.DeleteButtonSelector != null && this.DeleteButtonSelector.length > 0) {
            this.BindClickDeleteButton();
        }
    }
    Doctor.prototype.Delete = function () {
        var _this = this;
        if (common.EnableLogGlobal) {
            console.log('Doctor Delete');
        }
        confirmModal.Show({
            Title: 'Confirmação',
            Message: 'Deseja realmente excluir esse registro?',
            ConfirmCallback: function () {
                $.ajax({
                    url: apiConfigs._baseUrlPersonApi + 'Doctor/' + _this.Id,
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
                        common.AddNotification({ title: 'Registro excluído com sucesso!' });
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
    return Doctor;
})(DoctorPoco);
