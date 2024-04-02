/*
  Warnings:

  - A unique constraint covering the columns `[specialtyName]` on the table `Specialty` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Specialty_specialtyName_key" ON "Specialty"("specialtyName");
