///<reference path="../typings/knockout/knockout.d.ts" />
///<reference path="../typings/knockout.mapping/knockout.mapping.d.ts" />
///<reference path="../typings/knockout.validation/knockout.validation.d.ts" />
// Classes
var AddressPoco = (function () {
    function AddressPoco() {
    }
    return AddressPoco;
})();
var KoAddress = (function () {
    function KoAddress() {
        this.Street = ko.observable().extend({ required: { params: true, message: 'Campo Endereço é obrigatório' } }).extend({ maxLength: { params: 250, message: 'O campo Endereço deve ter no máximo 250 caracteres' } });
        this.Number = ko.observable().extend({ required: { params: true, message: 'O campo Number é obrigatório' } }).extend({ maxLength: { params: 10, message: 'O campo Number deve ter no máximo 10 caracteres' } });
        this.Complement = ko.observable().extend({ maxLength: { params: 50, message: 'O campo Complement deve ter no máximo 50 caracteres' } });
        this.Neighborhood = ko.observable().extend({ required: { params: true, message: 'O campo Neighborhood é obrigatório' } }).extend({ maxLength: { params: 100, message: 'O campo Neighborhood deve ter no máximo 100 caracteres' } });
        this.ZipCode = ko.observable().extend({ required: { params: true, message: 'O campo ZipCode é obrigatório' } }).extend({ maxLength: { params: 20, message: 'O campo ZipCode deve ter no máximo 20 caracteres' } });
        this.City = ko.observable().extend({ required: { params: true, message: 'O campo City é obrigatório' } }).extend({ maxLength: { params: 150, message: 'O campo City deve ter no máximo 150 caracteres' } });
        this.State = ko.observable().extend({ required: { params: true, message: 'O campo State é obrigatório' } }).extend({ maxLength: { params: 2, message: 'O campo State deve ter no máximo 2 caracteres' } });
        this.AddressType = ko.observable();
        this.AddressTypeId = ko.observable();
        this.PersonId = ko.observable();
        this.Person = ko.observable();
    }
    KoAddress.prototype.Update = function (data) {
        if (data) {
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
            this.AddressTypeId(data.AddressTypeId);
            this.PersonId(data.PersonId);
            this.Person(data.Person);
        }
    };
    KoAddress.prototype.toJS = function () {
        var result = new AddressPoco();
        if (this !== undefined) {
            result.Id = this.Id;
            result.DateIns = this.DateIns;
            result.LastUpdate = this.LastUpdate;
            result.Street = this.Street();
            result.Number = this.Number();
            result.Complement = this.Complement();
            result.Neighborhood = this.Neighborhood();
            result.ZipCode = this.ZipCode();
            result.City = this.City();
            result.State = this.State();
            result.AddressType = this.AddressType();
            result.AddressTypeId = this.AddressTypeId();
            result.PersonId = this.PersonId();
            result.Person = this.Person();
            return result;
        }
    };
    return KoAddress;
})();
var DoctorPoco = (function () {
    function DoctorPoco() {
    }
    return DoctorPoco;
})();
var KoDoctor = (function () {
    function KoDoctor() {
        this.AdmissionDate = ko.observable();
        this.Person = ko.observable();
    }
    KoDoctor.prototype.Update = function (data) {
        if (data) {
            this.Id = data.Id;
            this.DateIns = data.DateIns;
            this.LastUpdate = data.LastUpdate;
            this.AdmissionDate(data.AdmissionDate);
            this.Person(data.Person);
        }
    };
    KoDoctor.prototype.toJS = function () {
        var result = new DoctorPoco();
        if (this !== undefined) {
            result.Id = this.Id;
            result.DateIns = this.DateIns;
            result.LastUpdate = this.LastUpdate;
            result.AdmissionDate = this.AdmissionDate();
            result.Person = this.Person();
            return result;
        }
    };
    return KoDoctor;
})();
var DocumentPoco = (function () {
    function DocumentPoco() {
    }
    return DocumentPoco;
})();
var KoDocument = (function () {
    function KoDocument() {
        this.Value = ko.observable().extend({ required: { params: true, message: 'O campo Value é obrigatório' } }).extend({ maxLength: { params: 30, message: 'O campo Value deve ter no máximo 30 caracteres' } });
        this.DocumentTypeId = ko.observable();
        this.PersonId = ko.observable();
        this.DocumentType = ko.observable();
        this.Person = ko.observable();
    }
    KoDocument.prototype.Update = function (data) {
        if (data) {
            this.Id = data.Id;
            this.DateIns = data.DateIns;
            this.LastUpdate = data.LastUpdate;
            this.Value(data.Value);
            this.DocumentTypeId(data.DocumentTypeId);
            this.PersonId(data.PersonId);
            this.DocumentType(data.DocumentType);
            this.Person(data.Person);
        }
    };
    KoDocument.prototype.toJS = function () {
        var result = new DocumentPoco();
        if (this !== undefined) {
            result.Id = this.Id;
            result.DateIns = this.DateIns;
            result.LastUpdate = this.LastUpdate;
            result.Value = this.Value();
            result.DocumentTypeId = this.DocumentTypeId();
            result.PersonId = this.PersonId();
            result.DocumentType = this.DocumentType();
            result.Person = this.Person();
            return result;
        }
    };
    return KoDocument;
})();
var LegalPersonPoco = (function () {
    function LegalPersonPoco() {
    }
    return LegalPersonPoco;
})();
var KoLegalPerson = (function () {
    function KoLegalPerson() {
        this.SocialName = ko.observable().extend({ required: { params: true, message: 'O campo Nome Fantasia é obrigatório' } }).extend({ maxLength: { params: 250, message: 'O campo Nome Fantasia deve ter no máximo 250 caracteres' } });
        this.CompanyName = ko.observable().extend({ required: { params: true, message: 'O campo Razão Social é obrigatório' } }).extend({ maxLength: { params: 250, message: 'O campo Razão Social deve ter no máximo 250 caracteres' } });
        this.Person = ko.observable();
    }
    KoLegalPerson.prototype.Update = function (data) {
        if (data) {
            this.Id = data.Id;
            this.DateIns = data.DateIns;
            this.LastUpdate = data.LastUpdate;
            this.SocialName(data.SocialName);
            this.CompanyName(data.CompanyName);
            this.Person(data.Person);
        }
    };
    KoLegalPerson.prototype.toJS = function () {
        var result = new LegalPersonPoco();
        if (this !== undefined) {
            result.Id = this.Id;
            result.DateIns = this.DateIns;
            result.LastUpdate = this.LastUpdate;
            result.SocialName = this.SocialName();
            result.CompanyName = this.CompanyName();
            result.Person = this.Person();
            return result;
        }
    };
    return KoLegalPerson;
})();
var NaturalPersonPoco = (function () {
    function NaturalPersonPoco() {
    }
    return NaturalPersonPoco;
})();
var KoNaturalPerson = (function () {
    function KoNaturalPerson() {
        this.Gender = ko.observable();
        this.Birthdate = ko.observable();
        this.Person = ko.observable();
    }
    KoNaturalPerson.prototype.Update = function (data) {
        if (data) {
            this.Id = data.Id;
            this.DateIns = data.DateIns;
            this.LastUpdate = data.LastUpdate;
            this.Gender(data.Gender);
            this.Birthdate(data.Birthdate);
            this.Person(data.Person);
        }
    };
    KoNaturalPerson.prototype.toJS = function () {
        var result = new NaturalPersonPoco();
        if (this !== undefined) {
            result.Id = this.Id;
            result.DateIns = this.DateIns;
            result.LastUpdate = this.LastUpdate;
            result.Gender = this.Gender();
            result.Birthdate = this.Birthdate();
            result.Person = this.Person();
            return result;
        }
    };
    return KoNaturalPerson;
})();
var PersonPoco = (function () {
    function PersonPoco() {
    }
    return PersonPoco;
})();
var KoPerson = (function () {
    function KoPerson() {
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
    KoPerson.prototype.Update = function (data) {
        if (data) {
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
        }
    };
    KoPerson.prototype.toJS = function () {
        var result = new PersonPoco();
        if (this !== undefined) {
            result.Id = this.Id;
            result.DateIns = this.DateIns;
            result.LastUpdate = this.LastUpdate;
            result.Name = this.Name();
            result.Email = this.Email();
            result.ProfileImageUrl = this.ProfileImageUrl();
            result.Doctor = this.Doctor();
            result.LegalPerson = this.LegalPerson();
            result.NaturalPerson = this.NaturalPerson();
            result.Addresses = this.Addresses();
            result.Documents = this.Documents();
            result.Phones = this.Phones();
            return result;
        }
    };
    return KoPerson;
})();
var PhonePoco = (function () {
    function PhonePoco() {
    }
    return PhonePoco;
})();
var KoPhone = (function () {
    function KoPhone() {
        this.Number = ko.observable().extend({ required: { params: true, message: 'O campo Number é obrigatório' } }).extend({ maxLength: { params: 30, message: 'O campo Number deve ter no máximo 30 caracteres' } });
        this.PhoneType = ko.observable();
        this.PhoneTypeId = ko.observable();
        this.PersonId = ko.observable();
        this.Person = ko.observable();
    }
    KoPhone.prototype.Update = function (data) {
        if (data) {
            this.Id = data.Id;
            this.DateIns = data.DateIns;
            this.LastUpdate = data.LastUpdate;
            this.Number(data.Number);
            this.PhoneType(data.PhoneType);
            this.PhoneTypeId(data.PhoneTypeId);
            this.PersonId(data.PersonId);
            this.Person(data.Person);
        }
    };
    KoPhone.prototype.toJS = function () {
        var result = new PhonePoco();
        if (this !== undefined) {
            result.Id = this.Id;
            result.DateIns = this.DateIns;
            result.LastUpdate = this.LastUpdate;
            result.Number = this.Number();
            result.PhoneType = this.PhoneType();
            result.PhoneTypeId = this.PhoneTypeId();
            result.PersonId = this.PersonId();
            result.Person = this.Person();
            return result;
        }
    };
    return KoPhone;
})();
var SchedulePoco = (function () {
    function SchedulePoco() {
    }
    return SchedulePoco;
})();
var KoSchedule = (function () {
    function KoSchedule() {
        this.StartDate = ko.observable().extend({ required: { params: true, message: 'O campo StartDate é obrigatório' } });
        this.EndDate = ko.observable().extend({ required: { params: true, message: 'O campo EndDate é obrigatório' } });
        this.AllDay = ko.observable();
        this.ScheduleType = ko.observable().extend({ required: { params: true, message: 'O campo ScheduleType é obrigatório' } });
        this.ScheduleTypeId = ko.observable();
        this.PatientId = ko.observable().extend({ required: { params: true, message: 'O campo PatientId é obrigatório' } });
        this.DoctorId = ko.observable().extend({ required: { params: true, message: 'O campo DoctorId é obrigatório' } });
        this.Patient = ko.observable();
        this.Doctor = ko.observable();
    }
    KoSchedule.prototype.Update = function (data) {
        if (data) {
            this.Id = data.Id;
            this.DateIns = data.DateIns;
            this.LastUpdate = data.LastUpdate;
            this.StartDate(data.StartDate);
            this.EndDate(data.EndDate);
            this.AllDay(data.AllDay);
            this.ScheduleType(data.ScheduleType);
            this.ScheduleTypeId(data.ScheduleTypeId);
            this.PatientId(data.PatientId);
            this.DoctorId(data.DoctorId);
            this.Patient(data.Patient);
            this.Doctor(data.Doctor);
        }
    };
    KoSchedule.prototype.toJS = function () {
        var result = new SchedulePoco();
        if (this !== undefined) {
            result.Id = this.Id;
            result.DateIns = this.DateIns;
            result.LastUpdate = this.LastUpdate;
            result.StartDate = this.StartDate();
            result.EndDate = this.EndDate();
            result.AllDay = this.AllDay();
            result.ScheduleType = this.ScheduleType();
            result.ScheduleTypeId = this.ScheduleTypeId();
            result.PatientId = this.PatientId();
            result.DoctorId = this.DoctorId();
            result.Patient = this.Patient();
            result.Doctor = this.Doctor();
            return result;
        }
    };
    return KoSchedule;
})();
