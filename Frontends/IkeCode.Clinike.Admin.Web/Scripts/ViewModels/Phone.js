function Phone() {
    var self = this;
    self.LoadDataGrid = function (selector) {
        $(selector).datagrid({
            idField: 'Id'
            , toolbar: '#phonesToolbar'
            , rownumbers: true
            , pagination: true
            , singleSelect: true
            , striped: true
            , loadMsg: common.LoadMessage
            , columns: [[
                { field: 'Id', title: 'Id', hidden: true }
                , { field: 'PersonId', title: 'PersonId', hidden: true }
                , { field: 'DateIns', title: 'DateIns', hidden: true }
                , { field: 'LastUpdate', title: 'LastUpdate', hidden: true }
                , {
                    field: 'Number'
                    , title: 'Número'
                    , width: 200
                    , formatter: function (value, row, index) {
                        return '<span name="spanNumber">' + value + '</span>';
                    }
                }
                , { field: 'PhoneType', title: 'Tipo', width: 200 }
            ]]
            , onLoadSuccess: function (items) {
                common.CollapseBoxAfterDatagridLoad(this);
                $('[name="spanNumber"]').mask('(00) 00000-0000');
            }
            , loader: function (param, success, error) {
                common.EasyUIDataGridLoader('/Person/GetPhones', { personId: person.Id }, success, error);
            }
        });
    }
}

var phone = new Phone();