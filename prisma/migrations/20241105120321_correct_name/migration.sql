/*
  Warnings:

  - You are about to drop the column `tuituin_fee` on the `Major` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Major` DROP COLUMN `tuituin_fee`,
    ADD COLUMN `tuituion_fee` DOUBLE NULL;
