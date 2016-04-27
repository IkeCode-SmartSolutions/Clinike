///<reference path="typings/knockout/knockout.d.ts" />
///<reference path="typings/knockout.mapping/knockout.mapping.d.ts" />
///<reference path="typings/knockout.validation/knockout.validation.d.ts" />
var ClinikeModels;
(function (ClinikeModels) {
    class Address {
        constructor(addr) {
            this.Id = ko.observable(0);
            this.DateIns = ko.observable(new Date());
            this.LastUpdate = ko.observable(new Date());
            this.Street = ko.observable('');
            this.Number = ko.observable('');
            $log.verbose('Person.Models.Document :: constructor [address]', addr);
            if (addr) {
                this.Id(addr.Id());
                this.DateIns(addr.DateIns());
                this.LastUpdate(addr.LastUpdate());
                this.Number(addr.Number());
                this.Street(addr.Street());
            }
        }
    }
    ClinikeModels.Address = Address;
    class Document {
        constructor(doc) {
            this.Id = ko.observable(0);
            this.DateIns = ko.observable(new Date());
            this.LastUpdate = ko.observable(new Date());
            this.Value = ko.observable('');
            $log.verbose('Person.Models.Document :: constructor [document]', doc);
            if (doc) {
                this.Id(doc.Id());
                this.DateIns(doc.DateIns());
                this.LastUpdate(doc.LastUpdate());
                this.Value(doc.Value());
            }
        }
    }
    ClinikeModels.Document = Document;
    class Phone {
        constructor(phone) {
            this.Id = ko.observable(0);
            this.DateIns = ko.observable(new Date());
            this.LastUpdate = ko.observable(new Date());
            this.Number = ko.observable('');
            this.Contact = ko.observable('');
            this.PhoneType = ko.observable('');
            this.AcceptSMS = ko.observable(false);
            $log.verbose('Person.Models.Phone :: constructor [phone]', phone);
            if (phone) {
                this.Id(phone.Id());
                this.DateIns(phone.DateIns());
                this.LastUpdate(phone.LastUpdate());
                this.Number(phone.Number());
                this.Contact(phone.Contact());
                this.PhoneType(phone.PhoneType());
                this.AcceptSMS(phone.AcceptSMS());
            }
        }
    }
    ClinikeModels.Phone = Phone;
    class Person {
        constructor(person) {
            this.Id = ko.observable(0);
            this.DateIns = ko.observable(new Date());
            this.LastUpdate = ko.observable(new Date());
            this.Name = ko.observable('');
            this.Email = ko.observable('');
            $log.verbose('Person.Models.Person :: constructor [person]', person);
            if (person) {
                this.Id(person.Id());
                this.DateIns(person.DateIns());
                this.LastUpdate(person.LastUpdate());
                this.Name(person.Name());
                this.Email(person.Email());
            }
        }
    }
    ClinikeModels.Person = Person;
})(ClinikeModels || (ClinikeModels = {}));
//# sourceMappingURL=ClinikeModels.js.map