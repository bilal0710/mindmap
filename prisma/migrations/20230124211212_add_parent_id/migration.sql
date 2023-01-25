/*
  Warnings:

  - You are about to drop the column `parentId` on the `Mindmap` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[parent_id]` on the table `Mindmap` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Mindmap" DROP CONSTRAINT "Mindmap_parentId_fkey";

-- AlterTable
ALTER TABLE "Mindmap" DROP COLUMN "parentId",
ADD COLUMN     "parent_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Mindmap_parent_id_key" ON "Mindmap"("parent_id");

-- AddForeignKey
ALTER TABLE "Mindmap" ADD CONSTRAINT "Mindmap_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Mindmap"("id") ON DELETE SET NULL ON UPDATE CASCADE;
