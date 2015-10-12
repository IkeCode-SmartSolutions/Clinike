namespace IkeCode.Clinike.Data.Migrations
{
    using System.Data.Entity.Migrations;

    public partial class v1_0_0_InitialClinikeModels : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.addresses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Street = c.String(nullable: false, maxLength: 250, unicode: false),
                        Number = c.String(nullable: false, maxLength: 10, unicode: false),
                        Complement = c.String(maxLength: 50, unicode: false),
                        Neighborhood = c.String(nullable: false, maxLength: 100, unicode: false),
                        ZipCode = c.String(nullable: false, maxLength: 20, unicode: false),
                        City = c.String(nullable: false, maxLength: 150, unicode: false),
                        State = c.String(nullable: false, maxLength: 2, unicode: false),
                        AddressType = c.Int(nullable: false),
                        PersonId = c.Int(nullable: false),
                        DateIns = c.DateTime(nullable: false, precision: 6),
                        LastUpdate = c.DateTime(nullable: false, precision: 6),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.people", t => t.PersonId)
                .Index(t => t.PersonId);
            
            CreateTable(
                "dbo.people",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 250, unicode: false),
                        Email = c.String(nullable: false, maxLength: 250, unicode: false),
                        ProfileImageUrl = c.String(unicode: false),
                        DateIns = c.DateTime(nullable: false, precision: 6),
                        LastUpdate = c.DateTime(nullable: false, precision: 6),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.doctors",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        AdmissionDate = c.DateTime(nullable: false, storeType: "date"),
                        DateIns = c.DateTime(nullable: false, precision: 6),
                        LastUpdate = c.DateTime(nullable: false, precision: 6),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.people", t => t.Id)
                .Index(t => t.Id);
            
            CreateTable(
                "dbo.documents",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Value = c.String(nullable: false, maxLength: 30, unicode: false),
                        DocumentTypeId = c.Int(nullable: false),
                        PersonId = c.Int(nullable: false),
                        DateIns = c.DateTime(nullable: false, precision: 6),
                        LastUpdate = c.DateTime(nullable: false, precision: 6),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.document_types", t => t.DocumentTypeId, cascadeDelete: true)
                .ForeignKey("dbo.people", t => t.PersonId)
                .Index(t => t.DocumentTypeId)
                .Index(t => t.PersonId);
            
            CreateTable(
                "dbo.document_types",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 50, unicode: false),
                        DateIns = c.DateTime(nullable: false, precision: 6),
                        LastUpdate = c.DateTime(nullable: false, precision: 6),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.legal_persons",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        SocialName = c.String(nullable: false, maxLength: 250, unicode: false),
                        CompanyName = c.String(nullable: false, maxLength: 250, unicode: false),
                        DateIns = c.DateTime(nullable: false, precision: 6),
                        LastUpdate = c.DateTime(nullable: false, precision: 6),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.people", t => t.Id)
                .Index(t => t.Id);
            
            CreateTable(
                "dbo.natural_persons",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        Gender = c.Int(nullable: false),
                        Birthdate = c.DateTime(nullable: false, precision: 6),
                        DateIns = c.DateTime(nullable: false, precision: 6),
                        LastUpdate = c.DateTime(nullable: false, precision: 6),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.people", t => t.Id)
                .Index(t => t.Id);
            
            CreateTable(
                "dbo.phones",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Number = c.String(nullable: false, maxLength: 30, unicode: false),
                        PhoneType = c.Int(nullable: false),
                        PersonId = c.Int(nullable: false),
                        DateIns = c.DateTime(nullable: false, precision: 6),
                        LastUpdate = c.DateTime(nullable: false, precision: 6),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.people", t => t.PersonId)
                .Index(t => t.PersonId);
            
            CreateTable(
                "dbo.roles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128, storeType: "nvarchar"),
                        Name = c.String(nullable: false, maxLength: 255, storeType: "nvarchar"),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
            CreateTable(
                "dbo.userroles",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128, storeType: "nvarchar"),
                        RoleId = c.String(nullable: false, maxLength: 128, storeType: "nvarchar"),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.roles", t => t.RoleId, cascadeDelete: true)
                .ForeignKey("dbo.users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.users",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128, storeType: "nvarchar"),
                        UniqueId = c.String(unicode: false),
                        Email = c.String(maxLength: 255, storeType: "nvarchar"),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(unicode: false),
                        SecurityStamp = c.String(unicode: false),
                        PhoneNumber = c.String(unicode: false),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(precision: 0),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 255, storeType: "nvarchar"),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex");
            
            CreateTable(
                "dbo.userclaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(nullable: false, maxLength: 128, storeType: "nvarchar"),
                        ClaimType = c.String(unicode: false),
                        ClaimValue = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.userlogins",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128, storeType: "nvarchar"),
                        ProviderKey = c.String(nullable: false, maxLength: 128, storeType: "nvarchar"),
                        UserId = c.String(nullable: false, maxLength: 128, storeType: "nvarchar"),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.userroles", "UserId", "dbo.users");
            DropForeignKey("dbo.userlogins", "UserId", "dbo.users");
            DropForeignKey("dbo.userclaims", "UserId", "dbo.users");
            DropForeignKey("dbo.userroles", "RoleId", "dbo.roles");
            DropForeignKey("dbo.phones", "PersonId", "dbo.people");
            DropForeignKey("dbo.natural_persons", "Id", "dbo.people");
            DropForeignKey("dbo.legal_persons", "Id", "dbo.people");
            DropForeignKey("dbo.documents", "PersonId", "dbo.people");
            DropForeignKey("dbo.documents", "DocumentTypeId", "dbo.document_types");
            DropForeignKey("dbo.doctors", "Id", "dbo.people");
            DropForeignKey("dbo.addresses", "PersonId", "dbo.people");
            DropIndex("dbo.userlogins", new[] { "UserId" });
            DropIndex("dbo.userclaims", new[] { "UserId" });
            DropIndex("dbo.users", "UserNameIndex");
            DropIndex("dbo.userroles", new[] { "RoleId" });
            DropIndex("dbo.userroles", new[] { "UserId" });
            DropIndex("dbo.roles", "RoleNameIndex");
            DropIndex("dbo.phones", new[] { "PersonId" });
            DropIndex("dbo.natural_persons", new[] { "Id" });
            DropIndex("dbo.legal_persons", new[] { "Id" });
            DropIndex("dbo.documents", new[] { "PersonId" });
            DropIndex("dbo.documents", new[] { "DocumentTypeId" });
            DropIndex("dbo.doctors", new[] { "Id" });
            DropIndex("dbo.addresses", new[] { "PersonId" });
            DropTable("dbo.userlogins");
            DropTable("dbo.userclaims");
            DropTable("dbo.users");
            DropTable("dbo.userroles");
            DropTable("dbo.roles");
            DropTable("dbo.phones");
            DropTable("dbo.natural_persons");
            DropTable("dbo.legal_persons");
            DropTable("dbo.document_types");
            DropTable("dbo.documents");
            DropTable("dbo.doctors");
            DropTable("dbo.people");
            DropTable("dbo.addresses");
        }
    }
}
