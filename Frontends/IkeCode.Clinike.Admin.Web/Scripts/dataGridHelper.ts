///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/jquery.plugins/jquery.easyui.d.ts" />
///<reference path="typings/jquery.plugins/jquery.mask.d.ts" />
///<reference path="typings/knockout/knockout.d.ts" />
///<reference path="typings/knockout.mapping/knockout.mapping.d.ts" />

"use strict";
class DataGridHelper {
    LoadMessage: string;

    constructor() {
        this.LoadMessage = 'Carregando as informações, por favor aguarde...';
    }

    public CollapseBoxAfterLoad(container: any) {
        var parent = $(container).parents('.box-content');
        var collapsed = $(parent).data('collapsed');
        if (collapsed !== undefined && collapsed == true) {
            $(parent).css('display', 'none');
        }
    }

    public Loader(url: string, params: any, success: any, error: any, requestType: string = 'GET', enableLog: boolean = false) {

        if (common.EnableLogGlobal || enableLog) {
            console.log('dataGridHelper.prototype.Loader url', url);
            console.log('dataGridHelper.prototype.Loader params', params);
        }

        $.ajax({
            url: url,
            data: params,
            type: requestType,
            success: function (data, textStatus, jqXHR) {
                if (common.EnableLogGlobal || enableLog) {
                    console.log('requestType', requestType);
                    console.log(url + ' data', data);
                    console.log(url + ' data.success', data.success);
                    console.log(url + ' data.message', data.message);
                    console.log(url + ' data.rows', data.rows);
                    console.log(url + ' data.total', data.total);
                }

                if (data.success) {
                    success(data);
                }
                else if (!data.success) {
                    error();
                    (<any>$).messager.alert('Ooops...', data.message, 'warning');
                } else {
                    error();
                    (<any>$).messager.alert('Error!', 'Ocorreu um erro do lado do servidor, se o erro persistir favor contatar o administrador do sistema.', 'error');
                }
            }
        });
    };
}

var dataGridHelper = new DataGridHelper();