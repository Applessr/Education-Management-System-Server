/*
  Warnings:

  - You are about to alter the column `recommendationType` on the `CourseSyllabus` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(5))`.
  - Added the required column `prerequisiteCourseId` to the `ConditionCourse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ConditionCourse` ADD COLUMN `prerequisiteCourseId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `CourseSyllabus` MODIFY `recommendationType` ENUM('PREREQUISITES', 'OPTIONAL', 'SELECTION') NOT NULL DEFAULT 'PREREQUISITES';

-- AddForeignKey
ALTER TABLE `ConditionCourse` ADD CONSTRAINT `ConditionCourse_prerequisiteCourseId_fkey` FOREIGN KEY (`prerequisiteCourseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
