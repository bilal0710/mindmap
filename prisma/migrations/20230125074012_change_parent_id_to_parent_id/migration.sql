/*
  Warnings:

  - You are about to drop the column `parent_id` on the `Mindmap` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Mindmap" DROP CONSTRAINT "Mindmap_parent_id_fkey";

-- AlterTable
ALTER TABLE "Mindmap" DROP COLUMN "parent_id",
ADD COLUMN     "parent_Id" TEXT;

-- AddForeignKey
ALTER TABLE "Mindmap" ADD CONSTRAINT "Mindmap_parent_Id_fkey" FOREIGN KEY ("parent_Id") REFERENCES "Mindmap"("id") ON DELETE SET NULL ON UPDATE CASCADE;
