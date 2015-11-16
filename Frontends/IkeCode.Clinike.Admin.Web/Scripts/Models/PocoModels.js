// Classes
var AddressPoco = (function () {
    function AddressPoco(data) {
        if (data) {
            this.rowData = data;
            this.Street = ko.observable(data.Street);
            this.Number = ko.observable(data.Number);
            this.Complement = ko.observable(data.Complement);
            this.Neighborhood = ko.observable(data.Neighborhood);
            this.ZipCode = ko.observable(data.ZipCode);
            this.City = ko.observable(data.City);
            this.State = ko.observable(data.State);
            this.AddressType = ko.observable(data.AddressType);
            this.AddressTypeId = ko.observable(data.AddressTypeId);
            this.PersonId = ko.observable(data.PersonId);
            this.Person = ko.observable(data.Person);
            this.Id = ko.observable(data.Id);
            this.DateIns = ko.observable(data.DateIns);
            this.LastUpdate = ko.observable(data.LastUpdate);
        }
    }
    AddressPoco.prototype.toJSON = function () {
        var _js = ko.mapping.toJSON(this);
        return _js;
    };
    AddressPoco.prototype.Update = function (data) {
        this.rowData = data;
        this.Street(data.Street);
        this.Number(data.Number);
        this.Complement(data.Complement);
        this.Neighborhood(data.Neighborhood);
        this.ZipCode(data.ZipCode);
        this.City(data.City);
        this.State(data.State);
        this.AddressType(data.AddressType);
        this.AddressTypeId(data.AddressTypeId);
        this.PersonId(data.PersonId);
        this.Person(data.Person);
        this.Id(data.Id);
        this.DateIns(data.DateIns);
        this.LastUpdate(data.LastUpdate);
    };
    return AddressPoco;
})();
var DoctorPoco = (function () {
    function DoctorPoco(data) {
        if (data) {
            this.rowData = data;
            this.Id = ko.observable(data.Id);
            this.AdmissionDate = ko.observable(data.AdmissionDate);
            this.Person = ko.observable(data.Person);
            this.DateIns = ko.observable(data.DateIns);
            this.LastUpdate = ko.observable(data.LastUpdate);
        }
    }
    DoctorPoco.prototype.toJSON = function () {
        var _js = ko.mapping.toJSON(this);
        return _js;
    };
    DoctorPoco.prototype.Update = function (data) {
        this.rowData = data;
        this.Id(data.Id);
        this.AdmissionDate(data.AdmissionDate);
        this.Person(data.Person);
        this.DateIns(data.DateIns);
        this.LastUpdate(data.LastUpdate);
    };
    return DoctorPoco;
})();
var DocumentPoco = (function () {
    function DocumentPoco(data) {
        if (data) {
            this.rowData = data;
            this.Value = ko.observable(data.Value);
            this.DocumentTypeId = ko.observable(data.DocumentTypeId);
            this.PersonId = ko.observable(data.PersonId);
            this.DocumentType = ko.observable(data.DocumentType);
            this.Person = ko.observable(data.Person);
            this.Id = ko.observable(data.Id);
            this.DateIns = ko.observable(data.DateIns);
            this.LastUpdate = ko.observable(data.LastUpdate);
        }
    }
    DocumentPoco.prototype.toJSON = function () {
        var _js = ko.mapping.toJSON(this);
        return _js;
    };
    DocumentPoco.prototype.Update = function (data) {
        this.rowData = data;
        this.Value(data.Value);
        this.DocumentTypeId(data.DocumentTypeId);
        this.PersonId(data.PersonId);
        this.DocumentType(data.DocumentType);
        this.Person(data.Person);
        this.Id(data.Id);
        this.DateIns(data.DateIns);
        this.LastUpdate(data.LastUpdate);
    };
    return DocumentPoco;
})();
var LegalPersonPoco = (function () {
    function LegalPersonPoco(data) {
        if (data) {
            this.rowData = data;
            this.Id = ko.observable(data.Id);
            this.SocialName = ko.observable(data.SocialName);
            this.CompanyName = ko.observable(data.CompanyName);
            this.Person = ko.observable(data.Person);
            this.DateIns = ko.observable(data.DateIns);
            this.LastUpdate = ko.observable(data.LastUpdate);
        }
    }
    LegalPersonPoco.prototype.toJSON = function () {
        var _js = ko.mapping.toJSON(this);
        return _js;
    };
    LegalPersonPoco.prototype.Update = function (data) {
        this.rowData = data;
        this.Id(data.Id);
        this.SocialName(data.SocialName);
        this.CompanyName(data.CompanyName);
        this.Person(data.Person);
        this.DateIns(data.DateIns);
        this.LastUpdate(data.LastUpdate);
    };
    return LegalPersonPoco;
})();
var NaturalPersonPoco = (function () {
    function NaturalPersonPoco(data) {
        if (data) {
            this.rowData = data;
            this.Id = ko.observable(data.Id);
            this.Gender = ko.observable(data.Gender);
            this.Birthdate = ko.observable(data.Birthdate);
            this.Person = ko.observable(data.Person);
            this.DateIns = ko.observable(data.DateIns);
            this.LastUpdate = ko.observable(data.LastUpdate);
        }
    }
    NaturalPersonPoco.prototype.toJSON = function () {
        var _js = ko.mapping.toJSON(this);
        return _js;
    };
    NaturalPersonPoco.prototype.Update = function (data) {
        this.rowData = data;
        this.Id(data.Id);
        this.Gender(data.Gender);
        this.Birthdate(data.Birthdate);
        this.Person(data.Person);
        this.DateIns(data.DateIns);
        this.LastUpdate(data.LastUpdate);
    };
    return NaturalPersonPoco;
})();
var PersonPoco = (function () {
    function PersonPoco(data) {
        if (data) {
            this.rowData = data;
            this.Name = ko.observable(data.Name);
            this.Email = ko.observable(data.Email);
            this.ProfileImage = ko.observable(data.ProfileImage);
            this.ProfileImageUrl = ko.observable(data.ProfileImageUrl);
            this.Doctor = ko.observable(data.Doctor);
            this.LegalPerson = ko.observable(data.LegalPerson);
            this.NaturalPerson = ko.observable(data.NaturalPerson);
            this.Addresses = ko.observableArray(data.Addresses);
            this.Documents = ko.observableArray(data.Documents);
            this.Phones = ko.observableArray(data.Phones);
            this.Id = ko.observable(data.Id);
            this.DateIns = ko.observable(data.DateIns);
            this.LastUpdate = ko.observable(data.LastUpdate);
        }
    }
    PersonPoco.prototype.toJSON = function () {
        var _js = ko.mapping.toJSON(this);
        return _js;
    };
    PersonPoco.prototype.Update = function (data) {
        this.rowData = data;
        this.Name(data.Name);
        this.Email(data.Email);
        this.ProfileImage(data.ProfileImage);
        this.ProfileImageUrl(data.ProfileImageUrl);
        this.Doctor(data.Doctor);
        this.LegalPerson(data.LegalPerson);
        this.NaturalPerson(data.NaturalPerson);
        this.Addresses(data.Addresses);
        this.Documents(data.Documents);
        this.Phones(data.Phones);
        this.Id(data.Id);
        this.DateIns(data.DateIns);
        this.LastUpdate(data.LastUpdate);
    };
    return PersonPoco;
})();
var PhonePoco = (function () {
    function PhonePoco(data) {
        if (data) {
            this.rowData = data;
            this.Number = ko.observable(data.Number);
            this.PhoneType = ko.observable(data.PhoneType);
            this.PersonId = ko.observable(data.PersonId);
            this.Person = ko.observable(data.Person);
            this.Id = ko.observable(data.Id);
            this.DateIns = ko.observable(data.DateIns);
            this.LastUpdate = ko.observable(data.LastUpdate);
        }
    }
    PhonePoco.prototype.toJSON = function () {
        var _js = ko.mapping.toJSON(this);
        return _js;
    };
    PhonePoco.prototype.Update = function (data) {
        this.rowData = data;
        this.Number(data.Number);
        this.PhoneType(data.PhoneType);
        this.PersonId(data.PersonId);
        this.Person(data.Person);
        this.Id(data.Id);
        this.DateIns(data.DateIns);
        this.LastUpdate(data.LastUpdate);
    };
    return PhonePoco;
})();
