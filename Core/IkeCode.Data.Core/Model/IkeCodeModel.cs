using IkeCode.Core.CustomAttributes;
using IkeCode.Web.Core.Model.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Data.SqlTypes;
using System.Linq;

namespace IkeCode.Web.Core.Model
{
    public class IkeCodeModel<TObject, TContext, TKey> : IkeCodeModelEx<TObject, TContext, TKey>, IIkeCodeModel<TKey>
        where TObject : class, IIkeCodeModel<TKey>, new()
        where TContext : DbContext, new()
    {
        public IkeCodeModel()
            : base()
        {
        }

        public IkeCodeModel(string connectionStringName)
            : base(connectionStringName)
        {
        }

        public IkeCodeModel(TKey id)
            : this()
        {
            Id = id;
            //TODO codigo para pegar dateins e lastupdate do banco para preencher o objeto
        }

        public IkeCodeModel(string connectionStringName, TKey id)
            : this(id)
        {
            base.connectionStringName = connectionStringName;
        }
        
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual TKey Id { get; set; }

        [Column(TypeName = "datetime")]
        [DateTimeDatabaseGenerated]
        public DateTime DateIns { get; set; }

        [Column(TypeName = "datetime")]
        [DateTimeDatabaseGenerated]
        public DateTime LastUpdate { get; set; }

        public virtual void PrepareToDatabase()
        {
            LastUpdate = DateTime.UtcNow;

            if (DateIns <= (DateTime)SqlDateTime.MinValue)
                DateIns = DateTime.UtcNow;
        }

        public void PrepareListToDatabase(IEnumerable<IIkeCodeModel<TKey>> items)
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
