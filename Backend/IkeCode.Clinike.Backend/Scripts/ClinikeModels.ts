///<reference path="typings/knockout/knockout.d.ts" />
///<reference path="typings/knockout.mapping/knockout.mapping.d.ts" />
///<reference path="typings/knockout.validation/knockout.validation.d.ts" />
module ClinikeModels {
    export interface IAddress {
        Id: number;
        DateIns: Date;
        LastUpdate: Date;
        Street: string;
        Number: string;
        Complement: string;
        Neighborhood: string;
        ZipCode: string;
        City: string;
        State: string;
        AddressType: string;
        PersonId: number;
    }

    export class Address implements IAddress {
        Id: number;
        DateIns: Date;
        LastUpdate: Date;
        Street: string;
        Number: string;
        Complement: string;
        Neighborhood: string;
        ZipCode: string;
        City: string;
        State: string;
        AddressType: string;
        PersonId: number;

        constructor(addr?: IAddress) {
            $log.verbose('ClinikeModels.Address :: constructor [address]', addr);
            this.Id = addr && addr.Id || 0;
            this.DateIns = addr && addr.DateIns || new Date();
            this.LastUpdate = addr && addr.LastUpdate || new Date();
            this.Street = addr && addr.Street || '';
            this.Number = addr && addr.Number || '';
            this.Complement = addr && addr.Complement || '';
            this.Neighborhood = addr && addr.Neighborhood || '';
            this.ZipCode = addr && addr.ZipCode || '';
            this.City = addr && addr.City || '';
            this.State = addr && addr.State || '';
            this.AddressType = addr && addr.AddressType || '';
            this.PersonId = addr && addr.PersonId || 0;
        }
    }

    export class KoAddress {
        Id: KnockoutObservable<number> = ko.observable<number>();
        DateIns: KnockoutObservable<Date> = ko.observable<Date>();
        LastUpdate: KnockoutObservable<Date> = ko.observable<Date>();
        Street: KnockoutObservable<string> = ko.observable<string>();
        Number: KnockoutObservable<string> = ko.observable<string>();
        Complement: KnockoutObservable<string> = ko.observable<string>();
        Neighborhood: KnockoutObservable<string> = ko.observable<string>();
        ZipCode: KnockoutObservable<string> = ko.observable<string>();
        City: KnockoutObservable<string> = ko.observable<string>();
        State: KnockoutObservable<string> = ko.observable<string>();
        AddressType: KnockoutObservable<string> = ko.observable<string>();
        PersonId: KnockoutObservable<number> = ko.observable<number>();

        constructor(addr?: IAddress) {
            $log.verbose('ClinikeModels.KoAddress :: constructor | [address] >', addr);
            this.Id(addr && addr.Id || 0);
            this.DateIns(addr && addr.DateIns || new Date());
            this.LastUpdate(addr && addr.LastUpdate || new Date());
            this.Street(addr && addr.Street || '');
            this.Number(addr && addr.Number || '');
            this.Complement(addr && addr.Complement || '');
            this.Neighborhood(addr && addr.Neighborhood || '');
            this.ZipCode(addr && addr.ZipCode || '');
            this.City(addr && addr.City || '');
            this.State(addr && addr.State || '');
            this.AddressType(addr && addr.AddressType || '');
            this.PersonId(addr && addr.PersonId || 0);
        }
    }

    export interface IDocumentType {
        Id: number;
        DateIns: Date;
        LastUpdate: Date;
        Name: string;
    }

    export class KoDocumentType {
        Id: KnockoutObservable<number> = ko.observable<number>();
        DateIns: KnockoutObservable<Date> = ko.observable<Date>();
        LastUpdate: KnockoutObservable<Date> = ko.observable<Date>();
        Name: KnockoutObservable<string> = ko.observable<string>();

        constructor(docType?: IDocumentType) {
            $log.verbose('ClinikeModels.KoDocumentType :: constructor [documentType]', docType);
            this.Id(docType && docType.Id || 0);
            this.DateIns(docType && docType.DateIns || new Date());
            this.LastUpdate(docType && docType.LastUpdate || new Date());
            this.Name(docType && docType.Name || '');
        }
    }

    export class DocumentType implements IDocumentType {
        Id: number;
        DateIns: Date;
        LastUpdate: Date;
        Name: string;

        constructor(docType?: IDocumentType) {
            $log.verbose('ClinikeModels.DocumentType :: constructor [documentType]', docType);
            this.Id = docType && docType.Id || 0;
            this.DateIns = docType && docType.DateIns || new Date();
            this.LastUpdate = docType && docType.LastUpdate || new Date();
            this.Name = docType && docType.Name || '';
        }
    }

    export interface IDocument {
        Id: number;
        DateIns: Date;
        LastUpdate: Date;
        Value: string;
        DocumentType: IDocumentType;
        PersonId: number;
    }

    export class KoDocument {
        Id: KnockoutObservable<number> = ko.observable<number>();
        DateIns: KnockoutObservable<Date> = ko.observable<Date>();
        LastUpdate: KnockoutObservable<Date> = ko.observable<Date>();
        Value: KnockoutObservable<string> = ko.observable<string>();
        DocumentType: KnockoutObservable<IDocumentType> = ko.observable<IDocumentType>();
        PersonId: KnockoutObservable<number> = ko.observable<number>();

        constructor(doc?: IDocument) {
            $log.verbose('ClinikeModels.KoDocument :: constructor [document]', doc);
            this.Id(doc && doc.Id || 0);
            this.DateIns(doc && doc.DateIns || new Date());
            this.LastUpdate(doc && doc.LastUpdate || new Date());
            this.Value(doc && doc.Value || '');
            this.DocumentType(doc && doc.DocumentType || new DocumentType());
            this.PersonId(doc && doc.PersonId || 0);
        }
    }

    export class Document implements IDocument {
        Id: number;
        DateIns: Date;
        LastUpdate: Date;
        Value: string;
        DocumentType: IDocumentType;
        PersonId: number;

        constructor(doc?: IDocument) {
            $log.verbose('ClinikeModels.Document :: constructor [document]', doc);
            this.Id = doc && doc.Id || 0;
            this.DateIns = doc && doc.DateIns || new Date();
            this.LastUpdate = doc && doc.LastUpdate || new Date();
            this.Value = doc && doc.Value || '';
            this.DocumentType = doc && doc.DocumentType || new DocumentType();
            this.PersonId = doc && doc.PersonId || 0;
        }
    }

    export interface IPhone {
        Id: number;
        DateIns: Date;
        LastUpdate: Date;
        Number: string;
        Contact: string;
        PhoneType: string;
        AcceptSMS: boolean;
        PersonId: number;
    }

    export class KoPhone {
        Id: KnockoutObservable<number> = ko.observable<number>();
        DateIns: KnockoutObservable<Date> = ko.observable<Date>();
        LastUpdate: KnockoutObservable<Date> = ko.observable<Date>();
        Number: KnockoutObservable<string> = ko.observable<string>();
        Contact: KnockoutObservable<string> = ko.observable<string>();
        PhoneType: KnockoutObservable<string> = ko.observable<string>();
        AcceptSMS: KnockoutObservable<boolean> = ko.observable<boolean>();
        PersonId: KnockoutObservable<number> = ko.observable<number>();

        constructor(phone?: IPhone) {
            $log.verbose('ClinikeModels.KoPhone :: constructor | [phone] > ', phone);

            this.Id(phone && phone.Id || 0);
            this.DateIns(phone && phone.DateIns || new Date());
            this.LastUpdate(phone && phone.LastUpdate || new Date());
            this.Number(phone && phone.Number || '');
            this.Contact(phone && phone.Contact || '');
            this.PhoneType(phone && phone.PhoneType || 'Unknown');
            this.AcceptSMS(phone && phone.AcceptSMS || false);
            this.PersonId(phone && phone.PersonId || 0);
        }
    }

    export class Phone implements IPhone {
        Id: number;
        DateIns: Date;
        LastUpdate: Date;
        Number: string;
        Contact: string;
        PhoneType: string;
        AcceptSMS: boolean;
        PersonId: number;

        constructor(phone?: IPhone) {
            $log.verbose('ClinikeModels.Phone :: constructor | [phone] > ', phone);

            this.Id = phone && phone.Id || 0;
            this.DateIns = phone && phone.DateIns || new Date();
            this.LastUpdate = phone && phone.LastUpdate || new Date();
            this.Number = phone && phone.Number || '';
            this.Contact = phone && phone.Contact || '';
            this.PhoneType = phone && phone.PhoneType || 'Unknown';
            this.AcceptSMS = phone && phone.AcceptSMS || false;
            this.PersonId = phone && phone.PersonId || 0;
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
            $log.verbose('ClinikeModels.Person :: constructor [person]', person);
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