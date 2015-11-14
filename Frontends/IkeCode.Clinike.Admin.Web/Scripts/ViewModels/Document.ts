"use strict";
class Documents extends BaseDataGridModel implements IDataGridModel {
    _toolBarSelector: string = '#documentsToolbar';
    _gridSelector: string = '#documentsGrid';

    public LoadDataGrid(selector: string = this._gridSelector) {
        $(selector).datagrid({
            idField: 'Id'
            , toolbar: this._toolBarSelector
            , rownumbers: true
            , pagination: true
            , singleSelect: true
            , striped: true
            , loadMsg: dataGridHelper.LoadMessage
            , columns: [[
                { field: 'Id', hidden: true }
                , { field: 'PersonId', hidden: true }
                , { field: 'DateIns', hidden: true }
                , { field: 'LastUpdate', hidden: true }
                , { field: 'DocumentTypeId', hidden: true }
                , { field: 'Value', title: 'Valor', width: 200 }
                , {
                    field: 'DocumentType'
                    , title: 'Tipo'
                    , width: 200
                    , formatter: function (value, row, index) {
                        return value.Name;
                    }
                }
            ]]
            , onLoadSuccess: function (items) {
                dataGridHelper.CollapseBoxAfterLoad(this);
            }
            , loader: function (param, success, error) {
                dataGridHelper.Loader('/Document/GetList', { personId: person.Id }, success, error);
            }
        });
    }
}

var documents = new Documents();