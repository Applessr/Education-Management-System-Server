/*
  Warnings:

  - You are about to drop the column `courseId` on the `ClassSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `ClassSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `ClassSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `ConditionCourse` table. All the data in the column will be lost.
  - You are about to drop the column `facultyId` on the `ConditionCourse` table. All the data in the column will be lost.
  - You are about to drop the column `majorId` on the `ConditionCourse` table. All the data in the column will be lost.
  - You are about to drop the column `prerequisiteCourseId` on the `ConditionCourse` table. All the data in the column will be lost.
  - You are about to drop the column `majorId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `Enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `Enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `ExamSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `ExamSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `examDate` on the `ExamSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `examType` on the `ExamSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `ExamSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `fieldToChange` on the `InfoChangeRequest` table. All the data in the column will be lost.
  - You are about to drop the column `newValue` on the `InfoChangeRequest` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `InfoChangeRequest` table. All the data in the column will be lost.
  - You are about to drop the column `facultyId` on the `Major` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `SectionChangeRequest` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `SectionChangeRequest` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `SectionChangeRequest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[course_code]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cour_id` to the `ClassSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `ClassSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `ClassSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course_course` to the `ConditionCourse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prerequisite_courseCode` to the `ConditionCourse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `major_id` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course_id` to the `Enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `Enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course_id` to the `ExamSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `ExamSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exam_date` to the `ExamSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exam_type` to the `ExamSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `ExamSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `field_to_change` to the `InfoChangeRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `new_value` to the `InfoChangeRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `faculty_id` to the `Major` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tuituin_fee` to the `Major` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course_id` to the `SectionChangeRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `SectionChangeRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacher_id` to the `SectionChangeRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ClassSchedule` DROP FOREIGN KEY `ClassSchedule_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `ConditionCourse` DROP FOREIGN KEY `ConditionCourse_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `ConditionCourse` DROP FOREIGN KEY `ConditionCourse_facultyId_fkey`;

-- DropForeignKey
ALTER TABLE `ConditionCourse` DROP FOREIGN KEY `ConditionCourse_majorId_fkey`;

-- DropForeignKey
ALTER TABLE `ConditionCourse` DROP FOREIGN KEY `ConditionCourse_prerequisiteCourseId_fkey`;

-- DropForeignKey
ALTER TABLE `Course` DROP FOREIGN KEY `Course_majorId_fkey`;

-- DropForeignKey
ALTER TABLE `Course` DROP FOREIGN KEY `Course_teacherId_fkey`;

-- DropForeignKey
ALTER TABLE `Enrollment` DROP FOREIGN KEY `Enrollment_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Enrollment` DROP FOREIGN KEY `Enrollment_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `ExamSchedule` DROP FOREIGN KEY `ExamSchedule_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `InfoChangeRequest` DROP FOREIGN KEY `InfoChangeRequest_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `Major` DROP FOREIGN KEY `Major_facultyId_fkey`;

-- DropForeignKey
ALTER TABLE `SectionChangeRequest` DROP FOREIGN KEY `SectionChangeRequest_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `SectionChangeRequest` DROP FOREIGN KEY `SectionChangeRequest_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `SectionChangeRequest` DROP FOREIGN KEY `SectionChangeRequest_teacherId_fkey`;

-- AlterTable
ALTER TABLE `ClassSchedule` DROP COLUMN `courseId`,
    DROP COLUMN `endTime`,
    DROP COLUMN `startTime`,
    ADD COLUMN `cour_id` INTEGER NOT NULL,
    ADD COLUMN `end_time` VARCHAR(191) NOT NULL,
    ADD COLUMN `start_time` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ConditionCourse` DROP COLUMN `courseId`,
    DROP COLUMN `facultyId`,
    DROP COLUMN `majorId`,
    DROP COLUMN `prerequisiteCourseId`,
    ADD COLUMN `course_course` VARCHAR(191) NOT NULL,
    ADD COLUMN `faculty_id` INTEGER NULL,
    ADD COLUMN `major_id` INTEGER NULL,
    ADD COLUMN `prerequisite_courseCode` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Course` DROP COLUMN `majorId`,
    DROP COLUMN `teacherId`,
    ADD COLUMN `major_id` INTEGER NOT NULL,
    ADD COLUMN `teacher_id` INTEGER NULL,
    MODIFY `course_code` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Enrollment` DROP COLUMN `courseId`,
    DROP COLUMN `studentId`,
    ADD COLUMN `course_id` INTEGER NOT NULL,
    ADD COLUMN `student_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ExamSchedule` DROP COLUMN `courseId`,
    DROP COLUMN `endTime`,
    DROP COLUMN `examDate`,
    DROP COLUMN `examType`,
    DROP COLUMN `startTime`,
    ADD COLUMN `course_id` INTEGER NOT NULL,
    ADD COLUMN `end_time` VARCHAR(191) NOT NULL,
    ADD COLUMN `exam_date` DATETIME(3) NOT NULL,
    ADD COLUMN `exam_type` ENUM('MIDTERM', 'FINAL') NOT NULL,
    ADD COLUMN `start_time` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `InfoChangeRequest` DROP COLUMN `fieldToChange`,
    DROP COLUMN `newValue`,
    DROP COLUMN `studentId`,
    ADD COLUMN `field_to_change` VARCHAR(191) NOT NULL,
    ADD COLUMN `new_value` VARCHAR(191) NOT NULL,
    ADD COLUMN `student_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `Major` DROP COLUMN `facultyId`,
    ADD COLUMN `faculty_id` INTEGER NOT NULL,
    ADD COLUMN `tuituin_fee` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Payment` ADD COLUMN `semester` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `SectionChangeRequest` DROP COLUMN `courseId`,
    DROP COLUMN `studentId`,
    DROP COLUMN `teacherId`,
    ADD COLUMN `course_id` INTEGER NOT NULL,
    ADD COLUMN `student_id` INTEGER NOT NULL,
    ADD COLUMN `teacher_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Course_course_code_key` ON `Course`(`course_code`);

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_major_id_fkey` FOREIGN KEY (`major_id`) REFERENCES `Major`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConditionCourse` ADD CONSTRAINT `ConditionCourse_course_course_fkey` FOREIGN KEY (`course_course`) REFERENCES `Course`(`course_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConditionCourse` ADD CONSTRAINT `ConditionCourse_faculty_id_fkey` FOREIGN KEY (`faculty_id`) REFERENCES `Faculty`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConditionCourse` ADD CONSTRAINT `ConditionCourse_major_id_fkey` FOREIGN KEY (`major_id`) REFERENCES `Major`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConditionCourse` ADD CONSTRAINT `ConditionCourse_prerequisite_courseCode_fkey` FOREIGN KEY (`prerequisite_courseCode`) REFERENCES `Course`(`course_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClassSchedule` ADD CONSTRAINT `ClassSchedule_cour_id_fkey` FOREIGN KEY (`cour_id`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Major` ADD CONSTRAINT `Major_faculty_id_fkey` FOREIGN KEY (`faculty_id`) REFERENCES `Faculty`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SectionChangeRequest` ADD CONSTRAINT `SectionChangeRequest_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SectionChangeRequest` ADD CONSTRAINT `SectionChangeRequest_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SectionChangeRequest` ADD CONSTRAINT `SectionChangeRequest_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InfoChangeRequest` ADD CONSTRAINT `InfoChangeRequest_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExamSchedule` ADD CONSTRAINT `ExamSchedule_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
