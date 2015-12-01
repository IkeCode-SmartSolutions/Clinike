///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.bootgrid.d.ts" />
var BaseDataGridModel = (function () {
    function BaseDataGridModel() {
        this._selectedRow = null;
        this._defaultBootgridOptions = {
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
        ko.validation.init({ decorateInputElement: true, errorClass: 'has-error', insertMessages: false });
    }
    Object.defineProperty(BaseDataGridModel.prototype, "SelectedRow", {
        get: function () {
            return this._selectedRow;
        },
        enumerable: true,
        configurable: true
    });
    BaseDataGridModel.prototype.GetBootgridOptions = function (options) {
        var result = $.extend(options, this._defaultBootgridOptions, {});
        return result;
    };
    BaseDataGridModel.prototype.GetDefaultCommands = function (column, row) {
        return "<button type=\"button\" class=\"btn btn-xs btn-info command-edit\" data-row-id=\"" + row.Id + "\"><span class=\"fa fa-pencil\"></span></button> " +
            "<button type=\"button\" class=\"btn btn-xs btn-danger command-delete\" data-row-id=\"" + row.Id + "\"><span class=\"fa fa-trash-o\"></span></button>";
    };
    BaseDataGridModel.prototype.ParseBootgridRequest = function (request) {
        //console.log('request', request);
        var parsedRequest = { offset: request.current - 1, limit: request.rowCount, personId: request.personId };
        //console.log('parsedRequest', parsedRequest);
        return parsedRequest;
    };
    BaseDataGridModel.prototype.GetCurrentRow = function (gridSelector, e, identifier, dataSelector) {
        if (identifier === void 0) { identifier = 'Id'; }
        if (dataSelector === void 0) { dataSelector = 'row-id'; }
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
    };
    return BaseDataGridModel;
})();
