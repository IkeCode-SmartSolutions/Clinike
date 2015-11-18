///<reference path="../typings/knockout/knockout.d.ts" />
///<reference path="../typings/knockout.mapping/knockout.mapping.d.ts" />
///<reference path="../typings/knockout.validation/knockout.validation.d.ts" />
// Classes
var AddressPoco = (function () {
    function AddressPoco() {
        this.Street = ko.observable().extend({ required: { params: true, message: 'Campo Rua é obrigatório' } });
        this.Number = ko.observable().extend({ required: { params: true, message: 'O Campo Number é obrigatório' } });
        this.Complement = ko.observable();
        this.Neighborhood = ko.observable().extend({ required: { params: true, message: 'O Campo Neighborhood é obrigatório' } });
        this.ZipCode = ko.observable().extend({ required: { params: true, message: 'O Campo ZipCode é obrigatório' } });
        this.City = ko.observable().extend({ required: { params: true, message: 'O Campo City é obrigatório' } });
        this.State = ko.observable().extend({ required: { params: true, message: 'O Campo State é obrigatório' } });
        this.AddressType = ko.observable();
        this.AddressTypeId = ko.observable();
        this.PersonId = ko.observable();
        this.Person = ko.observable();
        this.Id = ko.observable();
        this.DateIns = ko.observable();
        this.LastUpdate = ko.observable();
    }
    AddressPoco.prototype.toJSON = function (data) {
        var _js = ko.mapping.toJSON(data);
        return _js;
    };
    AddressPoco.prototype.Update = function (data) {
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
    function DoctorPoco() {
        this.Id = ko.observable();
        this.AdmissionDate = ko.observable();
        this.Person = ko.observable();
        this.DateIns = ko.observable();
        this.LastUpdate = ko.observable();
    }
    DoctorPoco.prototype.toJSON = function (data) {
        var _js = ko.mapping.toJSON(data);
        return _js;
    };
    DoctorPoco.prototype.Update = function (data) {
        this.Id(data.Id);
        this.AdmissionDate(data.AdmissionDate);
        this.Person(data.Person);
        this.DateIns(data.DateIns);
        this.LastUpdate(data.LastUpdate);
    };
    return DoctorPoco;
})();
var DocumentPoco = (function () {
    function DocumentPoco() {
        this.Value = ko.observable().extend({ required: { params: true, message: 'O Campo Value é obrigatório' } });
        this.DocumentTypeId = ko.observable();
        this.PersonId = ko.observable();
        this.DocumentType = ko.observable();
        this.Person = ko.observable();
        this.Id = ko.observable();
        this.DateIns = ko.observable();
        this.LastUpdate = ko.observable();
    }
    DocumentPoco.prototype.toJSON = function (data) {
        var _js = ko.mapping.toJSON(data);
        return _js;
    };
    DocumentPoco.prototype.Update = function (data) {
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
    function LegalPersonPoco() {
        this.Id = ko.observable();
        this.SocialName = ko.observable().extend({ required: { params: true, message: 'O Campo SocialName é obrigatório' } });
        this.CompanyName = ko.observable().extend({ required: { params: true, message: 'O Campo CompanyName é obrigatório' } });
        this.Person = ko.observable();
        this.DateIns = ko.observable();
        this.LastUpdate = ko.observable();
    }
    LegalPersonPoco.prototype.toJSON = function (data) {
        var _js = ko.mapping.toJSON(data);
        return _js;
    };
    LegalPersonPoco.prototype.Update = function (data) {
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
    function NaturalPersonPoco() {
        this.Id = ko.observable();
        this.Gender = ko.observable();
        this.Birthdate = ko.observable();
        this.Person = ko.observable();
        this.DateIns = ko.observable();
        this.LastUpdate = ko.observable();
    }
    NaturalPersonPoco.prototype.toJSON = function (data) {
        var _js = ko.mapping.toJSON(data);
        return _js;
    };
    NaturalPersonPoco.prototype.Update = function (data) {
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
    function PersonPoco() {
        this.Name = ko.observable().extend({ required: { params: true, message: 'O Campo Name é obrigatório' } });
        this.Email = ko.observable().extend({ required: { params: true, message: 'O Campo Email é obrigatório' } });
        this.ProfileImage = ko.observable();
        this.ProfileImageUrl = ko.observable();
        this.Doctor = ko.observable();
        this.LegalPerson = ko.observable();
        this.NaturalPerson = ko.observable();
        this.Addresses = ko.observableArray();
        this.Documents = ko.observableArray();
        this.Phones = ko.observableArray();
        this.Id = ko.observable();
        this.DateIns = ko.observable();
        this.LastUpdate = ko.observable();
    }
    PersonPoco.prototype.toJSON = function (data) {
        var _js = ko.mapping.toJSON(data);
        return _js;
    };
    PersonPoco.prototype.Update = function (data) {
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
    function PhonePoco() {
        this.Number = ko.observable().extend({ required: { params: true, message: 'O Campo Number é obrigatório' } });
        this.PhoneType = ko.observable();
        this.PersonId = ko.observable();
        this.Person = ko.observable();
        this.Id = ko.observable();
        this.DateIns = ko.observable();
        this.LastUpdate = ko.observable();
    }
    PhonePoco.prototype.toJSON = function (data) {
        var _js = ko.mapping.toJSON(data);
        return _js;
    };
    PhonePoco.prototype.Update = function (data) {
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
