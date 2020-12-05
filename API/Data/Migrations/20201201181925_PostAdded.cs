using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class PostAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SourceUserId = table.Column<int>(type: "int", nullable: false),
                    KindId = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Posts_AspNetUsers_SourceUserId",
                        column: x => x.SourceUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PostComment",
                columns: table => new
                {
                    SourceUserId = table.Column<int>(type: "int", nullable: false),
                    CommentedPostId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostComment", x => new { x.SourceUserId, x.CommentedPostId });
                    table.ForeignKey(
                        name: "FK_PostComment_AspNetUsers_SourceUserId",
                        column: x => x.SourceUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PostComment_Posts_CommentedPostId",
                        column: x => x.CommentedPostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PostLike",
                columns: table => new
                {
                    SourceUserId = table.Column<int>(type: "int", nullable: false),
                    LikedPostId = table.Column<int>(type: "int", nullable: false),
                    AppUserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostLike", x => new { x.SourceUserId, x.LikedPostId });
                    table.ForeignKey(
                        name: "FK_PostLike_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PostLike_AspNetUsers_SourceUserId",
                        column: x => x.SourceUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PostLike_Posts_LikedPostId",
                        column: x => x.LikedPostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CommentLike",
                columns: table => new
                {
                    SourceUserId = table.Column<int>(type: "int", nullable: false),
                    LikedCommentId = table.Column<int>(type: "int", nullable: false),
                    LikedCommentSourceUserId = table.Column<int>(type: "int", nullable: false),
                    LikedCommentCommentedPostId = table.Column<int>(type: "int", nullable: false),
                    UserPostId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommentLike", x => new { x.SourceUserId, x.LikedCommentId });
                    table.ForeignKey(
                        name: "FK_CommentLike_AspNetUsers_SourceUserId",
                        column: x => x.SourceUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CommentLike_PostComment_LikedCommentSourceUserId_LikedCommentCommentedPostId",
                        columns: x => new { x.LikedCommentSourceUserId, x.LikedCommentCommentedPostId },
                        principalTable: "PostComment",
                        principalColumns: new[] { "SourceUserId", "CommentedPostId" },
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CommentLike_Posts_UserPostId",
                        column: x => x.UserPostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CommentLike_LikedCommentSourceUserId_LikedCommentCommentedPostId",
                table: "CommentLike",
                columns: new[] { "LikedCommentSourceUserId", "LikedCommentCommentedPostId" });

            migrationBuilder.CreateIndex(
                name: "IX_CommentLike_UserPostId",
                table: "CommentLike",
                column: "UserPostId");

            migrationBuilder.CreateIndex(
                name: "IX_PostComment_CommentedPostId",
                table: "PostComment",
                column: "CommentedPostId");

            migrationBuilder.CreateIndex(
                name: "IX_PostLike_AppUserId",
                table: "PostLike",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_PostLike_LikedPostId",
                table: "PostLike",
                column: "LikedPostId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_SourceUserId",
                table: "Posts",
                column: "SourceUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CommentLike");

            migrationBuilder.DropTable(
                name: "PostLike");

            migrationBuilder.DropTable(
                name: "PostComment");

            migrationBuilder.DropTable(
                name: "Posts");
        }
    }
}
