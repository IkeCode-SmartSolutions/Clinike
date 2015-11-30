///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.mask.d.ts" />
///<reference path="../typings/bootstrap/bootstrap.d.ts" />
///<reference path="../typings/knockout/knockout.d.ts" />
///<reference path="../typings/knockout.mapping/knockout.mapping.d.ts" />
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
    Person.prototype.Init = function () {
        var phoneGridViewModel = new PhoneModule.GridViewModel(this.Id);
        phoneGridViewModel.LoadDataGrid();
        //var documentGridViewModel = new DocumentModule.GridViewModel(this.Id);
        //documentGridViewModel.LoadDataGrid();
        //var addressGridViewModel = new AddressModule.GridViewModel(this.Id);
        //addressGridViewModel.LoadDataGrid();
    };
    return Person;
})(PersonPoco);
