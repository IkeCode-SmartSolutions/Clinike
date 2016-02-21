using System;

namespace IkeCode.Data.Core.Model.Interfaces
{
    public interface IIkeCodeBaseModel<TKey>
    {
        TKey Id { get; }
    }
}
