using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Infrastructure.Annotations;
using System.Data.Entity.ModelConfiguration;

namespace IkeCode.Clinike.Person.Repository
{
    public class DocumentConfiguration : EntityTypeConfiguration<Document>
    {
        public DocumentConfiguration()
        {
            Property(i => i.Value).HasMaxLength(50).IsRequired();

            HasRequired(i => i.DocumentType)
                .WithMany(i => i.Documents)
                .HasForeignKey(i => i.DocumentTypeId)
                .WillCascadeOnDelete(true);

            Property(i => i.Value).HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute("IX_Document_Value") { IsClustered = true, Order = 1 }));

            Property(i => i.Value).HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute("IX_Document_Value_DocumentType") { IsUnique = true, Order = 1 }));
            Property(i => i.DocumentTypeId).HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute("IX_Document_Value_DocumentType") { IsUnique = true, Order = 2 }));
        }
    }
}
