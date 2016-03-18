using IkeCode.Core.CustomAttributes;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IkeCode.Data.Core.Model
{
    public class IkeCodeModel<TKey> : IIkeCodeModel<TKey>
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual TKey Id { get; set; }

        [Column(TypeName = "datetime")]
        [DateTimeDatabaseGenerated]
        public DateTime DateIns { get; set; }

        [Column(TypeName = "datetime")]
        [DateTimeDatabaseGenerated]
        public DateTime LastUpdate { get; set; }
    }
}
