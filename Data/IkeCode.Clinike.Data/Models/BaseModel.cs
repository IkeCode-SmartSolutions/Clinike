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
}
