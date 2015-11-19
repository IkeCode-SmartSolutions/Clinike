namespace IkeCode.Clinike.Data.Models
{
    using IkeCode.Core.CustomAttributes;
    using Newtonsoft.Json;
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [ExportToJavascript]
    public partial class Doctor : BaseModel<Doctor>
    {
        public Doctor()
            : base()
        {
        }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public override int Id { get; set; }

        [Column(TypeName = "date")]
        [Display(Name="Data de Admissão")]
        public DateTime AdmissionDate { get; set; }

        [JsonIgnore]
        public virtual Person Person { get; set; }
    }
}
