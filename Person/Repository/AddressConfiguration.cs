using System.Data.Entity.ModelConfiguration;

namespace IkeCode.Clinike.Person.Repository
{
    public class AddressConfiguration : EntityTypeConfiguration<Address>
    {
        public AddressConfiguration()
        {
            Property(i => i.Number).HasMaxLength(10).IsRequired();
            Property(i => i.Street).HasMaxLength(250).IsRequired();
            Property(i => i.Neighborhood).HasMaxLength(100).IsRequired();
            Property(i => i.ZipCode).HasMaxLength(20).IsRequired();
            Property(i => i.City).HasMaxLength(150).IsRequired();
            Property(i => i.State).HasMaxLength(2).IsRequired();
        }
    }
}
