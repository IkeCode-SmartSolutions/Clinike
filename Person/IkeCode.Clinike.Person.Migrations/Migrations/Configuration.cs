namespace IkeCode.Clinike.Person.Migrations.Migrations
{
    using System.Data.Entity.Migrations;

    internal sealed class Configuration : DbMigrationsConfiguration<IkeCode.Clinike.DataContext.ClinikeContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(IkeCode.Clinike.DataContext.ClinikeContext context)
        {
            
        }
    }
}
