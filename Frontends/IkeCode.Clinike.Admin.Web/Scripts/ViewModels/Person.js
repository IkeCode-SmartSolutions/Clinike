var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Person = (function (_super) {
    __extends(Person, _super);
    function Person() {
        _super.call(this);
    }
    Person.prototype.init = function () {
        phone.LoadDataGrid();
        documents.LoadDataGrid();
        var addressGridViewModel = new AddressModule.GridViewModel();
        addressGridViewModel.LoadDataGrid();
    };
    return Person;
})(PersonPoco);
var person = new Person();
