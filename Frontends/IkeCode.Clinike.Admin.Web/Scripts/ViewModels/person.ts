class Person extends PersonPoco {
    constructor() {
        super();
    }

    public Init() {
        var phoneGridViewModel = new PhoneModule.GridViewModel(this.Id);
        phoneGridViewModel.LoadDataGrid();

        var documentGridViewModel = new DocumentModule.GridViewModel(this.Id);
        documentGridViewModel.LoadDataGrid();

        var addressGridViewModel = new AddressModule.GridViewModel(this.Id);
        addressGridViewModel.LoadDataGrid();
    }
}