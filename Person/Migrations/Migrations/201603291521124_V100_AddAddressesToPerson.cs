namespace IkeCode.Clinike.Person.Migrations.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class V100_AddAddressesToPerson : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "address",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AddressType = c.Int(nullable: false),
                        City = c.String(nullable: false, maxLength: 150, unicode: false),
                        Complement = c.String(maxLength: 250, unicode: false),
                        Neighborhood = c.String(nullable: false, maxLength: 100, unicode: false),
                        Number = c.String(nullable: false, maxLength: 10, unicode: false),
                        State = c.String(nullable: false, maxLength: 2, unicode: false),
                        Street = c.String(nullable: false, maxLength: 250, unicode: false),
                        ZipCode = c.String(nullable: false, maxLength: 20, unicode: false),
                        PersonId = c.Int(nullable: false),
                        DateIns = c.DateTime(nullable: false, precision: 0),
                        LastUpdate = c.DateTime(nullable: false, precision: 0),
                    })
                .PrimaryKey(t => t.Id)                
                .ForeignKey("person", t => t.PersonId, cascadeDelete: true)
                .Index(t => t.PersonId);
            
            CreateIndex("person", "Name", name: "IX_Person_Name");
            CreateIndex("person", "Email", unique: true, clustered: true, name: "IX_Person_Email");
        }
        
        public override void Down()
        {
            DropForeignKey("address", "PersonId", "person");
            DropIndex("address", new[] { "PersonId" });
            DropIndex("person", "IX_Person_Email");
            DropIndex("person", "IX_Person_Name");
            DropTable("address");
        }
    }
}
