/*
  Warnings:

  - You are about to drop the column `prerequisiteId` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `employee` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adviserId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `course` DROP FOREIGN KEY `Course_prerequisiteId_fkey`;

-- AlterTable
ALTER TABLE `course` DROP COLUMN `prerequisiteId`;

-- AlterTable
ALTER TABLE `coursesyllabus` MODIFY `recommendationType` ENUM('REQUIRED', 'ELECTIVE') NOT NULL DEFAULT 'REQUIRED';

-- AlterTable
ALTER TABLE `employee` DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    ADD COLUMN `first_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `last_name` VARCHAR(191) NOT NULL,
    MODIFY `phone` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `payment` MODIFY `status` ENUM('PENDING', 'COMPLETED', 'FAILED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `student` ADD COLUMN `adviserId` INTEGER NOT NULL,
    ADD COLUMN `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    ADD COLUMN `status` ENUM('ACTIVE', 'INACTIVE', 'GRADUATED') NOT NULL DEFAULT 'ACTIVE';

-- CreateTable
CREATE TABLE `ConditionCourse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `courseId` INTEGER NOT NULL,
    `facultyId` INTEGER NOT NULL,
    `majorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_adviserId_fkey` FOREIGN KEY (`adviserId`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConditionCourse` ADD CONSTRAINT `ConditionCourse_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConditionCourse` ADD CONSTRAINT `ConditionCourse_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `Faculty`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConditionCourse` ADD CONSTRAINT `ConditionCourse_majorId_fkey` FOREIGN KEY (`majorId`) REFERENCES `Major`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
