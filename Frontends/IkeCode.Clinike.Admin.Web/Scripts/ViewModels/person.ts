///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/jquery.plugins/jquery.mask.d.ts" />
///<reference path="../typings/bootstrap/bootstrap.d.ts" />
///<reference path="../typings/knockout/knockout.d.ts" />
///<reference path="../typings/knockout.mapping/knockout.mapping.d.ts" />

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

        //var doctorViewModel = new DoctorModule.KoViewModel('form#_doctorForm', this.Id);
        //doctorViewModel.Init();
        //doctorViewModel.FetchDoctor();
    }
}