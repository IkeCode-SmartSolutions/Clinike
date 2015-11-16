"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Documents = (function (_super) {
    __extends(Documents, _super);
    function Documents() {
        _super.apply(this, arguments);
        this._toolBarSelector = '#documentsToolbar';
        this._gridSelector = '#documentsGrid';
        this._modalSelector = '#documentEditorModal';
    }
    Documents.prototype.LoadDataGrid = function (selector) {
        if (selector === void 0) { selector = this._gridSelector; }
        $(selector).datagrid({
            idField: 'Id',
            toolbar: this._toolBarSelector,
            rownumbers: true,
            pagination: true,
            singleSelect: true,
            striped: true,
            loadMsg: dataGridHelper.LoadMessage,
            columns: [[
                    { field: 'Id', hidden: true },
                    { field: 'PersonId', hidden: true },
                    { field: 'DateIns', hidden: true },
                    { field: 'LastUpdate', hidden: true },
                    { field: 'DocumentTypeId', hidden: true },
                    { field: 'Value', title: 'Valor', width: 200 },
                    {
                        field: 'DocumentType',
                        title: 'Tipo',
                        width: 200,
                        formatter: function (value, row, index) {
                            return value.Name;
                        }
                    }
                ]],
            onLoadSuccess: function (items) {
                dataGridHelper.CollapseBoxAfterLoad(this);
            },
            loader: function (param, success, error) {
                dataGridHelper.Loader('/Document/GetList', { personId: person.Id }, success, error);
            }
        });
    };
    return Documents;
})(BaseDataGridModel);
var documents = new Documents();
