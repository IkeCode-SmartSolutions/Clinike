///<reference path="typings/knockout/knockout.d.ts" />
///<reference path="typings/knockout.mapping/knockout.mapping.d.ts" />
///<reference path="typings/knockout.validation/knockout.validation.d.ts" />
module Clinike.Models {
    interface IBaseModel {
        Id: number;
        DateIns: Date;
        LastUpdate: Date;
    }

    class BaseModel implements IBaseModel {
        Id: number;
        DateIns: Date;
        LastUpdate: Date;

        constructor(obj?: any) {
            if (obj) {
                this.Id = obj.Id || 0;
                this.DateIns = obj.DateIns || new Date();
                this.LastUpdate = obj.LastUpdate || new Date();
            }
        }
    }

    class KoBaseModel {
        Id: KnockoutObservable<number> = ko.observable<number>();
        DateIns: KnockoutObservable<Date> = ko.observable<Date>();
        LastUpdate: KnockoutObservable<Date> = ko.observable<Date>();

        constructor(obj?: any) {
            if (obj) {
                this.Id(obj.Id || 0);
                this.DateIns(obj.DateIns || new Date());
                this.LastUpdate(obj.LastUpdate || new Date());
            }
        }
    }

    export interface IAddress extends IBaseModel {
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

    export class Address extends BaseModel implements IAddress {
        Street: string;
        Number: string;
        Complement: string;
        Neighborhood: string;
        ZipCode: string;
        City: string;
        State: string;
        AddressType: string;
        PersonId: number;

        constructor(obj?: IAddress) {
            super(obj);
            $log.verbose('ClinikeModels.Address :: constructor [address]', obj);
            if (obj) {
                this.Street = obj.Street || '';
                this.Number = obj.Number || '';
                this.Complement = obj.Complement || '';
                this.Neighborhood = obj.Neighborhood || '';
                this.ZipCode = obj.ZipCode || '';
                this.City = obj.City || '';
                this.State = obj.State || '';
                this.AddressType = obj.AddressType || '';
                this.PersonId = obj.PersonId || 0;
            }
        }
    }

    export class KoAddress extends KoBaseModel {
        Street: KnockoutObservable<string> = ko.observable<string>();
        Number: KnockoutObservable<string> = ko.observable<string>();
        Complement: KnockoutObservable<string> = ko.observable<string>();
        Neighborhood: KnockoutObservable<string> = ko.observable<string>();
        ZipCode: KnockoutObservable<string> = ko.observable<string>();
        City: KnockoutObservable<string> = ko.observable<string>();
        State: KnockoutObservable<string> = ko.observable<string>();
        AddressType: KnockoutObservable<string> = ko.observable<string>();
        PersonId: KnockoutObservable<number> = ko.observable<number>();

        constructor(obj?: IAddress) {
            super(obj);
            $log.verbose('ClinikeModels.KoAddress :: constructor | [address] >', obj);
            if (obj) {
                this.Street(obj.Street || '');
                this.Number(obj.Number || '');
                this.Complement(obj.Complement || '');
                this.Neighborhood(obj.Neighborhood || '');
                this.ZipCode(obj.ZipCode || '');
                this.City(obj.City || '');
                this.State(obj.State || '');
                this.AddressType(obj.AddressType || '');
                this.PersonId(obj.PersonId || 0);
            }
        }
    }

    export interface IDocumentType extends IBaseModel {
        Name: string;
    }

    export class KoDocumentType extends KoBaseModel {
        Name: KnockoutObservable<string> = ko.observable<string>();

        constructor(obj?: IDocumentType) {
            super(obj);
            $log.verbose('ClinikeModels.KoDocumentType :: constructor [documentType]', obj);
            if (obj) {
                this.Name(obj.Name || '');
            }
        }
    }

    export class DocumentType extends BaseModel implements IDocumentType {
        Name: string;

        constructor(obj?: IDocumentType) {
            super(obj);
            $log.verbose('ClinikeModels.DocumentType :: constructor [documentType]', obj);
            if (obj) {
                this.Name = obj.Name || '';
            }
        }
    }

    export interface IDocument extends IBaseModel {
        Value: string;
        DocumentType: IDocumentType;
        PersonId: number;
    }

    export class KoDocument extends KoBaseModel {
        Value: KnockoutObservable<string> = ko.observable<string>();
        DocumentType: KnockoutObservable<IDocumentType> = ko.observable<IDocumentType>();
        PersonId: KnockoutObservable<number> = ko.observable<number>();

        constructor(obj?: IDocument) {
            super(obj);
            $log.verbose('ClinikeModels.KoDocument :: constructor [document]', obj);
            if (obj) {
                this.Value(obj.Value || '');
                this.DocumentType(obj.DocumentType || new DocumentType());
                this.PersonId(obj.PersonId || 0);
            }
        }
    }

    export class Document extends BaseModel implements IDocument {
        Value: string;
        DocumentType: IDocumentType;
        PersonId: number;

        constructor(obj?: IDocument) {
            super(obj);
            $log.verbose('ClinikeModels.Document :: constructor [document]', obj);
            if (obj) {
                this.Value = obj.Value || '';
                this.DocumentType = obj.DocumentType || new DocumentType();
                this.PersonId = obj.PersonId || 0;
            }
        }
    }

    export interface IPhone extends IBaseModel {
        Number: string;
        Contact: string;
        PhoneType: string;
        AcceptSMS: boolean;
        PersonId: number;
    }

    export class KoPhone extends KoBaseModel {
        Number: KnockoutObservable<string> = ko.observable<string>();
        Contact: KnockoutObservable<string> = ko.observable<string>();
        PhoneType: KnockoutObservable<string> = ko.observable<string>();
        AcceptSMS: KnockoutObservable<boolean> = ko.observable<boolean>();
        PersonId: KnockoutObservable<number> = ko.observable<number>();

        constructor(obj?: IPhone) {
            super(obj);
            $log.verbose('ClinikeModels.KoPhone :: constructor | [phone] > ', obj);
            if (obj) {
                this.Number(obj.Number || '');
                this.Contact(obj.Contact || '');
                this.PhoneType(obj.PhoneType || 'Unknown');
                this.AcceptSMS(obj.AcceptSMS || false);
                this.PersonId(obj.PersonId || 0);
            }
        }
    }

    export class Phone extends BaseModel implements IPhone {
        Number: string;
        Contact: string;
        PhoneType: string;
        AcceptSMS: boolean;
        PersonId: number;

        constructor(obj?: IPhone) {
            super(obj);
            $log.verbose('ClinikeModels.Phone :: constructor | [phone] > ', obj);
            if (obj) {
                this.Number = obj.Number || '';
                this.Contact = obj.Contact || '';
                this.PhoneType = obj.PhoneType || 'Unknown';
                this.AcceptSMS = obj.AcceptSMS || false;
                this.PersonId = obj.PersonId || 0;
            }
        }
    }

    export interface IPerson extends IBaseModel {
        Name: string;
        Email: string;
    }

    export class Person extends BaseModel implements IPerson {
        Name: string;
        Email: string;

        constructor(obj?: IPerson) {
            super(obj);
            $log.verbose('ClinikeModels.Person :: constructor [person]', obj);
            if (obj) {
                this.Name = obj.Name || '';
                this.Email = obj.Email || '';
            }
        }
    }

    export class KoPerson extends KoBaseModel {
        Name: KnockoutObservable<string> = ko.observable<string>();
        Email: KnockoutObservable<string> = ko.observable<string>();

        constructor(obj?: IPerson) {
            super(obj);
            $log.verbose('ClinikeModels.Person :: constructor [person]', obj);
            if (obj) {
                this.Name(obj.Name || '');
                this.Email(obj.Email || '');
            }
        }
    }
}