///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/jquery.plugins/jquery.easyui.d.ts" />
///<reference path="typings/jquery.plugins/jquery.mask.d.ts" />
///<reference path="typings/knockout/knockout.d.ts" />
///<reference path="typings/knockout.mapping/knockout.mapping.d.ts" />
"use strict";
var DataGridHelper = (function () {
    function DataGridHelper() {
        this.LoadMessage = 'Carregando as informações, por favor aguarde...';
    }
    DataGridHelper.prototype.CollapseBoxAfterLoad = function (container) {
        var parent = $(container).parents('.box-content');
        var collapsed = $(parent).data('collapsed');
        if (collapsed !== undefined && collapsed == true) {
            $(parent).css('display', 'none');
        }
    };
    DataGridHelper.prototype.Loader = function (url, params, success, error, requestType, enableLog) {
        if (requestType === void 0) { requestType = 'GET'; }
        if (enableLog === void 0) { enableLog = false; }
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
                    $.messager.alert('Ooops...', parsedData.message, 'warning');
                }
                else {
                    error();
                    $.messager.alert('Error!', 'Ocorreu um erro do lado do servidor, se o erro persistir favor contatar o administrador do sistema.', 'error');
                }
            }
        });
    };
    ;
    DataGridHelper.prototype.OnClickRow = function (index, row, toolbarSelector, model, bindingTarget, enableLog) {
        if (enableLog === void 0) { enableLog = false; }
        $(toolbarSelector).find('button[data-buttontype="edit"], button[data-buttontype="delete"]').removeAttr('disabled');
        if (common.EnableLogGlobal || enableLog) {
            console.log('index', index);
            console.log('row', row);
            console.log('bindingTarget', bindingTarget);
        }
        //if (bindingTarget.length > 0) {
        //    var target = $(bindingTarget).get(0);
        //    ko.cleanNode(target);
        //    ko.applyBindings(model, target);
        //} else {
        //    ko.applyBindings(model);
        //}
    };
    ;
    return DataGridHelper;
})();
var dataGridHelper = new DataGridHelper();
