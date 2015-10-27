function Person() {
    var self = this;
    self.Id = 0;

    //self.BRPhoneMask = function (val) {
    //        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    //    },
    //    spOptions = {
    //        onKeyPress: function (val, e, field, options) {
    //            field.mask(BRPhoneMask.apply({}, arguments), options);
    //        }
    //    };
}

var person = new Person();

ko.applyBindings(person, document.getElementById('_personForm'));

$(function () {
    //$('#phonesContainer').jtable({
    //    title: 'Telefones'
    //    , actions: {
    //        listAction: function (postData, jtParams) {
    //            return $.Deferred(function ($dfd) {
    //                $.ajax({
    //                    url: '/Person/GetPhones?personId=' + person.Id + '&jtStartIndex=' + jtParams.jtStartIndex + '&jtPageSize=' + jtParams.jtPageSize + '&jtSorting=' + jtParams.jtSorting,
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
    //        , createAction: '/Person/PostPhone'
    //        , updateAction: '/Person/PostPhone'
    //        , deleteAction: '/Person/DeletePhone'
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
    //        , Number: {
    //            title: 'Número',
    //            display: function (data) {
    //                return '<span name="spanNumber">' + data.record.Number + '</span>';
    //            }
    //        }
    //        , PhoneType: {
    //            title: 'Tipo',
    //            options: '/helpers/GetJsonFromEnum?enumName=PhoneType&enumNamespace=Enums&assemblyName=IkeCode.Clinike.Data'
    //        }
    //    }
    //    , recordsLoaded: function (event, data) {
    //        //$('[name="spanNumber"]').mask('(00) 00000-0000');
    //    }
    //    , formCreated: function (event, data) {
    //        //data.form.find('[name="Number"]').attr('placeholder', '(__) _____-____').mask(person.BRPhoneMask, spOptions);
    //    }
    //    , formClosed: function (event, data) {
    //        //$('[name="Number"]').unmask();
    //    }
    //});
    //$('#phonesContainer').jtable('load');

    $('#phonesContainer').datagrid({
        url: '/Person/GetPhones?personId=' + person.Id
        , toolbar: '#phoneToolbar'
        , columns: [[
            { field: 'Id', title: 'Id', hidden: true }
            , { field: 'PersonId', title: 'PersonId', hidden: true }
            , { field: 'DateIns', title: 'DateIns', hidden: true }
            , { field: 'LastUpdate', title: 'LastUpdate', hidden: true }
            , { field: 'Number', title: 'Numero', width: 200 }
            , { field: 'PhoneType', title: 'Tipo', width: 200 }
        ]]
        , onLoadSuccess: function (items) {
            var parent = $(this).parents('.box-content');
            var collapsed = $(parent).data('collapsed');
            if (collapsed !== undefined && collapsed == true) {
                $(parent).css('display', 'none');
            }
        }
    });

    $('#documentsContainer').jtable({
        title: 'Documentos'
    , actions: {
        listAction: function (postData, jtParams) {
            return $.Deferred(function ($dfd) {
                $.ajax({
                    url: '/Person/GetDocuments?personId=' + person.Id + '&jtStartIndex=' + jtParams.jtStartIndex + '&jtPageSize=' + jtParams.jtPageSize + '&jtSorting=' + jtParams.jtSorting,
                    type: 'GET',
                    dataType: 'json',
                    data: postData,
                    success: function (data) {
                        $dfd.resolve($.parseJSON(data));
                    },
                    error: function () {
                        $dfd.reject();
                    }
                });
            });
        }
        , createAction: '/Person/PostDocument'
        , updateAction: '/Person/PostDocument'
        , deleteAction: '/Person/DeleteDocument'
    }
    , fields: {
        Id: {
            key: true,
            list: false,
            type: 'hidden'
        }
        , PersonId: {
            list: false,
            type: 'hidden',
            defaultValue: person.Id
        }
        , DateIns: {
            list: false,
            type: 'hidden'
        }
        , LastUpdate: {
            list: false,
            type: 'hidden'
        }
        , Value: {
            title: 'Valor'
        }
        , DocumentType: {
            title: 'Tipo'
            , display: function (data) {
                return data.record.DocumentType.Name;
            }
            , options: '/Person/GetDocumentTypes'
        }
    }
    });
    $('#documentsContainer').jtable('load');

    $('#addessesContainer').jtable({
        title: 'Endereços'
        , actions: {
            listAction: function (postData, jtParams) {
                return $.Deferred(function ($dfd) {
                    $.ajax({
                        url: '/Person/GetAddresses?personId=' + person.Id + '&jtStartIndex=' + jtParams.jtStartIndex + '&jtPageSize=' + jtParams.jtPageSize + '&jtSorting=' + jtParams.jtSorting,
                        type: 'GET',
                        dataType: 'json',
                        data: postData,
                        success: function (data) {
                            $dfd.resolve($.parseJSON(data));
                        },
                        error: function () {
                            $dfd.reject();
                        }
                    });
                });
            }
            , createAction: '/Person/PostAddress'
            , updateAction: '/Person/PostAddress'
            , deleteAction: '/Person/DeleteAddress'
        }
        , fields: {
            Id: {
                key: true,
                list: false,
                type: 'hidden'
            }
            , PersonId: {
                list: false,
                type: 'hidden',
                defaultValue: person.Id
            }
            , DateIns: {
                list: false,
                type: 'hidden'
            }
            , LastUpdate: {
                list: false,
                type: 'hidden'
            }
            , Street: {
                title: 'Rua',
            }
            , Number: {
                title: 'Número',
            }
            , Complement: {
                title: 'Complemento',
            }
            , Neighborhood: {
                title: 'Bairro',
            }
            , ZipCode: {
                title: 'CEP',
                display: function (data) {
                    return '<span name="spanZipCode">' + data.record.ZipCode + '</span>';
                }
            }
            , City: {
                title: 'Cidade'
            }
            , State: {
                title: 'UF'
            }
            , AddressType: {
                title: 'Tipo',
                options: '/helpers/GetJsonFromEnum?enumName=AddressType&enumNamespace=Enums&assemblyName=IkeCode.Clinike.Data'
            }
        }
        , recordsLoaded: function (event, data) {
            //$('[name="spanZipCode"]').mask('00000-000');
        }
        , formCreated: function (event, data) {
            //data.form.find('[name="ZipCode"]').attr('placeholder', '_____-___').mask('00000-000');
        }
        , formClosed: function (event, data) {
            //$('[name="Number"]').unmask();
            //$('[name="ZipCode"]').unmask();
        }
    });
    $('#addessesContainer').jtable('load');
});