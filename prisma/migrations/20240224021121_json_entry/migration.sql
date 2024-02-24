-- CreateTable
CREATE TABLE "JSONEntry" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "json" TEXT NOT NULL,

    CONSTRAINT "JSONEntry_pkey" PRIMARY KEY ("id")
);
