///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.bootgrid.d.ts" />

class BaseDataGridModel {
    constructor() {
        ko.validation.init({ decorateInputElement: true, errorClass: 'has-error', insertMessages: false });
    }

    private _selectedRow: any = null;
    get SelectedRow(): any {
        return this._selectedRow;
    }

    private _defaultBootgridOptions: any = {
        ajax: true,
        ajaxSettings: {
            method: "GET",
            cache: false
        },
        multiSelect: false,
        labels: {
            all: "Todos os registros",
            loading: "Aguarde carregando...",
            refresh: "Atualizar",
            search: "Procurar",
            noResults: "Sem registros",
            infos: "Exibindo {{ctx.start}} até {{ctx.end}} de {{ctx.total}} registros"
        },
        templates: {
            header: "<div id=\"{{ctx.id}}\" class=\"{{css.header}}\"><div class=\"row\"><div class=\"col-sm-12 actionBar\"><button type=\"button\" class=\"btn btn-primary btn-label-left pull-left command-add\"><span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span> Adicionar</button><p class=\"{{css.search}}\"></p><p class=\"{{css.actions}}\"></p></div></div></div>"
        },
        requestHandler: this.ParseBootgridRequest
    };

    protected GetBootgridOptions(options: any): any {
        var result = $.extend(options, this._defaultBootgridOptions, {});
        return result;
    }

    protected GetDefaultCommands(column, row) {
        return "<button type=\"button\" class=\"btn btn-xs btn-info command-edit\" data-row-id=\"" + row.Id + "\"><span class=\"fa fa-pencil\"></span></button> " +
            "<button type=\"button\" class=\"btn btn-xs btn-danger command-delete\" data-row-id=\"" + row.Id + "\"><span class=\"fa fa-trash-o\"></span></button>";
    }

    protected ParseBootgridRequest(request: any): any {
        //console.log('request', request);
        var parsedRequest = { offset: request.current - 1, limit: request.rowCount, personId: request.personId };
        //console.log('parsedRequest', parsedRequest);
        return parsedRequest;
    }

    protected GetCurrentRow(gridSelector: string, e: JQueryEventObject, identifier: string = 'Id', dataSelector: string = 'row-id'): any {
        var id = $(e.currentTarget).data(dataSelector);
        var currentRows = $(gridSelector).bootgrid("getCurrentRows");

        var row = null;
        for (var i = 0; i < currentRows.length; i++) {
            if (currentRows[i][identifier] === id) {
                row = currentRows[i];
                break;
            }
        }
        this._selectedRow = row;
        return row;
    }
}