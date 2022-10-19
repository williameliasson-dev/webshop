/*
  Warnings:

  - You are about to drop the column `keywords` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "keywords";

-- CreateIndex
CREATE INDEX "Product_title_createdAt_idx" ON "Product"("title", "createdAt");
