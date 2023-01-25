-- CreateTable
CREATE TABLE "Mindmap" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "Mindmap_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Mindmap" ADD CONSTRAINT "Mindmap_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Mindmap"("id") ON DELETE SET NULL ON UPDATE CASCADE;
