using IkeCode.Data.Core.Entity;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace IkeCode.Clinike.DataContext
{
    public class ClinikeContext : IkeCodeDbContext
    {

        public ClinikeContext() 
            : base()
        {
        }
        
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}
