using System;

namespace IkeCode.Web.Core.Model.Interfaces
{
    public interface IIkeCodeModel
    {
        int Id { get; set; }
        DateTime DateIns { get; set; }
        DateTime LastUpdate { get; set; }

        void PrepareToDatabase();
    }
}
