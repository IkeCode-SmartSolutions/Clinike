namespace IkeCode.Clinike.Data.Models
{
    using Interfaces;
    using IkeCode.Core.CustomAttributes;
    using Newtonsoft.Json;
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [ExportToJavascript]
    [JsonObject(IsReference = true)]
    public partial class Doctor : BaseModel<Doctor, IDoctor>, IDoctor
    {
        public Doctor()
        {
        }

        public Doctor(IDoctor doctor)
        {
        }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public override int Id { get; set; }

        [Column(TypeName = "date")]
        [Display(Name = "Data de Admissão")]
        public DateTime AdmissionDate { get; set; }

        public virtual Person Person { get; set; }
    }
}
