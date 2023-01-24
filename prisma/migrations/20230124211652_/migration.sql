/*
  Warnings:

  - You are about to drop the column `parent_id` on the `Mindmap` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[parentId]` on the table `Mindmap` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Mindmap" DROP CONSTRAINT "Mindmap_parent_id_fkey";

-- DropIndex
DROP INDEX "Mindmap_parent_id_key";

-- AlterTable
ALTER TABLE "Mindmap" DROP COLUMN "parent_id",
ADD COLUMN     "parentId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Mindmap_parentId_key" ON "Mindmap"("parentId");

-- AddForeignKey
ALTER TABLE "Mindmap" ADD CONSTRAINT "Mindmap_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Mindmap"("id") ON DELETE SET NULL ON UPDATE CASCADE;
