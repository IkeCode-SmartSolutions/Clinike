namespace IkeCode.Data.Core.Entity
{
    using MySql.Data.MySqlClient;
    using System;
    using System.Data.Common;
    using System.Data.SqlClient;

    public static class IkeCodeConnectionFactory
    {
        /// <summary>
        /// Create a DbConnection
        /// </summary>
        /// <param name="config">IIkeCodeDatabaseConfig</param>
        /// <returns>DbConnection</returns>
        public static DbConnection Create(IIkeCodeDatabaseConfig config)
        {
            DbConnection result = null;
            
            switch (config.DatabaseType)
            {
                case DatabaseType.SQL:
                case DatabaseType.SQLite:
                    if (config.Trusted)
                    {
                        result = new SqlConnection(string.Format("Server={0};Trusted_Connection={1};Database={2}", config.Server, config.Trusted, config.Database));
                    }
                    else
                    {
                        result = new SqlConnection(string.Format("Server={0};User Id={1};Password={2};Database={3}", config.Server, config.User, config.Password, config.Database));
                    }
                    break;
                case DatabaseType.MySQL:
                    result = new MySqlConnection(string.Format("Server={0};Uid={1};Pwd={2};Database={3}", config.Server, config.User, config.Password, config.Database));
                    break;
                case DatabaseType.Oracle:
                    throw new NotImplementedException("Factory for Oracle database was not implemented yet.");
                case DatabaseType.PostgreSQL:
                    throw new NotImplementedException("Factory for Oracle database was not implemented yet.");
                default:
                    throw new NotImplementedException("Please specify the DatabaseType.");
            }
            return result;
        }

        /// <summary>
        /// Create a DbConnection based on IkeCodeDatabase.[config|xml]
        /// </summary>
        /// <returns>DbConnection</returns>
        public static DbConnection Create()
        {
            var config = IkeCodeDatabaseConfig.Default;
            
            return Create(config);
        }
    }
}
