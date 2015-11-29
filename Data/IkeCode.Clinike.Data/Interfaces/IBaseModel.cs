using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IkeCode.Clinike.Data.Interfaces
{
    public interface IBaseModel
    {
        int Id { get; }
        DateTime DateIns { get; }
        DateTime LastUpdate { get; }
    }
}
