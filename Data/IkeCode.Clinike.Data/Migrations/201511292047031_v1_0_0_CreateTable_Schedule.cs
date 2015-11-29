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
                        StartDate = c.DateTime(nullable: false, precision: 0),
                        EndDate = c.DateTime(nullable: false, precision: 0),
                        AllDay = c.Boolean(nullable: false),
                        ScheduleType = c.Int(nullable: false),
                        PatientId = c.Int(nullable: false),
                        DoctorId = c.Int(nullable: false),
                        DateIns = c.DateTime(nullable: false, precision: 0),
                        LastUpdate = c.DateTime(nullable: false, precision: 0),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.doctors", t => t.DoctorId, cascadeDelete: true)
                .ForeignKey("dbo.people", t => t.PatientId, cascadeDelete: true)
                .Index(t => t.PatientId)
                .Index(t => t.DoctorId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.schedules", "PatientId", "dbo.people");
            DropForeignKey("dbo.schedules", "DoctorId", "dbo.doctors");
            DropIndex("dbo.schedules", new[] { "DoctorId" });
            DropIndex("dbo.schedules", new[] { "PatientId" });
            DropTable("dbo.schedules");
        }
    }
}
