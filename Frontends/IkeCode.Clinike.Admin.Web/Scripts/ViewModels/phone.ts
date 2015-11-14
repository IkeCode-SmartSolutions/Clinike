"use strict";
///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.easyui.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.mask.d.ts" />
///<reference path="../typings/knockout/knockout.d.ts" />
///<reference path="../typings/knockout.mapping/knockout.mapping.d.ts" />

//function PhoneViewModel(initialData) {
//    var self = this;

//    self.Save = function () {
//        var data = ko.mapping.toJSON(self);
//        console.log('ko.mapping.toJSON(self)', data);

//        $.ajax({
//            url: '/Phone/PostPhone'
//            , data: data
//            , type: 'POST'
//            , contentType: 'application/json'
//            , success: function (data, textStatus, jqXHR) {
//                console.log('textStatus', textStatus);
//                console.log('data', data);
//            }
//            , error: function () {
//                console.log('error');
//            }
//        });
//    }

//    console.log('PhoneViewModel constructor');
//    ko.mapping.fromJS(initialData, {}, self);
//    console.log('PhoneViewModel initialData', initialData);
//}

class phoneViewModel {
    constructor(initialData: any) {
        console.log('PhoneViewModel constructor');
        ko.mapping.fromJS(initialData, {}, this);
        console.log('PhoneViewModel initialData', initialData);
    }

    public Save() {
        var data = ko.mapping.toJSON(this);
        console.log('ko.mapping.toJSON(this)', data);

        $.ajax({
            url: '/Phone/PostPhone'
            , data: data
            , type: 'POST'
            , contentType: 'application/json'
            , success: function (data, textStatus, jqXHR) {
                console.log('textStatus', textStatus);
                console.log('data', data);
            }
            , error: function () {
                console.log('error');
            }
        });
    }
}

//function Phone() {
//    var self = this;

//    self.SelectedIndex = -1;

//    self.LoadDataGrid = function (selector) {
//        $(selector).datagrid({
//            idField: 'Id'
//            , toolbar: '#phonesToolbar'
//            , rownumbers: true
//            , pagination: true
//            , singleSelect: true
//            , striped: true
//            , loadMsg: dataGridHelper.LoadMessage
//            , columns: [[
//                { field: 'Id', title: 'Id', hidden: true }
//                , { field: 'PersonId', title: 'PersonId', hidden: true }
//                , { field: 'DateIns', title: 'DateIns', hidden: true }
//                , { field: 'LastUpdate', title: 'LastUpdate', hidden: true }
//                , {
//                    field: 'Number'
//                    , title: 'Número'
//                    , width: 200
//                    , formatter: function (value, row, index) {
//                        return '<span name="spanNumber">' + value + '</span>';
//                    }
//                }
//                , { field: 'PhoneType', title: 'Tipo', width: 200 }
//            ]]
//            , onLoadSuccess: function (items) {
//                dataGridHelper.CollapseBoxAfterLoad(this);
//                $('[name="spanNumber"]').mask('(00) 00000-0000');
//            }
//            , onClickRow: function (index, row) {
//                self.OnClickRow(index, row);
//            }
//            , onDblClickRow: function (index, row) {
//                self.OnClickRow(index, row);
//            }
//            , loader: function (param, success, error) {
//                dataGridHelper.Loader('/Phone/GetPhones', { personId: person.Id }, success, error);
//            }
//        });
//    }

//    self.OnClickRow = function (index, row) {
//        self.SelectedIndex = index;
//        dataGridHelper.OnClickRow(index, row, '#phonesToolbar');

//        var model = new PhoneViewModel(row);
//        ko.applyBindings(model, $('#phoneEditorModal').get(0));
//    }

//    self.Edit = function () {
//        var selectedRow = $('#phonesGrid').datagrid('getSelected');
//        console.log('phone.Edit selectedRow', selectedRow);
//        console.log('phone.Edit selectedRow.Id', selectedRow.Id);

//        if (self.SelectedIndex > -1) {
//            $('#phoneEditorModal').modal('show');
//            //$('#phonesGrid').datagrid('updateRow', { index: self.SelectedIndex, row: selectedRow });
//        }
//    }

//    self.Save = function () {
//        var selectedRow = $('#phonesGrid').datagrid('getSelected');
//        console.log('phone.Edit selectedRow', selectedRow);
//        console.log('phone.Edit selectedRow.Id', selectedRow.Id);

//        if (self.SelectedIndex > -1) {
//            $('#phonesGrid').datagrid('updateRow', { index: self.SelectedIndex, row: selectedRow });
//        }
//    }

//    self.Delete = function () {
//        var selectedRow = $('#phonesGrid').datagrid('getSelected');
//        console.log('phone.Delete selectedRow', selectedRow);
//        console.log('phone.Delete selectedRow.Id', selectedRow.Id);

//        if (self.SelectedIndex > -1) {
//            $('#phonesGrid').datagrid('deleteRow', self.SelectedIndex);
//        }
//    }
//}
//var phone = new Phone();

class phone  {
    SelectedIndex = -1;

    public LoadDataGrid(selector) {
        $(selector).datagrid({
            idField: 'Id'
            , toolbar: '#phonesToolbar'
            , rownumbers: true
            , pagination: true
            , singleSelect: true
            , striped: true
            , loadMsg: dataGridHelper.prototype.LoadMessage
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
                dataGridHelper.prototype.CollapseBoxAfterLoad(this);
                $('[name="spanNumber"]').mask('(00) 00000-0000');
            }
            , onClickRow: function (index, row) {
                this.OnClickRow(index, row);
            }
            , onDblClickRow: function (index, row) {
                this.OnClickRow(index, row);
            }
            , loader: function (param, success, error) {
                //dataGridHelper.prototype.Loader('/Phone/GetPhones', { personId: person.prototype.Id }, success, error);
            }
        });
    }

    private OnClickRow(index, row) {
        this.SelectedIndex = index;
        dataGridHelper.prototype.OnClickRow(index, row, '#phonesToolbar');

        var model = new phoneViewModel(row);
        ko.applyBindings(model, $('#phoneEditorModal').get(0));
    }

    public Edit() {
        var selectedRow = $('#phonesGrid').datagrid('getSelected');
        console.log('phone.Edit selectedRow', selectedRow);
        console.log('phone.Edit selectedRow.Id', selectedRow.Id);

        if (this.SelectedIndex > -1) {
            $('#phoneEditorModal').modal('show');
            $('#phonesGrid').datagrid('updateRow', { index: this.SelectedIndex, row: selectedRow });
        }
    }

    public Save() {
        var selectedRow = $('#phonesGrid').datagrid('getSelected');
        console.log('phone.Edit selectedRow', selectedRow);
        console.log('phone.Edit selectedRow.Id', selectedRow.Id);

        if (this.SelectedIndex > -1) {
            $('#phonesGrid').datagrid('updateRow', { index: this.SelectedIndex, row: selectedRow });
        }
    }

    public Delete() {
        var selectedRow = $('#phonesGrid').datagrid('getSelected');
        console.log('phone.Delete selectedRow', selectedRow);
        console.log('phone.Delete selectedRow.Id', selectedRow.Id);

        if (this.SelectedIndex > -1) {
            $('#phonesGrid').datagrid('deleteRow', this.SelectedIndex);
        }
    }
}