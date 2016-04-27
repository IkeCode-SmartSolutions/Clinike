///<reference path="typings/knockout/knockout.d.ts" />
///<reference path="typings/knockout.mapping/knockout.mapping.d.ts" />
///<reference path="typings/knockout.validation/knockout.validation.d.ts" />
module ClinikeModels {
    export interface IAddress {
        Id: KnockoutObservable<number>;
        DateIns: KnockoutObservable<Date>;
        LastUpdate: KnockoutObservable<Date>;
        Street: KnockoutObservable<string>;
        Number: KnockoutObservable<string>;
    }

    export class Address implements IAddress {
        Id: KnockoutObservable<number> = ko.observable(0);
        DateIns: KnockoutObservable<Date> = ko.observable(new Date());
        LastUpdate: KnockoutObservable<Date> = ko.observable(new Date());
        Street: KnockoutObservable<string> = ko.observable('');
        Number: KnockoutObservable<string> = ko.observable('');

        constructor(addr?: IAddress) {
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

    export interface IDocument {
        Id: KnockoutObservable<number>;
        DateIns: KnockoutObservable<Date>;
        LastUpdate: KnockoutObservable<Date>;
        Value: KnockoutObservable<string>;
    }

    export class Document implements IDocument {
        Id: KnockoutObservable<number> = ko.observable(0);
        DateIns: KnockoutObservable<Date> = ko.observable(new Date());
        LastUpdate: KnockoutObservable<Date> = ko.observable(new Date());
        Value: KnockoutObservable<string> = ko.observable('');

        constructor(doc?: IDocument) {
            $log.verbose('Person.Models.Document :: constructor [document]', doc);
            if (doc) {
                this.Id(doc.Id());
                this.DateIns(doc.DateIns());
                this.LastUpdate(doc.LastUpdate());
                this.Value(doc.Value());
            }
        }
    }

    export interface IPhone {
        Id: KnockoutObservable<number>;
        DateIns: KnockoutObservable<Date>;
        LastUpdate: KnockoutObservable<Date>;
        Number: KnockoutObservable<string>;
        Contact: KnockoutObservable<string>;
        PhoneType: KnockoutObservable<string>;
        AcceptSMS: KnockoutObservable<boolean>;
    }

    export class Phone implements IPhone {
        Id: KnockoutObservable<number> = ko.observable(0);
        DateIns: KnockoutObservable<Date> = ko.observable(new Date());
        LastUpdate: KnockoutObservable<Date> = ko.observable(new Date());
        Number: KnockoutObservable<string> = ko.observable('');
        Contact: KnockoutObservable<string> = ko.observable('');
        PhoneType: KnockoutObservable<string> = ko.observable('');
        AcceptSMS: KnockoutObservable<boolean> = ko.observable(false);

        constructor(phone?: IPhone) {
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

    export interface IPerson {
        Id: KnockoutObservable<number>;
        DateIns: KnockoutObservable<Date>;
        LastUpdate: KnockoutObservable<Date>;
        Name: KnockoutObservable<string>;
        Email: KnockoutObservable<string>;
    }

    export class Person implements IPerson {
        Id: KnockoutObservable<number> = ko.observable(0);
        DateIns: KnockoutObservable<Date> = ko.observable(new Date());
        LastUpdate: KnockoutObservable<Date> = ko.observable(new Date());
        Name: KnockoutObservable<string> = ko.observable('');
        Email: KnockoutObservable<string> = ko.observable('');

        constructor(person?: IPerson) {
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
}