/*
  Warnings:

  - You are about to drop the column `cour_id` on the `ClassSchedule` table. All the data in the column will be lost.
  - You are about to alter the column `day` on the `ClassSchedule` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `start_time` on the `ClassSchedule` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Time`.
  - You are about to alter the column `end_time` on the `ClassSchedule` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Time`.
  - You are about to alter the column `start_time` on the `ExamSchedule` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Time`.
  - You are about to alter the column `end_time` on the `ExamSchedule` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Time`.
  - Added the required column `course_id` to the `ClassSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ClassSchedule` DROP FOREIGN KEY `ClassSchedule_cour_id_fkey`;

-- AlterTable
ALTER TABLE `ClassSchedule` DROP COLUMN `cour_id`,
    ADD COLUMN `course_id` INTEGER NOT NULL,
    MODIFY `day` INTEGER NOT NULL,
    MODIFY `start_time` TIME NOT NULL,
    MODIFY `end_time` TIME NOT NULL;

-- AlterTable
ALTER TABLE `ExamSchedule` MODIFY `start_time` TIME NOT NULL,
    MODIFY `end_time` TIME NOT NULL;

-- CreateTable
CREATE TABLE `CourseNode` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `position_x` INTEGER NOT NULL,
    `position_y` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CourseLine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `position_x` INTEGER NOT NULL,
    `position_y` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ClassSchedule` ADD CONSTRAINT `ClassSchedule_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
