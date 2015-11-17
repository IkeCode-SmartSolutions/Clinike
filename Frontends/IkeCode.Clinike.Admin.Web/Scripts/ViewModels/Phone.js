///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.easyui.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.mask.d.ts" />
///<reference path="../typings/knockout/knockout.d.ts" />
///<reference path="../typings/knockout.mapping/knockout.mapping.d.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PhoneViewModel = (function (_super) {
    __extends(PhoneViewModel, _super);
    function PhoneViewModel() {
        _super.apply(this, arguments);
        this.PhoneTypes = ko.observableArray();
    }
    PhoneViewModel.prototype.SetData = function (initialData) {
        if (common.EnableLogGlobal) {
            console.log('PhoneViewModel -> initialData', initialData);
        }
        ko.mapping.fromJS(initialData, {}, this);
        var target = $(address._modalSelector).find('[data-type="kobind"]').get(0);
        ko.cleanNode(target);
        ko.applyBindings(this, target);
        this.PhoneTypes(enumCache.Get("PhoneType"));
    };
    PhoneViewModel.prototype.Save = function () {
        var data = ko.mapping.toJSON(this);
        if (common.EnableLogGlobal) {
            console.log('ko.mapping.toJSON(this)', data);
        }
        //$.ajax({
        //    url: '/Phone/Post'
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
    return PhoneViewModel;
})(PhonePoco);
var Phone = (function (_super) {
    __extends(Phone, _super);
    function Phone() {
        _super.call(this);
        this._toolBarSelector = '#phonesToolbar';
        this._gridSelector = '#phonesGrid';
        this._modalSelector = '#phoneEditorModal';
        this.phoneViewModel = new PhoneViewModel();
        common.GetJsonEnum('PhoneType');
        $(this._toolBarSelector).find('button[data-buttontype="add"]').bind('click', function () {
            phone.phoneViewModel.SetData(new PhoneViewModel());
            $(phone._modalSelector).modal('show');
        });
        $(this._toolBarSelector).find('button[data-buttontype="edit"]').bind('click', function () {
            phone.phoneViewModel.SetData(address.SelectedRow);
            $(phone._modalSelector).modal('show');
        });
        $(this._toolBarSelector).find('button[data-buttontype="delete"]').bind('click', function () {
            //phone.Delete();
        });
    }
    Phone.prototype.LoadDataGrid = function (selector) {
        if (selector === void 0) { selector = this._gridSelector; }
        if (common.EnableLogGlobal) {
            console.log('phone.LoadDataGrid');
        }
        $(selector).datagrid({
            idField: 'Id',
            toolbar: this._toolBarSelector,
            rownumbers: true,
            pagination: true,
            singleSelect: true,
            striped: true,
            loadMsg: dataGridHelper.LoadMessage,
            columns: [[
                    { field: 'Id', title: 'Id', hidden: true },
                    { field: 'PersonId', title: 'PersonId', hidden: true },
                    { field: 'DateIns', title: 'DateIns', hidden: true },
                    { field: 'LastUpdate', title: 'LastUpdate', hidden: true },
                    {
                        field: 'Number',
                        title: 'Número',
                        width: 200,
                        formatter: function (value, row, index) {
                            return '<span name="spanNumber">' + value + '</span>';
                        }
                    },
                    { field: 'PhoneType', title: 'Tipo', width: 200 }
                ]],
            onClickRow: function (index, row) {
                phone.OnClickRow(index, row);
            },
            onDblClickRow: function (index, row) {
                phone.OnClickRow(index, row);
            },
            loader: function (param, success, error) {
                dataGridHelper.Loader('/Phone/GetList', { personId: person.Id }, success, error);
            },
            onLoadSuccess: function (items) {
                if (common.EnableLogGlobal) {
                    console.log('phone.LoadDataGrid onLoadSuccess');
                }
                dataGridHelper.CollapseBoxAfterLoad(this);
                $('[name="spanNumber"]').mask('(00) 00000-0000');
                $(phone._toolBarSelector).find('button[data-buttontype="add"], button[data-buttontype="edit"]')
                    .bind('click', function () { $('#phoneEditorModal').modal('show'); });
                $(phone._toolBarSelector).find('button[data-buttontype="delete"]').bind('click', function () { phone.Delete(); });
            }
        });
    };
    Phone.prototype.OnClickRow = function (index, row) {
        this.SelectedIndex = index;
        this.SelectedRow = row;
        this.phoneViewModel.SetData(row);
        $(this._toolBarSelector).find('button[data-buttontype="edit"], button[data-buttontype="delete"]').removeAttr('disabled');
    };
    Phone.prototype.Edit = function () {
        var selectedRow = $(this._gridSelector).datagrid('getSelected');
        if (common.EnableLogGlobal) {
            console.log('phone.Edit selectedRow', selectedRow);
            console.log('phone.Edit selectedRow.Id', selectedRow.Id);
        }
        if (this.SelectedIndex > -1) {
            $(this._gridSelector).datagrid('updateRow', { index: this.SelectedIndex, row: selectedRow });
        }
    };
    Phone.prototype.Delete = function () {
        var selectedRow = $(this._gridSelector).datagrid('getSelected');
        if (common.EnableLogGlobal) {
            console.log('phone.Delete selectedRow', selectedRow);
            console.log('phone.Delete selectedRow.Id', selectedRow.Id);
        }
        if (this.SelectedIndex > -1) {
            $(this._gridSelector).datagrid('deleteRow', this.SelectedIndex);
        }
    };
    return Phone;
})(BaseDataGridModel);
var phone = new Phone();
