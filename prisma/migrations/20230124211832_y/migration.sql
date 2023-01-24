/*
  Warnings:

  - You are about to drop the column `parentId` on the `Mindmap` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Mindmap" DROP CONSTRAINT "Mindmap_parentId_fkey";

-- DropIndex
DROP INDEX "Mindmap_parentId_key";

-- AlterTable
ALTER TABLE "Mindmap" DROP COLUMN "parentId",
ADD COLUMN     "parent_id" TEXT;

-- AddForeignKey
ALTER TABLE "Mindmap" ADD CONSTRAINT "Mindmap_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Mindmap"("id") ON DELETE SET NULL ON UPDATE CASCADE;
