///<reference path="typings/knockout/knockout.d.ts" />
///<reference path="typings/knockout.mapping/knockout.mapping.d.ts" />
///<reference path="typings/knockout.validation/knockout.validation.d.ts" />
var ClinikeModels;
(function (ClinikeModels) {
    class Address {
        constructor(addr) {
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
    ClinikeModels.Address = Address;
    class KoAddress {
        constructor(addr) {
            this.Id = ko.observable();
            this.DateIns = ko.observable();
            this.LastUpdate = ko.observable();
            this.Street = ko.observable();
            this.Number = ko.observable();
            this.Complement = ko.observable();
            this.Neighborhood = ko.observable();
            this.ZipCode = ko.observable();
            this.City = ko.observable();
            this.State = ko.observable();
            this.AddressType = ko.observable();
            this.PersonId = ko.observable();
            $log.verbose('ClinikeModels.Address :: constructor | [address] >', addr);
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
    ClinikeModels.KoAddress = KoAddress;
    class KoDocumentType {
        constructor(docType) {
            this.Id = ko.observable();
            this.DateIns = ko.observable();
            this.LastUpdate = ko.observable();
            this.Name = ko.observable();
            $log.verbose('ClinikeModels.KoDocumentType :: constructor [documentType]', docType);
            this.Id(docType && docType.Id || 0);
            this.DateIns(docType && docType.DateIns || new Date());
            this.LastUpdate(docType && docType.LastUpdate || new Date());
            this.Name(docType && docType.Name || '');
        }
    }
    ClinikeModels.KoDocumentType = KoDocumentType;
    class DocumentType {
        constructor(docType) {
            $log.verbose('ClinikeModels.DocumentType :: constructor [documentType]', docType);
            this.Id = docType && docType.Id || 0;
            this.DateIns = docType && docType.DateIns || new Date();
            this.LastUpdate = docType && docType.LastUpdate || new Date();
            this.Name = docType && docType.Name || '';
        }
    }
    ClinikeModels.DocumentType = DocumentType;
    class KoDocument {
        constructor(doc) {
            this.Id = ko.observable();
            this.DateIns = ko.observable();
            this.LastUpdate = ko.observable();
            this.Value = ko.observable();
            this.DocumentType = ko.observable();
            this.PersonId = ko.observable();
            $log.verbose('ClinikeModels.KoDocument :: constructor [document]', doc);
            this.Id(doc && doc.Id || 0);
            this.DateIns(doc && doc.DateIns || new Date());
            this.LastUpdate(doc && doc.LastUpdate || new Date());
            this.Value(doc && doc.Value || '');
            this.DocumentType(doc && doc.DocumentType || new DocumentType());
            this.PersonId(doc && doc.PersonId || 0);
        }
    }
    ClinikeModels.KoDocument = KoDocument;
    class Document {
        constructor(doc) {
            $log.verbose('ClinikeModels.Document :: constructor [document]', doc);
            this.Id = doc && doc.Id || 0;
            this.DateIns = doc && doc.DateIns || new Date();
            this.LastUpdate = doc && doc.LastUpdate || new Date();
            this.Value = doc && doc.Value || '';
            this.DocumentType = doc && doc.DocumentType || new DocumentType();
            this.PersonId = doc && doc.PersonId || 0;
        }
    }
    ClinikeModels.Document = Document;
    class KoPhone {
        constructor(phone) {
            this.Id = ko.observable();
            this.DateIns = ko.observable();
            this.LastUpdate = ko.observable();
            this.Number = ko.observable();
            this.Contact = ko.observable();
            this.PhoneType = ko.observable();
            this.AcceptSMS = ko.observable();
            this.PersonId = ko.observable();
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
    ClinikeModels.KoPhone = KoPhone;
    class Phone {
        constructor(phone) {
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
    ClinikeModels.Phone = Phone;
    class Person {
        constructor(person) {
            this.Id = ko.observable(0);
            this.DateIns = ko.observable(new Date());
            this.LastUpdate = ko.observable(new Date());
            this.Name = ko.observable('');
            this.Email = ko.observable('');
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
    ClinikeModels.Person = Person;
})(ClinikeModels || (ClinikeModels = {}));
//# sourceMappingURL=ClinikeModels.js.map