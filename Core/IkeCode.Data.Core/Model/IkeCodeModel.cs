using IkeCode.Web.Core.Model.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Data.SqlTypes;
using System.Linq;

namespace IkeCode.Web.Core.Model
{
    public class IkeCodeModel<TObject, TContext> : IkeCodeEntityBaseModelEx<TObject, TContext, int>, IIkeCodeModel
        where TObject : class, new()
        where TContext : DbContext, new()
    {
        public IkeCodeModel()
            : base()
        {
        }

        public IkeCodeModel(string connectionStringName)
            : base(connectionStringName)
        {
            base.connectionStringName = connectionStringName;
        }

        public IkeCodeModel(int id)
            : this()
        {
            Id = id;
            //TODO codigo para pegar dateins e lastupdate do banco para preencher o objeto
        }

        public IkeCodeModel(string connectionStringName, int id)
            : this(id)
        {
            base.connectionStringName = connectionStringName;
        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int Id { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime DateIns { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime LastUpdate { get; set; }

        public virtual void PrepareToDatabase()
        {
            LastUpdate = DateTime.UtcNow;

            if (Id == 0 || DateIns <= (DateTime)SqlDateTime.MinValue)
                DateIns = DateTime.UtcNow;
        }

        public void PrepareListToDatabase(IEnumerable<IIkeCodeModel> items)
        {
            if (items != null && items.Count() > 0)
            {
                foreach (var item in items)
                {
                    item.PrepareToDatabase();
                }
            }
        }
    }
}
