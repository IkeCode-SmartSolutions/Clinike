namespace IkeCode.Clinike.Data.Models
{
    using IkeCode.Core.CustomAttributes;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Web;

    [ExportToJavascript]
    public partial class Person : BaseModel<Person>
    {
        public Person()
            : base()
        {
            Addresses = new HashSet<Address>();
            Documents = new HashSet<Document>();
            Phones = new HashSet<Phone>();
        }

        [Required]
        [StringLength(250)]
        [Display(Name = "Nome")]
        public string Name { get; set; }

        [Required]
        [StringLength(250)]
        public string Email { get; set; }

        public string ProfileImageUrl { get; set; }

        public virtual Doctor Doctor { get; set; }

        public virtual LegalPerson LegalPerson { get; set; }

        public virtual NaturalPerson NaturalPerson { get; set; }

        public virtual ICollection<Address> Addresses { get; set; }

        public virtual ICollection<Document> Documents { get; set; }

        public virtual ICollection<Phone> Phones { get; set; }

        public override void PrepareToDatabase()
        {
            base.PrepareToDatabase();

            Doctor.PrepareToDatabase();
            LegalPerson.PrepareToDatabase();
            NaturalPerson.PrepareToDatabase();

            PrepareListToDatabase(Phones);
            PrepareListToDatabase(Addresses);
            PrepareListToDatabase(Documents);
        }
    }
}
