/*
  Warnings:

  - You are about to drop the `JSONEntry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "JSONEntry";

-- CreateTable
CREATE TABLE "entry" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "json" TEXT NOT NULL,

    CONSTRAINT "entry_pkey" PRIMARY KEY ("id")
);
