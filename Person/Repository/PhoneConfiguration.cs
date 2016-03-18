using System;
using System.Data.Entity.ModelConfiguration;

namespace IkeCode.Clinike.Person.Repository
{
    public class PhoneConfiguration : EntityTypeConfiguration<Phone>
    {
        public PhoneConfiguration()
        {
            Property(i => i.Number).HasMaxLength(30).IsRequired();
            Property(i => i.Contact).HasMaxLength(90).IsRequired();
            Property(i => i.AcceptSMS).IsOptional();
        }
    }
}
