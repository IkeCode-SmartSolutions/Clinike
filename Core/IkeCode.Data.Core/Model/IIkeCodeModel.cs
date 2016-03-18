using System;
using System.Collections.Generic;

namespace IkeCode.Data.Core.Model
{
    public interface IIkeCodeModel<TKey> : IIkeCodeBaseModel<TKey>
    {
        DateTime DateIns { get; }
        DateTime LastUpdate { get; }
    }
}
