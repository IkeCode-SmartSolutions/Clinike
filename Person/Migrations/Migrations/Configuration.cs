namespace IkeCode.Clinike.Person.Migrations.Migrations
{
    using Data.Core;
    using Data.Core.Entity;
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
                      new Repository.Phone { AcceptSMS = true, Contact = "Contato 1", Number = "+55 11 12345-6789" },
                      new Repository.Phone { AcceptSMS = false, Contact = "Contato 2", Number = "+55 11 9876-5432" }
                  }
              }
            );
        }
    }
}
