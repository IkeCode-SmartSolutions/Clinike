function Person() {
    var self = this;
    self.Id = 0;
}

var person = new Person();

$(function () {
    phone.LoadDataGrid('#phonesGrid');

    documents.LoadDataGrid('#documentsGrid');

    address.LoadDataGrid('#addressesGrid');
});