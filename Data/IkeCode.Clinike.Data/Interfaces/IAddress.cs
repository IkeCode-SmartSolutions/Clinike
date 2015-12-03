using IkeCode.Clinike.Data.Enums;
using IkeCode.Clinike.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IkeCode.Clinike.Data.Interfaces
{
    public interface IAddress : IBaseModel
    {
        string Street { get; set; }
        string Number { get; set; }
        string Complement { get; set; }
        string Neighborhood { get; set; }
        string ZipCode { get; set; }
        string City { get; set; }
        string State { get; set; }
        AddressType AddressType { get; set; }
        int AddressTypeId { get; set; }
        int PersonId { get; set; }
        Person Person { get; set; }
    }
}
