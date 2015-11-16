namespace IkeCode.Clinike.Data.Models
{
    using IkeCode.Clinike.Data.Enums;
    using IkeCode.Web.Core.CustomAttributes;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;
    using System.ComponentModel.DataAnnotations;
    using System.Text.RegularExpressions;

    [ExportToJavascript]
    public partial class Phone : BaseModel<Phone>
    {
        public Phone()
            : base()
        {
        }

        public Phone(Phone model)
            : base(model)
        {
            Number = model.Number;
            PhoneType = model.PhoneType;
            PersonId = model.PersonId;
        }

        [Required]
        [StringLength(30)]
        public string Number { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public PhoneType PhoneType { get; set; }

        public int PersonId { get; set; }

        [JsonIgnore]
        public virtual Person Person { get; set; }

        public override void PrepareToDatabase()
        {
            base.PrepareToDatabase();
            Number = Regex.Replace(Number, @"[^\d]", "");
        }
    }
}
