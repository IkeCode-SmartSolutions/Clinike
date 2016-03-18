using MySql.Data.Entity;
using System.Data.Common;
using System.Data.Entity;
using System.Data.Entity.Migrations.History;

namespace IkeCode.Data.Core.Entity
{
    public class IkeCodeMySqlHistoryContext : HistoryContext
    {
        public IkeCodeMySqlHistoryContext(DbConnection existingConnection, string defaultSchema)
            : base(existingConnection, defaultSchema)
        {
            DbConfiguration.SetConfiguration(new MySqlEFConfiguration());
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Properties<string>().Configure(i => i.HasColumnType("varchar"));
            modelBuilder.Entity<HistoryRow>().Property(h => h.MigrationId).HasMaxLength(100).IsRequired();
            modelBuilder.Entity<HistoryRow>().Property(h => h.ContextKey).HasMaxLength(200).IsRequired();
        }
    }
}
