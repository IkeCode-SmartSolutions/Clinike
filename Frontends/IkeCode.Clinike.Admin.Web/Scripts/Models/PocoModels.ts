// Interfaces
interface IAddress {
    Street: string;
    Number: string;
    Complement: string;
    Neighborhood: string;
    ZipCode: string;
    City: string;
    State: string;
    AddressType: any;
    AddressTypeId: number;
    PersonId: number;
    Person: Object;
    Id: number;
    DateIns: Date;
    LastUpdate: Date;
}

interface IDoctor {
    Id: number;
    AdmissionDate: Date;
    Person: Object;
    DateIns: Date;
    LastUpdate: Date;
}

interface IDocument {
    Value: string;
    DocumentTypeId: number;
    PersonId: number;
    DocumentType: Object;
    Person: Object;
    Id: number;
    DateIns: Date;
    LastUpdate: Date;
}

interface ILegalPerson {
    Id: number;
    SocialName: string;
    CompanyName: string;
    Person: Object;
    DateIns: Date;
    LastUpdate: Date;
}

interface INaturalPerson {
    Id: number;
    Gender: any;
    Birthdate: Date;
    Person: Object;
    DateIns: Date;
    LastUpdate: Date;
}

interface IPerson {
    Name: string;
    Email: string;
    ProfileImage: Object;
    ProfileImageUrl: string;
    Doctor: Object;
    LegalPerson: Object;
    NaturalPerson: Object;
    Addresses: Array<Address>;
    Documents: Array<Document>;
    Phones: Array<Phone>;
    Id: number;
    DateIns: Date;
    LastUpdate: Date;
}

interface IPhone {
    Number: string;
    PhoneType: any;
    PersonId: number;
    Person: Object;
    Id: number;
    DateIns: Date;
    LastUpdate: Date;
}

// Classes
class AddressPoco {
    rowData: IAddress;

    Street = ko.observable();
    Number = ko.observable();
    Complement = ko.observable();
    Neighborhood = ko.observable();
    ZipCode = ko.observable();
    City = ko.observable();
    State = ko.observable();
    AddressType = ko.observable();
    AddressTypeId = ko.observable();
    PersonId = ko.observable();
    Person = ko.observable();
    Id = ko.observable();
    DateIns = ko.observable();
    LastUpdate = ko.observable();

	constructor(data?: IAddress) {
		if(data) {
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

    toJSON():IAddress {
        var _js = ko.mapping.toJSON(this);
        return _js;
    }

    Update(data: IAddress) {
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
    }
}

class DoctorPoco {
    rowData: IDoctor;

    Id = ko.observable();
    AdmissionDate = ko.observable();
    Person = ko.observable();
    DateIns = ko.observable();
    LastUpdate = ko.observable();

	constructor(data?: IDoctor) {
		if(data) {
			this.rowData = data;
			this.Id = ko.observable(data.Id);
			this.AdmissionDate = ko.observable(data.AdmissionDate);
			this.Person = ko.observable(data.Person);
			this.DateIns = ko.observable(data.DateIns);
			this.LastUpdate = ko.observable(data.LastUpdate);
		}
	}

    toJSON():IDoctor {
        var _js = ko.mapping.toJSON(this);
        return _js;
    }

    Update(data: IDoctor) {
        this.rowData = data;
        this.Id(data.Id);
        this.AdmissionDate(data.AdmissionDate);
        this.Person(data.Person);
        this.DateIns(data.DateIns);
        this.LastUpdate(data.LastUpdate);
    }
}

class DocumentPoco {
    rowData: IDocument;

    Value = ko.observable();
    DocumentTypeId = ko.observable();
    PersonId = ko.observable();
    DocumentType = ko.observable();
    Person = ko.observable();
    Id = ko.observable();
    DateIns = ko.observable();
    LastUpdate = ko.observable();

	constructor(data?: IDocument) {
		if(data) {
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

    toJSON():IDocument {
        var _js = ko.mapping.toJSON(this);
        return _js;
    }

    Update(data: IDocument) {
        this.rowData = data;
        this.Value(data.Value);
        this.DocumentTypeId(data.DocumentTypeId);
        this.PersonId(data.PersonId);
        this.DocumentType(data.DocumentType);
        this.Person(data.Person);
        this.Id(data.Id);
        this.DateIns(data.DateIns);
        this.LastUpdate(data.LastUpdate);
    }
}

class LegalPersonPoco {
    rowData: ILegalPerson;

    Id = ko.observable();
    SocialName = ko.observable();
    CompanyName = ko.observable();
    Person = ko.observable();
    DateIns = ko.observable();
    LastUpdate = ko.observable();

	constructor(data?: ILegalPerson) {
		if(data) {
			this.rowData = data;
			this.Id = ko.observable(data.Id);
			this.SocialName = ko.observable(data.SocialName);
			this.CompanyName = ko.observable(data.CompanyName);
			this.Person = ko.observable(data.Person);
			this.DateIns = ko.observable(data.DateIns);
			this.LastUpdate = ko.observable(data.LastUpdate);
		}
	}

    toJSON():ILegalPerson {
        var _js = ko.mapping.toJSON(this);
        return _js;
    }

    Update(data: ILegalPerson) {
        this.rowData = data;
        this.Id(data.Id);
        this.SocialName(data.SocialName);
        this.CompanyName(data.CompanyName);
        this.Person(data.Person);
        this.DateIns(data.DateIns);
        this.LastUpdate(data.LastUpdate);
    }
}

class NaturalPersonPoco {
    rowData: INaturalPerson;

    Id = ko.observable();
    Gender = ko.observable();
    Birthdate = ko.observable();
    Person = ko.observable();
    DateIns = ko.observable();
    LastUpdate = ko.observable();

	constructor(data?: INaturalPerson) {
		if(data) {
			this.rowData = data;
			this.Id = ko.observable(data.Id);
			this.Gender = ko.observable(data.Gender);
			this.Birthdate = ko.observable(data.Birthdate);
			this.Person = ko.observable(data.Person);
			this.DateIns = ko.observable(data.DateIns);
			this.LastUpdate = ko.observable(data.LastUpdate);
		}
	}

    toJSON():INaturalPerson {
        var _js = ko.mapping.toJSON(this);
        return _js;
    }

    Update(data: INaturalPerson) {
        this.rowData = data;
        this.Id(data.Id);
        this.Gender(data.Gender);
        this.Birthdate(data.Birthdate);
        this.Person(data.Person);
        this.DateIns(data.DateIns);
        this.LastUpdate(data.LastUpdate);
    }
}

class PersonPoco {
    rowData: IPerson;

    Name = ko.observable();
    Email = ko.observable();
    ProfileImage = ko.observable();
    ProfileImageUrl = ko.observable();
    Doctor = ko.observable();
    LegalPerson = ko.observable();
    NaturalPerson = ko.observable();
    Addresses = ko.observableArray();
    Documents = ko.observableArray();
    Phones = ko.observableArray();
    Id = ko.observable();
    DateIns = ko.observable();
    LastUpdate = ko.observable();

	constructor(data?: IPerson) {
		if(data) {
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

    toJSON():IPerson {
        var _js = ko.mapping.toJSON(this);
        return _js;
    }

    Update(data: IPerson) {
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
    }
}

class PhonePoco {
    rowData: IPhone;

    Number = ko.observable();
    PhoneType = ko.observable();
    PersonId = ko.observable();
    Person = ko.observable();
    Id = ko.observable();
    DateIns = ko.observable();
    LastUpdate = ko.observable();

	constructor(data?: IPhone) {
		if(data) {
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

    toJSON():IPhone {
        var _js = ko.mapping.toJSON(this);
        return _js;
    }

    Update(data: IPhone) {
        this.rowData = data;
        this.Number(data.Number);
        this.PhoneType(data.PhoneType);
        this.PersonId(data.PersonId);
        this.Person(data.Person);
        this.Id(data.Id);
        this.DateIns(data.DateIns);
        this.LastUpdate(data.LastUpdate);
    }
}

