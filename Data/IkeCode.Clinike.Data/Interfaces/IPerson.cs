using IkeCode.Clinike.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IkeCode.Clinike.Data.Interfaces
{
    public interface IPerson : IBaseModel
    {
        string Name { get; set; }
        string Email { get; set; }
        string ProfileImageUrl { get; set; }
        Doctor Doctor { get; set; }
        LegalPerson LegalPerson { get; set; }
        NaturalPerson NaturalPerson { get; set; }
        ICollection<Address> Addresses { get; set; }
        ICollection<Document> Documents { get; set; }
        ICollection<Phone> Phones { get; set; }
    }
}
