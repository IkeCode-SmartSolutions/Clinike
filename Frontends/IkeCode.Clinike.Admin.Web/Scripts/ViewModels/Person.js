"use strict";
var Person = (function () {
    function Person() {
        this.Id = 0;
    }
    Person.prototype.init = function () {
        phone.LoadDataGrid();
        documents.LoadDataGrid();
        address.LoadDataGrid();
    };
    return Person;
})();
var person = new Person();
