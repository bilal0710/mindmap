/*
  Warnings:

  - A unique constraint covering the columns `[chatroom_id]` on the table `Mindmap` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chatroom_id` to the `Mindmap` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mindmap" ADD COLUMN     "chatroom_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Mindmap_chatroom_id_key" ON "Mindmap"("chatroom_id");

-- AddForeignKey
ALTER TABLE "Mindmap" ADD CONSTRAINT "Mindmap_chatroom_id_fkey" FOREIGN KEY ("chatroom_id") REFERENCES "Chatroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
