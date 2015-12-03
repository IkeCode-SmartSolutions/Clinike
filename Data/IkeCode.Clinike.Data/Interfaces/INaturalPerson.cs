using IkeCode.Clinike.Data.Enums;
using IkeCode.Clinike.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IkeCode.Clinike.Data.Interfaces
{
    public interface INaturalPerson : IBaseModel
    {
        Gender Gender { get; set; }
        DateTime Birthdate { get; set; }
        Person Person { get; set; }
    }
}
