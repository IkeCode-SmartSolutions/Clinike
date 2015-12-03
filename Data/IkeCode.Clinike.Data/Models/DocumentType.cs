namespace IkeCode.Clinike.Data.Models
{
    using IkeCode.Clinike.Data.Interfaces;
    using Newtonsoft.Json;
    using System.ComponentModel.DataAnnotations;

    public partial class DocumentType : BaseModel<DocumentType, IDocumentType>, IDocumentType
    {
        public DocumentType()
            : base()
        {

        }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }
    }
}
