using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class FixProductCollectionFK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_ProductCollections_ProductCollectionCollectionId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_ProductCollectionCollectionId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ProductCollectionCollectionId",
                table: "Products");

            migrationBuilder.CreateIndex(
                name: "IX_Products_CollectionId",
                table: "Products",
                column: "CollectionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ProductCollections_CollectionId",
                table: "Products",
                column: "CollectionId",
                principalTable: "ProductCollections",
                principalColumn: "CollectionId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_ProductCollections_CollectionId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_CollectionId",
                table: "Products");

            migrationBuilder.AddColumn<int>(
                name: "ProductCollectionCollectionId",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Products_ProductCollectionCollectionId",
                table: "Products",
                column: "ProductCollectionCollectionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ProductCollections_ProductCollectionCollectionId",
                table: "Products",
                column: "ProductCollectionCollectionId",
                principalTable: "ProductCollections",
                principalColumn: "CollectionId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
