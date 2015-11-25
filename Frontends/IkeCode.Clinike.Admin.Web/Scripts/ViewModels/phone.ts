///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.easyui.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.mask.d.ts" />
///<reference path="../typings/knockout/knockout.d.ts" />
///<reference path="../typings/knockout.mapping/knockout.mapping.d.ts" />

"use strict";
class PhoneViewModel extends PhonePoco implements IKoViewModel {

    PhoneTypes = ko.observableArray();

    public SetData(initialData: any): void {
        if (common.EnableLogGlobal) {
            console.log('PhoneViewModel -> initialData', initialData);
        }

        ko.validation.init({ insertMessages: false });
        ko.mapping.fromJS(initialData, {}, this);

        var target = $(phone._modalSelector).find('[data-type="kobind"]').get(0);
        ko.cleanNode(target);
        ko.applyBindings(this, target);

        this.PhoneTypes(enumCache.Get("PhoneType"));
    }

    public Save(): void {
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
    }
}

class Phone extends BaseDataGridModel implements IDataGridModel {
    _toolBarSelector: string = '#phonesToolbar';
    _gridSelector: string = '#phonesGrid';
    _modalSelector: string = '#phoneEditorModal';
    phoneViewModel: PhoneViewModel;

    constructor() {
        super();

        this.phoneViewModel = new PhoneViewModel();

        common.GetJsonEnum('PhoneType');

        $(this._toolBarSelector).find('button[data-buttontype="add"]').bind('click',
            () => {
                phone.phoneViewModel.SetData(new PhoneViewModel());
                $(phone._modalSelector).modal('show');
            });

        $(this._toolBarSelector).find('button[data-buttontype="edit"]').bind('click',
            () => {
                phone.phoneViewModel.SetData(this.SelectedRow);
                $(phone._modalSelector).modal('show');
            });

        $(this._toolBarSelector).find('button[data-buttontype="delete"]').bind('click',
            () => {
                //phone.Delete();
            });
    }

    public LoadDataGrid(selector: string = this._gridSelector) {

        if (common.EnableLogGlobal) {
            console.log('phone.LoadDataGrid');
        }
        
        $(selector).datagrid({
            idField: 'Id'
            , toolbar: this._toolBarSelector
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
            , onClickRow: function (index, row) {
                phone.OnClickRow(index, row);
            }
            , onDblClickRow: function (index, row) {
                phone.OnClickRow(index, row);
            }
            , loader: function (param, success, error) {
                dataGridHelper.Loader('/Phone/GetList', { personId: person.Id }, success, error);
            }
            , onLoadSuccess: function (items) {

                if (common.EnableLogGlobal) {
                    console.log('phone.LoadDataGrid onLoadSuccess');
                }

                dataGridHelper.CollapseBoxAfterLoad(this);
                $('[name="spanNumber"]').mask('(00) 00000-0000');

                $(phone._toolBarSelector).find('button[data-buttontype="add"], button[data-buttontype="edit"]')
                    .bind('click', () => { $('#phoneEditorModal').modal('show'); });
                $(phone._toolBarSelector).find('button[data-buttontype="delete"]').bind('click', () => { phone.Delete(); });
            }
        });
    }

    private OnClickRow(index, row) {
        this.SelectedIndex = index;
        this.SelectedRow = row;
        this.phoneViewModel.SetData(row);

        $(this._toolBarSelector).find('button[data-buttontype="edit"], button[data-buttontype="delete"]').removeAttr('disabled');
    }

    public Edit() {
        var selectedRow = $(this._gridSelector).datagrid('getSelected');

        if (common.EnableLogGlobal) {
            console.log('phone.Edit selectedRow', selectedRow);
            console.log('phone.Edit selectedRow.Id', selectedRow.Id);
        }

        if (this.SelectedIndex > -1) {
            $(this._gridSelector).datagrid('updateRow', { index: this.SelectedIndex, row: selectedRow });
        }
    }

    public Delete() {
        var selectedRow = $(this._gridSelector).datagrid('getSelected');

        if (common.EnableLogGlobal) {
            console.log('phone.Delete selectedRow', selectedRow);
            console.log('phone.Delete selectedRow.Id', selectedRow.Id);
        }

        if (this.SelectedIndex > -1) {
            $(this._gridSelector).datagrid('deleteRow', this.SelectedIndex);
        }
    }
}

var phone = new Phone();