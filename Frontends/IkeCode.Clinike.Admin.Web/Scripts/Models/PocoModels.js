///<reference path="../typings/knockout/knockout.d.ts" />
///<reference path="../typings/knockout.mapping/knockout.mapping.d.ts" />
///<reference path="../typings/knockout.validation/knockout.validation.d.ts" />
// Classes
var AddressPoco = (function () {
    function AddressPoco() {
        this.Street = ko.observable().extend({ required: { params: true, message: 'Campo Endereço é obrigatório' } }).extend({ maxLength: { params: 250, message: 'O campo Endereço deve ter no máximo 250 caracteres' } });
        this.Number = ko.observable().extend({ maxLength: { params: 10, message: 'O campo Number deve ter no máximo 10 caracteres' } }).extend({ required: { params: true, message: 'O campo Number é obrigatório' } });
        this.Complement = ko.observable().extend({ maxLength: { params: 50, message: 'O campo Complement deve ter no máximo 50 caracteres' } });
        this.Neighborhood = ko.observable().extend({ maxLength: { params: 100, message: 'O campo Neighborhood deve ter no máximo 100 caracteres' } }).extend({ required: { params: true, message: 'O campo Neighborhood é obrigatório' } });
        this.ZipCode = ko.observable().extend({ required: { params: true, message: 'O campo ZipCode é obrigatório' } }).extend({ maxLength: { params: 20, message: 'O campo ZipCode deve ter no máximo 20 caracteres' } });
        this.City = ko.observable().extend({ maxLength: { params: 150, message: 'O campo City deve ter no máximo 150 caracteres' } }).extend({ required: { params: true, message: 'O campo City é obrigatório' } });
        this.State = ko.observable().extend({ maxLength: { params: 2, message: 'O campo State deve ter no máximo 2 caracteres' } }).extend({ required: { params: true, message: 'O campo State é obrigatório' } });
        this.AddressType = ko.observable();
        this.PersonId = ko.observable();
        this.Person = ko.observable();
    }
    AddressPoco.prototype.toJSON = function (data) {
        var _js = ko.mapping.toJSON(data);
        return _js;
    };
    AddressPoco.prototype.Update = function (data) {
        this.Id = data.Id;
        this.DateIns = data.DateIns;
        this.LastUpdate = data.LastUpdate;
        this.Street(data.Street);
        this.Number(data.Number);
        this.Complement(data.Complement);
        this.Neighborhood(data.Neighborhood);
        this.ZipCode(data.ZipCode);
        this.City(data.City);
        this.State(data.State);
        this.AddressType(data.AddressType);
        this.PersonId(data.PersonId);
        this.Person(data.Person);
    };
    return AddressPoco;
})();
var DoctorPoco = (function () {
    function DoctorPoco() {
        this.AdmissionDate = ko.observable();
        this.Person = ko.observable();
    }
    DoctorPoco.prototype.toJSON = function (data) {
        var _js = ko.mapping.toJSON(data);
        return _js;
    };
    DoctorPoco.prototype.Update = function (data) {
        this.Id = data.Id;
        this.DateIns = data.DateIns;
        this.LastUpdate = data.LastUpdate;
        this.AdmissionDate(data.AdmissionDate);
        this.Person(data.Person);
    };
    return DoctorPoco;
})();
var DocumentPoco = (function () {
    function DocumentPoco() {
        this.Value = ko.observable().extend({ maxLength: { params: 30, message: 'O campo Value deve ter no máximo 30 caracteres' } }).extend({ required: { params: true, message: 'O campo Value é obrigatório' } });
        this.DocumentTypeId = ko.observable();
        this.PersonId = ko.observable();
        this.DocumentType = ko.observable();
        this.Person = ko.observable();
    }
    DocumentPoco.prototype.toJSON = function (data) {
        var _js = ko.mapping.toJSON(data);
        return _js;
    };
    DocumentPoco.prototype.Update = function (data) {
        this.Id = data.Id;
        this.DateIns = data.DateIns;
        this.LastUpdate = data.LastUpdate;
        this.Value(data.Value);
        this.DocumentTypeId(data.DocumentTypeId);
        this.PersonId(data.PersonId);
        this.DocumentType(data.DocumentType);
        this.Person(data.Person);
    };
    return DocumentPoco;
})();
var LegalPersonPoco = (function () {
    function LegalPersonPoco() {
        this.SocialName = ko.observable().extend({ required: { params: true, message: 'O campo Nome Fantasia é obrigatório' } }).extend({ maxLength: { params: 250, message: 'O campo Nome Fantasia deve ter no máximo 250 caracteres' } });
        this.CompanyName = ko.observable().extend({ maxLength: { params: 250, message: 'O campo Razão Social deve ter no máximo 250 caracteres' } }).extend({ required: { params: true, message: 'O campo Razão Social é obrigatório' } });
        this.Person = ko.observable();
    }
    LegalPersonPoco.prototype.toJSON = function (data) {
        var _js = ko.mapping.toJSON(data);
        return _js;
    };
    LegalPersonPoco.prototype.Update = function (data) {
        this.Id = data.Id;
        this.DateIns = data.DateIns;
        this.LastUpdate = data.LastUpdate;
        this.SocialName(data.SocialName);
        this.CompanyName(data.CompanyName);
        this.Person(data.Person);
    };
    return LegalPersonPoco;
})();
var NaturalPersonPoco = (function () {
    function NaturalPersonPoco() {
        this.Gender = ko.observable();
        this.Birthdate = ko.observable();
        this.Person = ko.observable();
    }
    NaturalPersonPoco.prototype.toJSON = function (data) {
        var _js = ko.mapping.toJSON(data);
        return _js;
    };
    NaturalPersonPoco.prototype.Update = function (data) {
        this.Id = data.Id;
        this.DateIns = data.DateIns;
        this.LastUpdate = data.LastUpdate;
        this.Gender(data.Gender);
        this.Birthdate(data.Birthdate);
        this.Person(data.Person);
    };
    return NaturalPersonPoco;
})();
var PersonPoco = (function () {
    function PersonPoco() {
        this.Name = ko.observable().extend({ required: { params: true, message: 'O campo Nome é obrigatório' } }).extend({ maxLength: { params: 250, message: 'O campo Nome deve ter no máximo 250 caracteres' } });
        this.Email = ko.observable().extend({ required: { params: true, message: 'O campo Email é obrigatório' } }).extend({ maxLength: { params: 250, message: 'O campo Email deve ter no máximo 250 caracteres' } });
        this.ProfileImageUrl = ko.observable();
        this.Doctor = ko.observable();
        this.LegalPerson = ko.observable();
        this.NaturalPerson = ko.observable();
        this.Addresses = ko.observableArray();
        this.Documents = ko.observableArray();
        this.Phones = ko.observableArray();
    }
    PersonPoco.prototype.toJSON = function (data) {
        var _js = ko.mapping.toJSON(data);
        return _js;
    };
    PersonPoco.prototype.Update = function (data) {
        this.Id = data.Id;
        this.DateIns = data.DateIns;
        this.LastUpdate = data.LastUpdate;
        this.Name(data.Name);
        this.Email(data.Email);
        this.ProfileImageUrl(data.ProfileImageUrl);
        this.Doctor(data.Doctor);
        this.LegalPerson(data.LegalPerson);
        this.NaturalPerson(data.NaturalPerson);
        this.Addresses(data.Addresses);
        this.Documents(data.Documents);
        this.Phones(data.Phones);
    };
    return PersonPoco;
})();
var PhonePoco = (function () {
    function PhonePoco() {
        this.Number = ko.observable().extend({ maxLength: { params: 30, message: 'O campo Number deve ter no máximo 30 caracteres' } }).extend({ required: { params: true, message: 'O campo Number é obrigatório' } });
        this.PhoneType = ko.observable();
        this.PersonId = ko.observable();
        this.Person = ko.observable();
    }
    PhonePoco.prototype.toJSON = function (data) {
        var _js = ko.mapping.toJSON(data);
        return _js;
    };
    PhonePoco.prototype.Update = function (data) {
        this.Id = data.Id;
        this.DateIns = data.DateIns;
        this.LastUpdate = data.LastUpdate;
        this.Number(data.Number);
        this.PhoneType(data.PhoneType);
        this.PersonId(data.PersonId);
        this.Person(data.Person);
    };
    return PhonePoco;
})();
