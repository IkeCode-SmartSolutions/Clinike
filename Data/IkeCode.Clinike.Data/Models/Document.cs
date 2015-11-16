namespace IkeCode.Clinike.Data.Models
{
    using IkeCode.Web.Core.CustomAttributes;
    using Newtonsoft.Json;
    using System.ComponentModel.DataAnnotations;

    [ExportToJavascript]
    public partial class Document : BaseModel<Document>
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

        [JsonProperty(IsReference = true, ItemReferenceLoopHandling = ReferenceLoopHandling.Ignore)]
        public virtual DocumentType DocumentType { get; set; }

        [JsonIgnore]
        public virtual Person Person { get; set; }
    }
}
