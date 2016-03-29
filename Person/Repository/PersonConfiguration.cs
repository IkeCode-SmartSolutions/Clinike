using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Infrastructure.Annotations;
using System.Data.Entity.ModelConfiguration;

namespace IkeCode.Clinike.Person.Repository
{
    public class PersonConfiguration : EntityTypeConfiguration<Person>
    {
        public PersonConfiguration()
        {
            Property(i => i.Name).HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute("IX_Person_Name")));
            Property(i => i.Email).HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute("IX_Person_Email") { IsUnique = true, IsClustered = true }));

            HasMany(i => i.Phones)
                .WithRequired(i => i.Person)
                .HasForeignKey(i => i.PersonId)
                .WillCascadeOnDelete(true);

            HasMany(i => i.Addresses)
                .WithRequired(i => i.Person)
                .HasForeignKey(i => i.PersonId);

            HasMany(i => i.Documents)
                .WithRequired(i => i.Person)
                .HasForeignKey(i => i.PersonId);
        }
    }
}
