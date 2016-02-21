using System;

namespace IkeCode.Web.Core.Model.Interfaces
{
    public interface IIkeCodeModel<TKey> : IIkeCodeBaseModel<TKey>
    {
        DateTime DateIns { get; }
        DateTime LastUpdate { get; }

        void PrepareToDatabase();
    }
}
