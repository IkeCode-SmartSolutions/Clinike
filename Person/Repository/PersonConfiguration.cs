using System;
using System.Data.Entity.ModelConfiguration;

namespace IkeCode.Clinike.Person.Repository
{
    public class PersonConfiguration : EntityTypeConfiguration<Person>
    {
        public PersonConfiguration()
        {
            HasMany(i => i.Phones)
                .WithRequired(i => i.Person)
                .HasForeignKey(i => i.PersonId)
                .WillCascadeOnDelete(true);
        }
    }
}
