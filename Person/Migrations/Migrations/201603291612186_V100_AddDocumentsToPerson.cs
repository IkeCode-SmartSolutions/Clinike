namespace IkeCode.Clinike.Person.Migrations.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class V100_AddDocumentsToPerson : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "document",
                c => new
                {
                    Id = c.Int(nullable: false, identity: true),
                    Value = c.String(nullable: false, maxLength: 50, unicode: false),
                    DocumentTypeId = c.Int(nullable: false),
                    PersonId = c.Int(nullable: false),
                    DateIns = c.DateTime(nullable: false, precision: 0),
                    LastUpdate = c.DateTime(nullable: false, precision: 0),
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("documenttype", t => t.DocumentTypeId, cascadeDelete: true)
                .ForeignKey("person", t => t.PersonId, cascadeDelete: true)
                .Index(t => new { t.Value, t.DocumentTypeId }, unique: true, name: "IX_Document_Value_DocumentType")
                .Index(t => t.PersonId);

            CreateTable(
                "documenttype",
                c => new
                {
                    Id = c.Int(nullable: false, identity: true),
                    Name = c.String(nullable: false, maxLength: 50, unicode: false),
                    DateIns = c.DateTime(nullable: false, precision: 0),
                    LastUpdate = c.DateTime(nullable: false, precision: 0),
                })
                .PrimaryKey(t => t.Id);

        }

        public override void Down()
        {
            DropForeignKey("document", "PersonId", "person");
            DropForeignKey("document", "DocumentTypeId", "documenttype");
            DropIndex("document", new[] { "PersonId" });
            DropIndex("document", "IX_Document_Value_DocumentType");
            DropTable("documenttype");
            DropTable("document");
        }
    }
}
