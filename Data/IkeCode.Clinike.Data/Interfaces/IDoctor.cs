using IkeCode.Clinike.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IkeCode.Clinike.Data.Interfaces
{
    public interface IDoctor: IBaseModel
    {
        DateTime AdmissionDate { get; }
        Person Person { get; }
    }
}
