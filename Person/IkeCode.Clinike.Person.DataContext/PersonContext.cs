using IkeCode.Data.Core;
using IkeCode.Data.Core.Entity;
using System.Data.Entity;

namespace IkeCode.Clinike.Person.DataContext
{
    public class PersonContext : IkeCodeDbContext
    {
        public PersonContext() 
            : base(DatabaseType.MySQL)
        {
        }

        public DbSet<Domain.Entities.Person> People { get; set; }
    }
}
