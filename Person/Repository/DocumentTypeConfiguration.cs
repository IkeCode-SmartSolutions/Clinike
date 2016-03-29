using System.Data.Entity.ModelConfiguration;

namespace IkeCode.Clinike.Person.Repository
{
    public class DocumentTypeConfiguration : EntityTypeConfiguration<DocumentType>
    {
        public DocumentTypeConfiguration()
        {
            Property(i => i.Name).HasMaxLength(50).IsRequired();

            HasMany(i => i.Documents)
                .WithRequired(i => i.DocumentType)
                .HasForeignKey(i => i.DocumentTypeId)
                .WillCascadeOnDelete(true);
        }
    }
}
