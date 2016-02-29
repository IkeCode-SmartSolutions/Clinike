using IkeCode.Data.Core;
using IkeCode.Data.Core.Entity;
using MySql.Data.Entity;
using System.Data.Entity;

namespace IkeCode.Clinike.Person.DataContext
{
    [DbConfigurationType(typeof(MySqlEFConfiguration))]
    public class PersonContext : IkeCodeDbContext
    {
        public PersonContext() 
            : base(DatabaseType.MySQL)
        {
        }

        public DbSet<Repository.Person> People { get; set; }
    }
}
