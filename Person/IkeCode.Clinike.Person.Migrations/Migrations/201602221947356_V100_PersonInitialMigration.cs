namespace IkeCode.Clinike.Person.Migrations.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class V100_PersonInitialMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.person",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(unicode: false),
                        Email = c.String(unicode: false),
                        DateIns = c.DateTime(nullable: false),
                        LastUpdate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.person");
        }
    }
}
