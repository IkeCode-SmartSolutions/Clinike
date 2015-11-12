function PhoneViewModel(initialData) {
    var self = this;
    ko.mapping.fromJS(initialData, {}, self);
    //console.log('PhoneViewModel constructor', self);
}

function Phone() {
    var self = this;

    self.SelectedIndex = -1;

    self.LoadDataGrid = function (selector) {
        $(selector).datagrid({
            idField: 'Id'
            , toolbar: '#phonesToolbar'
            , rownumbers: true
            , pagination: true
            , singleSelect: true
            , striped: true
            , loadMsg: dataGridHelper.LoadMessage
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
                dataGridHelper.CollapseBoxAfterLoad(this);
                $('[name="spanNumber"]').mask('(00) 00000-0000');
            }
            , onClickRow: function (index, row) {
                self.OnClickRow(index, row);
            }
            , onDblClickRow: function (index, row) {
                self.OnClickRow(index, row);
            }
            , loader: function (param, success, error) {
                dataGridHelper.Loader('/Phone/GetPhones', { personId: person.Id }, success, error);
            }
        });
    };

    self.OnClickRow = function (index, row) {
        self.SelectedIndex = index;
        dataGridHelper.OnClickRow(index, row, '#phonesToolbar');

        var model = new PhoneViewModel(row);
        ko.applyBindings(model, $('#_phoneForm').get(0));
    };

    self.Edit = function () {
        var selectedRow = $('#phonesGrid').datagrid('getSelected');
        console.log('phone.Edit selectedRow', selectedRow);
        console.log('phone.Edit selectedRow.Id', selectedRow.Id);

        $('#_phoneForm').dialog({
            modal: true
            , title: 'Editar -> Telefone'
            , width: 300
            , height: 500
        }).show();

        //if (self.SelectedIndex > -1) {
        //    $('#phonesGrid').datagrid('updateRow', { index: self.SelectedIndex, row: selectedRow });
        //}
    };

    self.Delete = function () {
        var selectedRow = $('#phonesGrid').datagrid('getSelected');
        console.log('phone.Delete selectedRow', selectedRow);
        console.log('phone.Delete selectedRow.Id', selectedRow.Id);

        if (self.SelectedIndex > -1) {
            $('#phonesGrid').datagrid('deleteRow', self.SelectedIndex);
        }
    };
}
var phone = new Phone();