namespace IkeCode.Data.Core.Entity
{
    using MySql.Data.Entity;
    using System.Data.Entity;

    public class IkeCodeDbConfiguration : DbConfiguration
    {
        public IkeCodeDbConfiguration()
        {
            var config = IkeCodeDatabaseConfig.Default;
            switch (config.DatabaseType)
            {
                case DatabaseType.SQL:
                case DatabaseType.SQLite:
                    break;
                case DatabaseType.MySQL:
                    SetConfiguration(new MySqlEFConfiguration());
                    break;
                case DatabaseType.Oracle:
                    break;
                case DatabaseType.PostgreSQL:
                    break;
                default:
                    break;
            }
        }
    }

}
