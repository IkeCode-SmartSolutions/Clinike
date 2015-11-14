"use strict";
class Address {
    
    //$('#addessesContainer').jtable({
    //    title: 'Endereços'
    //    , actions: {
    //        listAction: function (postData, jtParams) {
    //            return $.Deferred(function ($dfd) {
    //                $.ajax({
    //                    url: '/Person/GetAddresses?personId=' + person.Id + '&jtStartIndex=' + jtParams.jtStartIndex + '&jtPageSize=' + jtParams.jtPageSize + '&jtSorting=' + jtParams.jtSorting,
    //                    type: 'GET',
    //                    dataType: 'json',
    //                    data: postData,
    //                    success: function (data) {
    //                        $dfd.resolve($.parseJSON(data));
    //                    },
    //                    error: function () {
    //                        $dfd.reject();
    //                    }
    //                });
    //            });
    //        }
    //        , createAction: '/Person/PostAddress'
    //        , updateAction: '/Person/PostAddress'
    //        , deleteAction: '/Person/DeleteAddress'
    //    }
    //    , fields: {
    //        Id: {
    //            key: true,
    //            list: false,
    //            type: 'hidden'
    //        }
    //        , PersonId: {
    //            list: false,
    //            type: 'hidden',
    //            defaultValue: person.Id
    //        }
    //        , DateIns: {
    //            list: false,
    //            type: 'hidden'
    //        }
    //        , LastUpdate: {
    //            list: false,
    //            type: 'hidden'
    //        }
    //        , Street: {
    //            title: 'Rua',
    //        }
    //        , Number: {
    //            title: 'Número',
    //        }
    //        , Complement: {
    //            title: 'Complemento',
    //        }
    //        , Neighborhood: {
    //            title: 'Bairro',
    //        }
    //        , ZipCode: {
    //            title: 'CEP',
    //            display: function (data) {
    //                return '<span name="spanZipCode">' + data.record.ZipCode + '</span>';
    //            }
    //        }
    //        , City: {
    //            title: 'Cidade'
    //        }
    //        , State: {
    //            title: 'UF'
    //        }
    //        , AddressType: {
    //            title: 'Tipo',
    //            options: '/helpers/GetJsonFromEnum?enumName=AddressType&enumNamespace=Enums&assemblyName=IkeCode.Clinike.Data'
    //        }
    //    }
    //    , recordsLoaded: function (event, data) {
    //        //$('[name="spanZipCode"]').mask('00000-000');
    //    }
    //    , formCreated: function (event, data) {
    //        //data.form.find('[name="ZipCode"]').attr('placeholder', '_____-___').mask('00000-000');
    //    }
    //    , formClosed: function (event, data) {
    //        //$('[name="Number"]').unmask();
    //        //$('[name="ZipCode"]').unmask();
    //    }
    //});

    public LoadDataGrid(selector) {
        $(selector).datagrid({
            idField: 'Id'
            , toolbar: '#addressesToolbar'
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
                , { field: 'Street', title: 'Rua', width: 200 }
                , { field: 'Number', title: 'Nº', width: 80 }
                , { field: 'Complement', title: 'Complemento', width: 120 }
                , {
                    field: 'AddressType'
                    , title: 'Tipo'
                    , width: 200
                    //, formatter: function (value, row, index) {
                    //    return value.Name;
                    //}
                }
            ]]
            , onLoadSuccess: function (items) {
                dataGridHelper.CollapseBoxAfterLoad(this);
            }
            , loader: function (param, success, error) {
                dataGridHelper.Loader('/Person/GetAddresses', { personId: person.Id }, success, error);
            }
        });
    }
}

var address = new Address();