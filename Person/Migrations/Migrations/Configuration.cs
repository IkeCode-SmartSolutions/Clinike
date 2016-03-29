namespace IkeCode.Clinike.Person.Migrations.Migrations
{
    using Data.Core;
    using Data.Core.Entity;
    using Domain.Enums;
    using System.Collections.Generic;
    using System.Data.Entity.Migrations;

    internal sealed class Configuration : IkeCodeDbMigrationsConfiguration<DataContext.PersonContext>
    {
        public Configuration()
            : base(DatabaseType.MySQL)
        {
        }

        protected override void Seed(DataContext.PersonContext context)
        {
            context.People.AddOrUpdate(
              p => p.Email,
              new Repository.Person
              {
                  Name = "Leandro Barral",
                  Email = "leandrobarral@outlook.com",
                  Phones = new List<Repository.Phone>
                  {
                      new Repository.Phone { AcceptSMS = true, Contact = "Contato 1", Number = "+55 11 12345-6789", PhoneType = PhoneType.Mobile },
                      new Repository.Phone { AcceptSMS = false, Contact = "Contato 2", Number = "+55 11 9876-5432", PhoneType = PhoneType.Residential },
                      new Repository.Phone { AcceptSMS = false, Number = "+55 11 9876-5432", PhoneType = PhoneType.Business }
                  },
                  Addresses = new List<Repository.Address>
                  {
                      new Repository.Address() { Street = "Rua Residential 1", Number = "123", Complement = "Complemento 1", Neighborhood = "Bairro 1", City = "São Paulo", State = "SP", ZipCode = "12345678", AddressType = AddressType.Residential },
                      new Repository.Address() { Street = "Rua Commercial 1", Number = "456", Complement = "Complemento 2", Neighborhood = "Bairro 2", City = "Caçapava", State = "SP", ZipCode = "12345678", AddressType = AddressType.Commercial },
                      new Repository.Address() { Street = "Rua Delivery 1", Number = "789", Complement = "Complemento 3", Neighborhood = "Bairro 3", City = "Osasco", State = "SP", ZipCode = "12345678", AddressType = AddressType.Delivery },
                      new Repository.Address() { Street = "Rua Mail 1", Number = "666", Complement = "Complemento 4", Neighborhood = "Bairro 4", City = "Alphaville", State = "SP", ZipCode = "12345678", AddressType = AddressType.Mail },
                  }
              }
            );
        }
    }
}
