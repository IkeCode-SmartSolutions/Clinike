using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IkeCode.Data.Core.Model.Interfaces
{
    public interface IIkeCodePaged
    {
        int TotalCount { get; }
        int Offset { get; }
        int Limit { get; }
    }
}
