-- CreateEnum
CREATE TYPE "ChatroomType" AS ENUM ('public', 'private');

-- AlterTable
ALTER TABLE "Chatroom" ADD COLUMN     "type" "ChatroomType" NOT NULL DEFAULT 'public';
