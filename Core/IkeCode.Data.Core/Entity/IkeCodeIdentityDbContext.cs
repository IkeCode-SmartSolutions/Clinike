using IkeCode.Data.Core.Model.Enums;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace IkeCode.Data.Core.Entity
{
    public class IkeCodeIdentityDbContext<TUser> : IdentityDbContext<TUser>
        where TUser : IdentityUser
    {
        private DatabaseType databaseType { get; set; }
        private string schemaName { get; set; }

        public IkeCodeIdentityDbContext(string connectionStringName = "DefaultConnection", 
                                        DatabaseType databaseType = DatabaseType.SQL, 
                                        string schemaName = "dbo", 
                                        bool normalizeIdentityTableNames = false) 
            : base(connectionStringName)
        {
            this.databaseType = databaseType;
            this.schemaName = schemaName;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            NormalizeIdentityTableNames(modelBuilder);
        }

        protected void RegisterEntityType<TEntity>(DbModelBuilder modelBuilder)
        {

        }

        private void NormalizeIdentityTableNames(DbModelBuilder modelBuilder)
        {
            switch (databaseType)
            {
                case DatabaseType.SQL:
                case DatabaseType.SQLite:
                    break;
                case DatabaseType.MySQL:
                    NormalizeMySQLIdentityTableNames(modelBuilder);
                    break;
                case DatabaseType.Oracle:
                    break;
                case DatabaseType.PostgreSQL:
                    break;
            }
        }

        private static void NormalizeMySQLIdentityTableNames(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TUser>().ToTable("users");
            modelBuilder.Entity<IdentityRole>().ToTable("roles");
            modelBuilder.Entity<IdentityUserRole>().ToTable("userroles");
            modelBuilder.Entity<IdentityUserLogin>().ToTable("userlogins");
            modelBuilder.Entity<IdentityUserClaim>().ToTable("userclaims");
        }

        private static void NormalizeSQLIdentityTableNames(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TUser>().ToTable("users");
            modelBuilder.Entity<IdentityRole>().ToTable("roles");
            modelBuilder.Entity<IdentityUserRole>().ToTable("userroles");
            modelBuilder.Entity<IdentityUserLogin>().ToTable("userlogins");
            modelBuilder.Entity<IdentityUserClaim>().ToTable("userclaims");
        }
    }
}
