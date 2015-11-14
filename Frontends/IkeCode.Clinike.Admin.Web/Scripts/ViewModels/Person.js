"use strict";
var Person = (function () {
    function Person() {
        this.Id = 0;
    }
    Person.prototype.init = function () {
        phone.LoadDataGrid('#phonesGrid');
        documents.LoadDataGrid('#documentsGrid');
        address.LoadDataGrid('#addressesGrid');
    };
    return Person;
})();
var person = new Person();
