using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ScholarApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddColumn_IsActive : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Banners",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Banners");
        }
    }
}
