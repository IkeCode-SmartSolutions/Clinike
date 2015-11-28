namespace IkeCode.Clinike.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class v1_0_0_CreateTable_Schedule : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.schedules",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ScheduleDate = c.DateTime(nullable: false, precision: 0),
                        ScheduleType = c.Int(nullable: false),
                        PersonId = c.Int(nullable: false),
                        DateIns = c.DateTime(nullable: false, precision: 0),
                        LastUpdate = c.DateTime(nullable: false, precision: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.people", t => t.PersonId, cascadeDelete: true)
                .Index(t => t.PersonId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.schedules", "PersonId", "dbo.people");
            DropIndex("dbo.schedules", new[] { "PersonId" });
            DropTable("dbo.schedules");
        }
    }
}
