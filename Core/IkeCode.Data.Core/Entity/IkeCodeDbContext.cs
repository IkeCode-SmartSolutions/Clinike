using MySql.Data.Entity;
using System;
using System.Data.Common;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;

namespace IkeCode.Data.Core.Entity
{
    public class IkeCodeDbContext : DbContext
    {
        string schemaName { get; set; }
        DatabaseType DatabaseType { get; set; }

        public IkeCodeDbContext(DatabaseType databaseType, string connectionStringName = "DefaultConnection", string schemaName = "dbo")
            : base(connectionStringName)
        {
            this.schemaName = schemaName;
            DatabaseType = databaseType;
        }

        public IkeCodeDbContext(DatabaseType databaseType, DbConnection connection, string schemaName = "dbo")
            : base(connection, true)
        {
            this.schemaName = schemaName;
            DatabaseType = databaseType;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //base.OnModelCreating(modelBuilder);

            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            if (DatabaseType == DatabaseType.MySQL)
            {
                modelBuilder.Types().Configure((cv) => cv.ToTable(cv.ClrType.Name.ToLower()));

                modelBuilder.Properties<string>()
                    .Configure(p => p.HasColumnType("longtext").IsUnicode(false));
            }
            
            modelBuilder.Properties<string>()
                .Configure(p => p.HasMaxLength(100));
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
