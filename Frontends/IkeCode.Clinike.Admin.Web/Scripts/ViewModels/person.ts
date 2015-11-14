"use strict";
class Person {
    Id = 0;

    constructor() {        
    }

    public init() {
        phone.LoadDataGrid('#phonesGrid');

        documents.LoadDataGrid('#documentsGrid');

        address.LoadDataGrid('#addressesGrid');
    }
}

var person = new Person();