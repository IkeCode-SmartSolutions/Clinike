namespace IkeCode.Clinike.Person.Migrations.Migrations
{
    using System.Data.Entity.Migrations;

    public partial class V100_PersonInitialMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "person",
                c => new
                {
                    Id = c.Int(nullable: false, identity: true),
                    Name = c.String(maxLength: 250, unicode: false),
                    Email = c.String(maxLength: 250, unicode: false),
                    DateIns = c.DateTime(nullable: false, precision: 0),
                    LastUpdate = c.DateTime(nullable: false, precision: 0),
                })
                .PrimaryKey(t => t.Id);
        }

        public override void Down()
        {
            DropTable("person");
        }
    }
}
