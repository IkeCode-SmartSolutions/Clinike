using System;

namespace IkeCode.Data.Core.Model.Interfaces
{
    public interface IIkeCodeModel<TKey> : IIkeCodeBaseModel<TKey>
    {
        DateTime DateIns { get; }
        DateTime LastUpdate { get; }

        void PrepareToDatabase();
    }
}
