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
                var parsedData = $.parseJSON(data);

                if (common.EnableLogGlobal || enableLog) {
                    console.log('requestType', requestType);
                    console.log('data', data);
                    console.log('parsedData', parsedData);
                    console.log('parsedData !== undefined', parsedData !== undefined);
                    console.log('parsedData != null', parsedData != null);
                    console.log('parsedData.success', parsedData.success);
                    console.log('parsedData.message', parsedData.message);
                }

                var parsedDataIsValid = common.GetValueOrDefault(parsedData, false);

                if (parsedDataIsValid && parsedData.success) {
                    success(parsedData);
                }
                else if (parsedDataIsValid && !parsedData.success) {
                    error();
                    (<any>$).messager.alert('Ooops...', parsedData.message, 'warning');
                } else {
                    error();
                    (<any>$).messager.alert('Error!', 'Ocorreu um erro do lado do servidor, se o erro persistir favor contatar o administrador do sistema.', 'error');
                }
            }
        });
    };

    public OnClickRow(index, row, selector, enableLog: boolean = false) {

        if (common.EnableLogGlobal || enableLog) {
            console.log('index', index);
            console.log('row', row);
        }

        $(selector).find('button[data-buttontype="edit"], button[data-buttontype="delete"]').removeAttr('disabled');
    };
}

var dataGridHelper = new DataGridHelper();