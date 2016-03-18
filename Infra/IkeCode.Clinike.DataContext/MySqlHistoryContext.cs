using IkeCode.Data.Core.Entity;
using System.Data.Common;

namespace IkeCode.Clinike.DataContext
{
    public class MySqlHistoryContext : IkeCodeMySqlHistoryContext
    {
        public MySqlHistoryContext(DbConnection existingConnection, string defaultSchema)
            : base(existingConnection, defaultSchema)
        {
        }
    }
}
