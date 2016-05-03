///<reference path="typings/knockout/knockout.d.ts" />
///<reference path="typings/knockout.mapping/knockout.mapping.d.ts" />
///<reference path="typings/knockout.validation/knockout.validation.d.ts" />
var Clinike;
(function (Clinike) {
    var Models;
    (function (Models) {
        class BaseModel {
            constructor(obj) {
                if (obj) {
                    this.Id = obj.Id || 0;
                    this.DateIns = obj.DateIns || new Date();
                    this.LastUpdate = obj.LastUpdate || new Date();
                }
            }
        }
        class KoBaseModel {
            constructor(obj) {
                this.Id = ko.observable();
                this.DateIns = ko.observable();
                this.LastUpdate = ko.observable();
                if (obj) {
                    this.Id(obj.Id || 0);
                    this.DateIns(obj.DateIns || new Date());
                    this.LastUpdate(obj.LastUpdate || new Date());
                }
            }
        }
        (function (PhoneType) {
            PhoneType[PhoneType["Unknown"] = -1] = "Unknown";
            PhoneType[PhoneType["Mobile"] = 0] = "Mobile";
            PhoneType[PhoneType["Residential"] = 1] = "Residential";
            PhoneType[PhoneType["Business"] = 2] = "Business";
        })(Models.PhoneType || (Models.PhoneType = {}));
        var PhoneType = Models.PhoneType;
        (function (AddressType) {
            AddressType[AddressType["Residential"] = 1] = "Residential";
            AddressType[AddressType["Commercial"] = 2] = "Commercial";
            AddressType[AddressType["Delivery"] = 3] = "Delivery";
            AddressType[AddressType["Mail"] = 4] = "Mail";
        })(Models.AddressType || (Models.AddressType = {}));
        var AddressType = Models.AddressType;
        class Address extends BaseModel {
            constructor(obj) {
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
        Models.Address = Address;
        class KoAddress extends KoBaseModel {
            constructor(obj) {
                super(obj);
                this.Street = ko.observable();
                this.Number = ko.observable();
                this.Complement = ko.observable();
                this.Neighborhood = ko.observable();
                this.ZipCode = ko.observable();
                this.City = ko.observable();
                this.State = ko.observable();
                this.AddressType = ko.observable();
                this.PersonId = ko.observable();
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
        Models.KoAddress = KoAddress;
        class KoDocumentType extends KoBaseModel {
            constructor(obj) {
                super(obj);
                this.Name = ko.observable();
                $log.verbose('ClinikeModels.KoDocumentType :: constructor [documentType]', obj);
                if (obj) {
                    this.Name(obj.Name || '');
                }
            }
        }
        Models.KoDocumentType = KoDocumentType;
        class DocumentType extends BaseModel {
            constructor(obj) {
                super(obj);
                $log.verbose('ClinikeModels.DocumentType :: constructor [documentType]', obj);
                if (obj) {
                    this.Name = obj.Name || '';
                }
            }
        }
        Models.DocumentType = DocumentType;
        class KoDocument extends KoBaseModel {
            constructor(obj) {
                super(obj);
                this.Value = ko.observable();
                this.DocumentType = ko.observable();
                this.PersonId = ko.observable();
                $log.verbose('ClinikeModels.KoDocument :: constructor [document]', obj);
                if (obj) {
                    this.Value(obj.Value || '');
                    this.DocumentType(obj.DocumentType || new DocumentType());
                    this.PersonId(obj.PersonId || 0);
                }
            }
        }
        Models.KoDocument = KoDocument;
        class Document extends BaseModel {
            constructor(obj) {
                super(obj);
                $log.verbose('ClinikeModels.Document :: constructor [document]', obj);
                if (obj) {
                    this.Value = obj.Value || '';
                    this.DocumentType = obj.DocumentType || new DocumentType();
                    this.PersonId = obj.PersonId || 0;
                }
            }
        }
        Models.Document = Document;
        class KoPhone extends KoBaseModel {
            constructor(obj) {
                super(obj);
                this.Number = ko.observable();
                this.Contact = ko.observable();
                this.PhoneType = ko.observable();
                this.AcceptSMS = ko.observable();
                this.PersonId = ko.observable();
                $log.verbose('ClinikeModels.KoPhone :: constructor | [phone] > ', obj);
                if (obj) {
                    this.Number(obj.Number || '');
                    this.Contact(obj.Contact || '');
                    this.PhoneType(obj.PhoneType || PhoneType.Unknown);
                    this.AcceptSMS(obj.AcceptSMS || false);
                    this.PersonId(obj.PersonId || 0);
                }
            }
        }
        Models.KoPhone = KoPhone;
        class Phone extends BaseModel {
            constructor(obj) {
                super(obj);
                $log.verbose('ClinikeModels.Phone :: constructor | [phone] > ', obj);
                if (obj) {
                    this.Number = obj.Number || '';
                    this.Contact = obj.Contact || '';
                    this.PhoneType = obj.PhoneType || PhoneType.Unknown;
                    this.AcceptSMS = obj.AcceptSMS || false;
                    this.PersonId = obj.PersonId || 0;
                }
            }
        }
        Models.Phone = Phone;
        class Person extends BaseModel {
            constructor(obj) {
                super(obj);
                $log.verbose('ClinikeModels.Person :: constructor [person]', obj);
                if (obj) {
                    this.Name = obj.Name || '';
                    this.Email = obj.Email || '';
                }
            }
        }
        Models.Person = Person;
        class KoPerson extends KoBaseModel {
            constructor(obj) {
                super(obj);
                this.Name = ko.observable();
                this.Email = ko.observable();
                $log.verbose('ClinikeModels.Person :: constructor [person]', obj);
                if (obj) {
                    this.Name(obj.Name || '');
                    this.Email(obj.Email || '');
                }
            }
        }
        Models.KoPerson = KoPerson;
    })(Models = Clinike.Models || (Clinike.Models = {}));
})(Clinike || (Clinike = {}));
//# sourceMappingURL=Clinike.Models.js.map