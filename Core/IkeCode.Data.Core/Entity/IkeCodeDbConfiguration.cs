using IkeCode.Data.Core.Model;
using MySql.Data.Entity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IkeCode.Data.Core.Entity
{
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
