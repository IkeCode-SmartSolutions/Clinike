using IkeCode.Clinike.Data.Interfaces;
using IkeCode.Web.Core.Model;

namespace IkeCode.Clinike.Data.Models
{
    public class BaseModel<T> : IkeCodeModelEx<T, ClinikeContext>
        where T : IkeCodeModel<T, ClinikeContext>, new()
    {
        protected BaseModel()
            : base()
        {
        }

        protected BaseModel(T model)
            : this()
        {
            Id = model.Id;
            DateIns = model.DateIns;
            LastUpdate = model.LastUpdate;
        }
    }

    public class BaseModel<T, TInterface> : IkeCodeModelEx<T, ClinikeContext>
        where T : IkeCodeModel<T, ClinikeContext>, TInterface, new()
        where TInterface : IBaseModel
    {
        protected BaseModel()
            : base()
        {
        }

        public BaseModel(T model)
            : this()
        {
            Id = model.Id;
            DateIns = model.DateIns;
            LastUpdate = model.LastUpdate;
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
