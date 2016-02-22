using MySql.Data.Entity;
using System.Data.Entity;
using System.Data.Entity.Migrations;

namespace IkeCode.Data.Core.Entity
{
    public class IkeCodeDbMigrationsConfiguration<TContext> : DbMigrationsConfiguration<TContext>
        where TContext : DbContext
    {
        private DatabaseType DatabaseType { get; set; }

        public IkeCodeDbMigrationsConfiguration(DatabaseType databaseType)
            : base()
        {
            DatabaseType = databaseType;

            AutomaticMigrationsEnabled = false;

            DbConfiguration.Loaded += DbConfiguration_Loaded;

            if (databaseType == DatabaseType.MySQL)
            {
                SetSqlGenerator("MySql.Data.MySqlClient", new MySqlMigrationSqlGenerator());
                SetHistoryContextFactory("MySql.Data.MySqlClient", (conn, schema) => new MySqlHistoryContext(conn, schema));
                DbConfiguration.SetConfiguration(new MySqlEFConfiguration());
            }
        }

        private void DbConfiguration_Loaded(object sender, System.Data.Entity.Infrastructure.DependencyResolution.DbConfigurationLoadedEventArgs e)
        {
            if (DatabaseType == DatabaseType.MySQL)
            {
                e.AddDependencyResolver(new MySqlDependencyResolver(), true);
            }
        }
    }
}
