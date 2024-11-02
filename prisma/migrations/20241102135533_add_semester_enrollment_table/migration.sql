/*
  Warnings:

  - Added the required column `semester` to the `Enrollment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Enrollment` ADD COLUMN `semester` VARCHAR(191) NOT NULL;
