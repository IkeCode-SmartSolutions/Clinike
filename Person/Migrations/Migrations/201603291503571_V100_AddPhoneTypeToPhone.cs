namespace IkeCode.Clinike.Person.Migrations.Migrations
{
    using System.Data.Entity.Migrations;

    public partial class V100_AddPhoneTypeToPhone : DbMigration
    {
        public override void Up()
        {
            AddColumn("phone", "PhoneType", c => c.Int(nullable: false));
            AlterColumn("phone", "Contact", c => c.String(maxLength: 90, unicode: false));
            CreateIndex("phone", new[] { "Number", "PhoneType" }, unique: true, clustered: true, name: "IX_Phone_Number_PhoneType");
        }
        
        public override void Down()
        {
            DropIndex("phone", "IX_Phone_Number_PhoneType");
            AlterColumn("phone", "Contact", c => c.String(nullable: false, maxLength: 90, unicode: false));
            DropColumn("phone", "PhoneType");
        }
    }
}
