using IkeCode.Clinike.Data.Enums;
using IkeCode.Clinike.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IkeCode.Clinike.Data.Interfaces
{
    public interface IDocument : IBaseModel
    {
        string Value { get; set; }
        int DocumentTypeId { get; set; }
        int PersonId { get; set; }
        DocumentType DocumentType { get; set; }
        Person Person { get; set; }
    }
}
