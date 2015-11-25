class Person extends PersonPoco {
    constructor() {
        super();
    }

    public init() {
        phone.LoadDataGrid();

        documents.LoadDataGrid();

        var addressGridViewModel = new AddressModule.GridViewModel();
        addressGridViewModel.LoadDataGrid();
    }
}
var person = new Person();