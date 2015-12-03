using IkeCode.Clinike.Data.Interfaces;
using IkeCode.Web.Core.Model;

namespace IkeCode.Clinike.Data.Models
{
    public class BaseModel<T, TInterface> : IkeCodeModel<T, ClinikeContext, int>
        where T : BaseModel<T, TInterface>, TInterface, new()
        where TInterface : IBaseModel
    {
        public BaseModel()
            : base()
        {
        }

        public BaseModel(TInterface model)
            : this()
        {
            Id = model.Id;
            DateIns = model.DateIns;
            LastUpdate = model.LastUpdate;
        }
    }
}
