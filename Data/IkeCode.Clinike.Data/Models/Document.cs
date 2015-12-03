namespace IkeCode.Clinike.Data.Models
{
    using IkeCode.Clinike.Data.Interfaces;
    using IkeCode.Core.CustomAttributes;
    using Newtonsoft.Json;
    using System.ComponentModel.DataAnnotations;

    [ExportToJavascript]
    public partial class Document : BaseModel<Document, IDocument>, IDocument
    {
        public Document()
            : base()
        {

        }

        [Required]
        [StringLength(30)]
        public string Value { get; set; }

        public int DocumentTypeId { get; set; }

        public int PersonId { get; set; }

        public virtual DocumentType DocumentType { get; set; }

        [JsonIgnore]
        public virtual Person Person { get; set; }
    }
}
