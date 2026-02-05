using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ScholarApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ContactSectionContent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ContactSectionContents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SmallTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OfferTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OfferPercentage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ValidityDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactSectionContents", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContactSectionContents");
        }
    }
}
