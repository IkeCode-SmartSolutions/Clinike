using System.Data.Common;
using System.Data.Entity;

namespace IkeCode.Data.Core.Entity
{
    public class IkeCodeDbContext : DbContext
    {
        string schemaName { get; set; }

        public IkeCodeDbContext(string connectionStringName = "DefaultConnection", string schemaName = "dbo") 
            : base(connectionStringName)
        {
            this.schemaName = schemaName;
        }

        public IkeCodeDbContext(DbConnection connection, string schemaName = "dbo")
            : base(connection, true)
        {
            this.schemaName = schemaName;
        }
    }
}
