using MySql.Data.Entity;
using System;
using System.Data.Common;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace IkeCode.Data.Core.Entity
{
    public class IkeCodeDbContext : DbContext
    {
        DatabaseType DatabaseType { get; set; }

        public IkeCodeDbContext(DatabaseType databaseType, string connectionStringName = "DefaultConnection")
            : base(connectionStringName)
        {
            DatabaseType = databaseType;
        }

        public IkeCodeDbContext(DatabaseType databaseType, DbConnection connection)
            : base(connection, true)
        {
            DatabaseType = databaseType;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            var typesToRegister = Assembly.GetExecutingAssembly().GetTypes()
                                    .Where(type => !string.IsNullOrEmpty(type.Namespace))
                                    .Where(type => type.BaseType != null
                                            && type.BaseType.IsGenericType
                                            && type.BaseType.GetGenericTypeDefinition() == typeof(EntityTypeConfiguration<>));

            foreach (var type in typesToRegister)
            {
                dynamic configurationInstance = Activator.CreateInstance(type);
                modelBuilder.Configurations.Add(configurationInstance);
            }

            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            if (DatabaseType == DatabaseType.MySQL)
            {
                modelBuilder.Types().Configure((cv) => cv.ToTable(cv.ClrType.Name.ToLower()));

                modelBuilder.Properties<string>().Configure(p => p.HasColumnType("varchar").HasMaxLength(250).IsUnicode(false));
            }

            base.OnModelCreating(modelBuilder);
        }

        public override Task<int> SaveChangesAsync()
        {
            InternalSaveChanges();

            return base.SaveChangesAsync();
        }

        public override int SaveChanges()
        {
            InternalSaveChanges();

            return base.SaveChanges();
        }

        private void InternalSaveChanges()
        {
            foreach (var entry in ChangeTracker.Entries().Where(entry => entry.Entity.GetType().GetProperty("DateIns") != null))
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Property("DateIns").CurrentValue = DateTime.UtcNow;
                }
                else if (entry.State == EntityState.Modified)
                {
                    entry.Property("DateIns").IsModified = false;
                }
            }

            foreach (var entry in ChangeTracker.Entries().Where(entry => entry.Entity.GetType().GetProperty("LastUpdate") != null))
            {
                if (entry.State != EntityState.Deleted)
                {
                    entry.Property("LastUpdate").CurrentValue = DateTime.UtcNow;
                }
            }
        }
    }
}
