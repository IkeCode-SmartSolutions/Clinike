using IkeCode.Clinike.Data.Enums;
using IkeCode.Clinike.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IkeCode.Clinike.Data.Interfaces
{
    public interface ILegalPerson : IBaseModel
    {
        string SocialName { get; set; }
        string CompanyName { get; set; }
        Person Person { get; set; }
    }
}
