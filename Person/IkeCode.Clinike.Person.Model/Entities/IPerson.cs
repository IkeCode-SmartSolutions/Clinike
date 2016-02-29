using IkeCode.Data.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IkeCode.Clinike.Person.Domain.Entities
{
    public interface IPerson : IIkeCodeModel<int>
    {
        string Name { get; }
        string Email { get; }
    }
}
