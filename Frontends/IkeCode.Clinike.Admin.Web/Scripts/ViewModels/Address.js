"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AddressViewModel = (function (_super) {
    __extends(AddressViewModel, _super);
    function AddressViewModel() {
        _super.apply(this, arguments);
        this.AddressTypes = ko.observableArray();
    }
    AddressViewModel.prototype.SetData = function (initialData) {
        if (common.EnableLogGlobal) {
            console.log('AddressViewModel -> initialData', initialData);
        }
        ko.mapping.fromJS(initialData, {}, this);
        var target = $(address._modalSelector).find('[data-type="kobind"]').get(0);
        ko.cleanNode(target);
        ko.applyBindings(this, target);
        this.AddressTypes(enumCache.Get("AddressType"));
    };
    AddressViewModel.prototype.Save = function () {
        var data = this.toJSON();
        //if (common.EnableLogGlobal) {
        console.log('ko.mapping.toJSON(this)', data);
        //}
        //$.ajax({
        //    url: '/Address/Post'
        //    , data: data
        //    , type: 'POST'
        //    , contentType: 'application/json'
        //    , success: function (data, textStatus, jqXHR) {
        //        if (common.EnableLogGlobal) {
        //            console.log('textStatus', textStatus);
        //            console.log('data', data);
        //        }
        //    }
        //    , error: function () {
        //        if (common.EnableLogGlobal) {
        //            console.log('error');
        //        }
        //    }
        //});
    };
    return AddressViewModel;
})(AddressPoco);
var Address = (function (_super) {
    __extends(Address, _super);
    function Address() {
        _super.call(this);
        this._toolBarSelector = '#addressesToolbar';
        this._gridSelector = '#addressesGrid';
        this._modalSelector = '#addressEditorModal';
        this.addressViewModel = new AddressViewModel();
        common.GetJsonEnum('AddressType');
        $(this._toolBarSelector).find('button[data-buttontype="add"]').bind('click', function () {
            address.addressViewModel.SetData(new AddressViewModel());
            $(address._modalSelector).modal('show');
        });
        $(this._toolBarSelector).find('button[data-buttontype="edit"]').bind('click', function () {
            address.addressViewModel.SetData(address.SelectedRow);
            $(address._modalSelector).modal('show');
        });
        $(this._toolBarSelector).find('button[data-buttontype="delete"]').bind('click', function () {
            //address.Delete();
        });
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
                    { field: 'AddressTypeId', hidden: true },
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
                $(address._modalSelector).modal('show');
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
            }
        });
    };
    Address.prototype.OnClickRow = function (index, row) {
        this.SelectedIndex = index;
        this.SelectedRow = row;
        this.addressViewModel.SetData(row);
        $(this._toolBarSelector).find('button[data-buttontype="edit"], button[data-buttontype="delete"]').removeAttr('disabled');
    };
    return Address;
})(BaseDataGridModel);
var address = new Address();
