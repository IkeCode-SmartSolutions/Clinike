namespace IkeCode.Clinike.Data
{
    using System.Data.Entity;
    using IkeCode.Clinike.Data.Models;
    using IkeCode.Data.Core.Entity;
    using IkeCode.Data.Core.Model.Enums;

    public class ClinikeContext : IkeCodeIdentityDbContext<ClinikeUser>
    {
        //TODO factory to get connection string name based on data
        public ClinikeContext()
            : base("DefaultConnection", DatabaseType.MySQL, "dbo", true)
        {
        }

        public ClinikeContext(string connectionStringName)
            : base(connectionStringName, DatabaseType.MySQL, "dbo", true)
        {
        }

        public virtual DbSet<Address> Addresses { get; set; }
        public virtual DbSet<Doctor> Doctors { get; set; }
        public virtual DbSet<Document> Documents { get; set; }
        public virtual DbSet<DocumentType> DocumentTypes { get; set; }
        public virtual DbSet<LegalPerson> LegalPersons { get; set; }
        public virtual DbSet<NaturalPerson> NaturalPersons { get; set; }
        public virtual DbSet<Person> People { get; set; }
        public virtual DbSet<Phone> Phones { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            PersonFluentConfigurations(modelBuilder);
            ScheduleFluentConfigurations(modelBuilder);
        }

        private void ScheduleFluentConfigurations(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Schedule>().ToTable("schedules");
        }

        private void PersonFluentConfigurations(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Address>().ToTable("addresses");
            modelBuilder.Entity<Doctor>().ToTable("doctors");
            modelBuilder.Entity<Document>().ToTable("documents");
            modelBuilder.Entity<DocumentType>().ToTable("document_types");
            modelBuilder.Entity<LegalPerson>().ToTable("legal_persons");
            modelBuilder.Entity<NaturalPerson>().ToTable("natural_persons");
            modelBuilder.Entity<Person>().ToTable("people");
            modelBuilder.Entity<Phone>().ToTable("phones");

            modelBuilder.Entity<Person>()
                .HasMany(e => e.Addresses)
                .WithRequired(e => e.Person)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Person>()
                .HasOptional(e => e.Doctor)
                .WithRequired(e => e.Person);

            modelBuilder.Entity<Person>()
                .HasMany(e => e.Documents)
                .WithRequired(e => e.Person)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Person>()
                .HasOptional(e => e.LegalPerson)
                .WithRequired(e => e.Person);

            modelBuilder.Entity<Person>()
                .HasOptional(e => e.NaturalPerson)
                .WithRequired(e => e.Person);

            modelBuilder.Entity<Person>()
                .HasMany(e => e.Phones)
                .WithRequired(e => e.Person)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Address>()
                .Property(e => e.DateIns)
                .HasPrecision(6);

            modelBuilder.Entity<Address>()
                .Property(e => e.LastUpdate)
                .HasPrecision(6);

            modelBuilder.Entity<Address>()
                .Property(e => e.Street)
                .IsUnicode(false);

            modelBuilder.Entity<Address>()
                .Property(e => e.Number)
                .IsUnicode(false);

            modelBuilder.Entity<Address>()
                .Property(e => e.Complement)
                .IsUnicode(false);

            modelBuilder.Entity<Address>()
                .Property(e => e.Neighborhood)
                .IsUnicode(false);

            modelBuilder.Entity<Address>()
                .Property(e => e.ZipCode)
                .IsUnicode(false);

            modelBuilder.Entity<Address>()
                .Property(e => e.City)
                .IsUnicode(false);

            modelBuilder.Entity<Address>()
                .Property(e => e.State)
                .IsUnicode(false);

            modelBuilder.Entity<Doctor>()
                .Property(e => e.DateIns)
                .HasPrecision(6);

            modelBuilder.Entity<Doctor>()
                .Property(e => e.LastUpdate)
                .HasPrecision(6);

            modelBuilder.Entity<Document>()
                .Property(e => e.DateIns)
                .HasPrecision(6);

            modelBuilder.Entity<Document>()
                .Property(e => e.LastUpdate)
                .HasPrecision(6);

            modelBuilder.Entity<Document>()
                .Property(e => e.Value)
                .IsUnicode(false);

            modelBuilder.Entity<DocumentType>()
                .Property(e => e.DateIns)
                .HasPrecision(6);

            modelBuilder.Entity<DocumentType>()
                .Property(e => e.LastUpdate)
                .HasPrecision(6);

            modelBuilder.Entity<DocumentType>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<LegalPerson>()
                .Property(e => e.DateIns)
                .HasPrecision(6);

            modelBuilder.Entity<LegalPerson>()
                .Property(e => e.LastUpdate)
                .HasPrecision(6);

            modelBuilder.Entity<LegalPerson>()
                .Property(e => e.SocialName)
                .IsUnicode(false);

            modelBuilder.Entity<LegalPerson>()
                .Property(e => e.CompanyName)
                .IsUnicode(false);

            modelBuilder.Entity<NaturalPerson>()
                .Property(e => e.DateIns)
                .HasPrecision(6);

            modelBuilder.Entity<NaturalPerson>()
                .Property(e => e.LastUpdate)
                .HasPrecision(6);

            modelBuilder.Entity<NaturalPerson>()
                .Property(e => e.Birthdate)
                .HasPrecision(6);

            modelBuilder.Entity<Person>()
                .Property(e => e.DateIns)
                .HasPrecision(6);

            modelBuilder.Entity<Person>()
                .Property(e => e.LastUpdate)
                .HasPrecision(6);

            modelBuilder.Entity<Person>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<Person>()
                .Property(e => e.Email)
                .IsUnicode(false);

            modelBuilder.Entity<Person>()
                .Property(e => e.ProfileImageUrl)
                .IsUnicode(false);

            modelBuilder.Entity<Phone>()
                .Property(e => e.DateIns)
                .HasPrecision(6);

            modelBuilder.Entity<Phone>()
                .Property(e => e.LastUpdate)
                .HasPrecision(6);

            modelBuilder.Entity<Phone>()
                .Property(e => e.Number)
                .IsUnicode(false);
        }
    }
}
