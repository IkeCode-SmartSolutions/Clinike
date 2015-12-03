namespace IkeCode.Clinike.Data.Models
{
    using IkeCode.Clinike.Data.Enums;
    using IkeCode.Clinike.Data.Interfaces;
    using IkeCode.Core.CustomAttributes;
    using Newtonsoft.Json;
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [ExportToJavascript]
    public partial class NaturalPerson : BaseModel<NaturalPerson, INaturalPerson>, INaturalPerson
    {
        public NaturalPerson()
            : base()
        {
        }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public override int Id { get; set; }

        [Display(Name="Sexo")]
        public Gender Gender { get; set; }

        [Display(Name = "Data de Nascimento")]
        public DateTime Birthdate { get; set; }

        [JsonIgnore]
        public virtual Person Person { get; set; }
    }
}
