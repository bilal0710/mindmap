/*
  Warnings:

  - You are about to drop the column `parent_Id` on the `Mindmap` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Mindmap" DROP CONSTRAINT "Mindmap_parent_Id_fkey";

-- AlterTable
ALTER TABLE "Mindmap" DROP COLUMN "parent_Id",
ADD COLUMN     "parent_id" TEXT;

-- AddForeignKey
ALTER TABLE "Mindmap" ADD CONSTRAINT "Mindmap_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Mindmap"("id") ON DELETE SET NULL ON UPDATE CASCADE;
