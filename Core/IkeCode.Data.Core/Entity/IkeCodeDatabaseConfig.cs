using IkeCode.Core.Xml;
using System;

namespace IkeCode.Data.Core.Entity
{
    public interface IIkeCodeDatabaseConfig
    {
        DatabaseType DatabaseType { get; }
        string Server { get; }
        string Database { get; }
        string User { get; }
        string Password { get; }
        bool Trusted { get; }
    }

    public class IkeCodeDatabaseConfig : IkeCodeConfig, IIkeCodeDatabaseConfig
    {
        public IkeCodeDatabaseConfig()
            : base("IkeCodeDatabase.config")
        {

        }

        public IkeCodeDatabaseConfig(string fileName)
            : base(fileName)
        {

        }

        public static IkeCodeDatabaseConfig Default { get { return new IkeCodeDatabaseConfig(); } }

        public DatabaseType DatabaseType
        {
            get
            {
                return (DatabaseType)Enum.Parse(typeof(DatabaseType), GetString("databaseType"));
            }
        }

        public string Server { get { return GetString("server"); } }

        public string Database { get { return GetString("database"); } }

        public string User { get { return GetString("user"); } }

        public string Password { get { return GetString("password"); } }

        public bool Trusted { get { return GetBoolean("trusted"); } }
    }
}
