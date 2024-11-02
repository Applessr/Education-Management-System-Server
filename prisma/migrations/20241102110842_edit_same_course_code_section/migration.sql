/*
  Warnings:

  - A unique constraint covering the columns `[course_code,section]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Course_course_code_key` ON `Course`;

-- CreateIndex
CREATE UNIQUE INDEX `Course_course_code_section_key` ON `Course`(`course_code`, `section`);
