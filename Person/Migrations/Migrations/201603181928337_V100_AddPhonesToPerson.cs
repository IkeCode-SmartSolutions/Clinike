namespace IkeCode.Clinike.Person.Migrations.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class V100_AddPhonesToPerson : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "phone",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AcceptSMS = c.Boolean(),
                        Contact = c.String(nullable: false, maxLength: 90, unicode: false),
                        Number = c.String(nullable: false, maxLength: 30, unicode: false),
                        PersonId = c.Int(nullable: false),
                        DateIns = c.DateTime(nullable: false, precision: 0),
                        LastUpdate = c.DateTime(nullable: false, precision: 0),
                    })
                .PrimaryKey(t => t.Id)                
                .ForeignKey("person", t => t.PersonId, cascadeDelete: true)
                .Index(t => t.PersonId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("phone", "PersonId", "person");
            DropIndex("phone", new[] { "PersonId" });
            DropTable("phone");
        }
    }
}
