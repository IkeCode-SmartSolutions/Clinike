namespace IkeCode.Clinike.Person.Migrations.Migrations
{
    using Data.Core;
    using Data.Core.Entity;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

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
              new Domain.Entities.Person { Name = "Leandro Barral", Email = "leandrobarral@outlook.com" }
            );
        }
    }
}
