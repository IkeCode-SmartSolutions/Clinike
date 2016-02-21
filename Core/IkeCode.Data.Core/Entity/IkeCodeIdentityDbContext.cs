using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Common;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace IkeCode.Data.Core.Entity
{
    public class IkeCodeIdentityDbContext<TUser> : IdentityDbContext<TUser>
        where TUser : IdentityUser
    {
        string schemaName { get; set; }

        public IkeCodeIdentityDbContext(string connectionStringName = "DefaultConnection", 
                                        string schemaName = "dbo") 
            : base(connectionStringName)
        {
            this.schemaName = schemaName;
        }

        public IkeCodeIdentityDbContext(DbConnection connection,
                                        string schemaName = "dbo")
            : base(connection, true)
        {
            this.schemaName = schemaName;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}
