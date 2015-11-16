namespace IkeCode.Clinike.Data.Models
{
    using IkeCode.Web.Core.CustomAttributes;
    using Newtonsoft.Json;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [ExportToJavascript]
    public partial class LegalPerson : BaseModel<LegalPerson>
    {
        public LegalPerson()
            : base()
        {
        }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public override int Id { get; set; }

        [Required]
        [StringLength(250)]
        [Display(Name="Nome Fantasia")]
        public string SocialName { get; set; }

        [Required]
        [StringLength(250)]
        [Display(Name = "Raz�o Social")]
        public string CompanyName { get; set; }

        [JsonIgnore]
        public virtual Person Person { get; set; }
    }
}
