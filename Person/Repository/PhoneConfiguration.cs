using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Infrastructure.Annotations;
using System.Data.Entity.ModelConfiguration;

namespace IkeCode.Clinike.Person.Repository
{
    public class PhoneConfiguration : EntityTypeConfiguration<Phone>
    {
        public PhoneConfiguration()
        {
            Property(i => i.Number).HasMaxLength(30).IsRequired();
            Property(i => i.Contact).HasMaxLength(90).IsOptional();
            Property(i => i.AcceptSMS).IsOptional();
            Property(i => i.Number).HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute("IX_Phone_Number_PhoneType") { IsUnique = true, IsClustered = true, Order = 1 }));
            Property(i => i.PhoneType).HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute("IX_Phone_Number_PhoneType") { IsUnique = true, IsClustered = true, Order = 2 }));
        }
    }
}
