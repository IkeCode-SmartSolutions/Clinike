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
            
            if (databaseType == DatabaseType.MySQL)
            {
                DbConfiguration.SetConfiguration(new MySqlEFConfiguration());
                SetSqlGenerator("MySql.Data.MySqlClient", new MySqlMigrationSqlGenerator());
                SetHistoryContextFactory("MySql.Data.MySqlClient", (conn, schema) => new IkeCodeMySqlHistoryContext(conn, schema));
                CodeGenerator = new MySqlMigrationCodeGenerator();
            }
        }
    }
}
