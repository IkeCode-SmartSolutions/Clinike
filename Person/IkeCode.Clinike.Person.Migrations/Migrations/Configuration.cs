namespace IkeCode.Clinike.Person.Migrations.Migrations
{
    using Data.Core;
    using Data.Core.Entity;
    using MySql.Data.Entity;
    using System.Data.Entity;

    [DbConfigurationType(typeof(MySqlEFConfiguration))]
    internal sealed class Configuration : IkeCodeDbMigrationsConfiguration<DataContext.PersonContext>
    {
        public Configuration()
            : base(DatabaseType.MySQL)
        {
        }

        protected override void Seed(DataContext.PersonContext context)
        {

        }
    }
}
