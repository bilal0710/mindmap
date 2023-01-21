/*
  Warnings:

  - You are about to drop the column `deleted` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "deleted",
DROP COLUMN "text",
ADD COLUMN     "content" TEXT;
