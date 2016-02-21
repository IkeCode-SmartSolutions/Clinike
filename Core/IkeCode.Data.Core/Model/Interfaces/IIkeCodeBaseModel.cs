using System;

namespace IkeCode.Web.Core.Model.Interfaces
{
    public interface IIkeCodeBaseModel<TKey>
    {
        TKey Id { get; }
    }
}
