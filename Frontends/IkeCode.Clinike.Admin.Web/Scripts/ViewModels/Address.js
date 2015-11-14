"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AddressViewModel = (function () {
    function AddressViewModel(initialData) {
        if (common.EnableLogGlobal) {
            console.log('AddressViewModel constructor');
        }
        ko.mapping.fromJS(initialData, {}, this);
        if (common.EnableLogGlobal) {
            console.log('AddressViewModel initialData', initialData);
        }
    }
    AddressViewModel.prototype.Save = function () {
        var data = ko.mapping.toJSON(this);
        if (common.EnableLogGlobal) {
            console.log('ko.mapping.toJSON(this)', data);
        }
        $.ajax({
            url: '/Address/Post',
            data: data,
            type: 'POST',
            contentType: 'application/json',
            success: function (data, textStatus, jqXHR) {
                if (common.EnableLogGlobal) {
                    console.log('textStatus', textStatus);
                    console.log('data', data);
                }
            },
            error: function () {
                if (common.EnableLogGlobal) {
                    console.log('error');
                }
            }
        });
    };
    return AddressViewModel;
})();
var Address = (function (_super) {
    __extends(Address, _super);
    function Address() {
        _super.apply(this, arguments);
        this._toolBarSelector = '#addressesToolbar';
        this._gridSelector = '#addressesGrid';
    }
    Address.prototype.LoadDataGrid = function (selector) {
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
                    { field: 'Street', title: 'Endereço', width: 200 },
                    { field: 'Number', title: 'Nº', width: 60 },
                    { field: 'Complement', title: 'Complemento', width: 110 },
                    {
                        field: 'ZipCode',
                        title: 'CEP',
                        width: 100,
                        formatter: function (value, row, index) {
                            return '<span name="spanZipCode">' + value + '</span>';
                        }
                    },
                    {
                        field: 'AddressType',
                        title: 'Tipo',
                        width: 150
                    },
                    { field: 'City', title: 'Cidade', width: 80 },
                    { field: 'State', title: 'UF', width: 40 }
                ]],
            onClickRow: function (index, row) {
                address.OnClickRow(index, row);
            },
            onDblClickRow: function (index, row) {
                address.OnClickRow(index, row);
            },
            loader: function (param, success, error) {
                dataGridHelper.Loader('/Address/GetList', { personId: person.Id }, success, error);
            },
            onLoadSuccess: function (items) {
                if (common.EnableLogGlobal) {
                    console.log('address.LoadDataGrid onLoadSuccess');
                }
                dataGridHelper.CollapseBoxAfterLoad(this);
                $('[name="spanZipCode"]').mask('00000-000');
                $(address._toolBarSelector).find('button[data-buttontype="add"], button[data-buttontype="edit"]')
                    .bind('click', function () { $('#addressEditorModal').modal('show'); });
                $(address._toolBarSelector).find('button[data-buttontype="delete"]').bind('click', function () { phone.Delete(); });
            }
        });
    };
    Address.prototype.OnClickRow = function (index, row) {
        this.SelectedIndex = index;
        var model = new AddressViewModel(row);
        dataGridHelper.OnClickRow(index, row, this._toolBarSelector, model, '#addressEditorModal');
    };
    return Address;
})(BaseDataGridModel);
var address = new Address();
