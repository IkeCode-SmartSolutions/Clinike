using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Linq;
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

        public override int SaveChanges()
        {
            foreach (var entry in ChangeTracker.Entries().Where(entry => entry.Entity.GetType().GetProperty("DateIns") != null))
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Property("DateIns").CurrentValue = DateTime.UtcNow;
                }

                if (entry.State == EntityState.Modified)
                {
                    entry.Property("DateIns").IsModified = false;
                }
            }

            foreach (var entry in ChangeTracker.Entries().Where(entry => entry.Entity.GetType().GetProperty("LastUpdate") != null))
            {
                entry.Property("LastUpdate").CurrentValue = DateTime.UtcNow;
            }

            return base.SaveChanges();
        }
    }
}
