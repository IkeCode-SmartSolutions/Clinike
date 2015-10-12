namespace IkeCode.Clinike.Data.Models
{
    using Newtonsoft.Json;
    using System.ComponentModel.DataAnnotations;

    public partial class DocumentType : BaseModel<DocumentType>
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
