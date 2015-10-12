namespace IkeCode.Clinike.Data.Migrations
{
    using IkeCode.Clinike.Data.Enums;
    using IkeCode.Clinike.Data.Models;
    using MySql.Data.Entity;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity.Migrations;

    internal sealed class Configuration : DbMigrationsConfiguration<ClinikeContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;

            // register mysql code generator
            SetSqlGenerator("MySql.Data.MySqlClient", new MySqlMigrationSqlGenerator());
            SetHistoryContextFactory("MySql.Data.MySqlClient", (conn, schema) => new MySqlHistoryContext(conn, schema));
        }

        protected override void Seed(ClinikeContext context)
        {
            SeedPerson();

            SeedUserAndRoles();
        }

        void SeedPerson()
        {
            var person = new Person()
            {
                Name = "Leandro Barral",
                Email = "ikecode@gmail.com",
                Doctor = new Doctor()
                {
                    AdmissionDate = DateTime.Now.AddYears(-2)
                },
                LegalPerson = new LegalPerson()
                {
                    CompanyName = "Barral Development Informatica Ltda ME",
                    SocialName = "IkeCode"
                },
                NaturalPerson = new NaturalPerson()
                {
                    Birthdate = new DateTime(1989, 12, 20),
                    Gender = Gender.Male
                },
                Documents = new List<Document>()
                {
                    new Document()
                    {
                        Value = "466853336",
                        DocumentType = new DocumentType()
                            {
                                Name = "RG"
                            }
                    },
                    new Document()
                    {
                        Value = "39100818860",
                        DocumentType = new DocumentType()
                            {
                                Name = "CPF"
                            }
                    }
                },
                Phones = new List<Phone>()
                {
                    new Phone()
                    {
                        Number = "11 988856996",
                        PhoneType = PhoneType.Mobile
                    }
                },
                Addresses = new List<Address>()
                {
                    new Address()
                    {
                        City = "S�o Paulo",
                        State = "SP",
                        Street = "Rua do Rocio",
                        Number = "220",
                        Neighborhood = "Vila Olimpia",
                        Complement = "cj 131",
                        ZipCode = "05550-000",
                        AddressType = AddressType.Commercial
                    }
                }
            };

            Person.AddOrUpdate(i => i.Email, person);
        }

        void SeedUserAndRoles()
        {
            var idManager = new IdentityManager();
            SeedRole(idManager, "Admin");
            SeedRole(idManager, "ReadOnly");
            SeedRole(idManager, "CanCreate");
            SeedRole(idManager, "CanDelete");
            SeedRole(idManager, "CanEdit");
            SeedRole(idManager, "User");

            var dbUser = ClinikeUserEx.Find(i => i.Email == "ikecode@gmail.com");
            if (dbUser == null || string.IsNullOrWhiteSpace(dbUser.Id))
            {
                var newUser = new ClinikeUser()
                {
                    UserName = "admin",
                    Email = "ikecode@gmail.com"
                };

                // Be careful here - you  will need to use a password which will 
                // be valid under the password rules for the application, 
                // or the process will abort:
                idManager.CreateUser(newUser, "L34ndr0!");
                dbUser = newUser;
            }
            else
            {
                return;
            }

            SeedUserRoles(idManager, dbUser);
        }

        void SeedRole(IdentityManager idManager, string roleName)
        {
            if (!idManager.RoleExists(roleName))
            {
                idManager.CreateRole(roleName);
            }
        }

        void SeedUserRoles(IdentityManager idManager, ClinikeUser dbUser)
        {
            idManager.ClearUserRoles(dbUser.Id);
            idManager.AddUserToRole(dbUser.Id, "Admin");
            idManager.AddUserToRole(dbUser.Id, "ReadOnly");
            idManager.AddUserToRole(dbUser.Id, "CanCreate");
            idManager.AddUserToRole(dbUser.Id, "CanDelete");
            idManager.AddUserToRole(dbUser.Id, "CanEdit");
            idManager.AddUserToRole(dbUser.Id, "User");
        }
    }
}
