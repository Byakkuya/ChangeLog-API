/*
  Warnings:

  - A unique constraint covering the columns `[id,belongsTOId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_id_belongsTOId_key" ON "Product"("id", "belongsTOId");
