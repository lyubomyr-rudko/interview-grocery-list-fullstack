-- CreateEnum
CREATE TYPE "GroceryItemStatus" AS ENUM ('RANOUT', 'HAVE');

-- CreateTable
CREATE TABLE "GroceryItem" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(200) NOT NULL,
    "quantity" INTEGER DEFAULT 0,
    "priority" INTEGER DEFAULT 5,
    "status" "GroceryItemStatus" NOT NULL DEFAULT 'RANOUT',
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "GroceryItem_pkey" PRIMARY KEY ("id")
);
