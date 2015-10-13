namespace IkeCode.Clinike.Data.Migrations
{
    using System.Data.Entity.Migrations;

    public partial class V1_0_0_AddColumn_Roles_Title : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.roles", "Title", c => c.String(nullable: false, unicode: false, defaultValue: "No Title"));
            AddColumn("dbo.roles", "Discriminator", c => c.String(nullable: false, maxLength: 128, storeType: "nvarchar"));
        }
        
        public override void Down()
        {
            DropColumn("dbo.roles", "Discriminator");
            DropColumn("dbo.roles", "Title");
        }
    }
}
