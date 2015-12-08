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

        public override void PrepareToDatabase()
        {
            base.PrepareToDatabase();

            if (Person == null || (Person != null && Person.Id == 0)){
                throw new ArgumentException("Person must to be present in order to make the relashionship");
            }

            if (Id == 0 && Person != null && Person.Id > 0)
            {
                Id = Person.Id;
            }
        }
    }
}
