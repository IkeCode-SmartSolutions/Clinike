namespace IkeCode.Clinike.Data.Models
{
    using IkeCode.Clinike.Data.Enums;
    using IkeCode.Clinike.Data.Interfaces;
    using IkeCode.Core.CustomAttributes;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Text.RegularExpressions;

    [ExportToJavascript]
    public partial class Address : BaseModel<Address, IAddress>, IAddress
    {
        public Address()
            : base()
        {
        }

        [Required(ErrorMessage = "Campo {display} é obrigatório")]
        [Display(Name = "Endereço")]
        [StringLength(250)]
        public string Street { get; set; }

        [Required]
        [StringLength(10)]
        public string Number { get; set; }

        [StringLength(50)]
        public string Complement { get; set; }

        [Required]
        [StringLength(100)]
        public string Neighborhood { get; set; }

        [Required]
        [StringLength(20)]
        public string ZipCode { get; set; }

        [Required]
        [StringLength(150)]
        public string City { get; set; }

        [Required]
        [StringLength(2)]
        public string State { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public AddressType AddressType { get; set; }

        [NotMapped]
        [ExportToJavascript]
        public int AddressTypeId
        {
            get { return (int)AddressType; }
            set { AddressType = (AddressType)value; }
        }

        public int PersonId { get; set; }

        [JsonIgnore]
        public virtual Person Person { get; set; }

        public override void PrepareToDatabase()
        {
            base.PrepareToDatabase();
            ZipCode = Regex.Replace(ZipCode, @"[^\d]", "");
            State = State.ToUpper();
        }
    }
}
