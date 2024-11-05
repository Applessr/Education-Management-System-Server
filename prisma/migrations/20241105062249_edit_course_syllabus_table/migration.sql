/*
  Warnings:

  - A unique constraint covering the columns `[majorId,year,recommendationType]` on the table `CourseSyllabus` will be added. If there are existing duplicate values, this will fail.

*/-- 1. ลบ Foreign Key Constraint ที่อ้างอิงดัชนีเก่า
ALTER TABLE CourseSyllabus DROP FOREIGN KEY CourseSyllabus_majorId_fkey;

-- 2. ลบดัชนีเก่า
DROP INDEX CourseSyllabus_majorId_year_key ON CourseSyllabus;

-- 3. แก้ไขคอลัมน์ year ถ้าจำเป็น (ในกรณีนี้ไม่จำเป็น)
ALTER TABLE CourseSyllabus MODIFY year VARCHAR(191) NOT NULL;
-- 4. y
CREATE UNIQUE INDEX CourseSyllabus_majorId_year_recommendationType_key 
ON CourseSyllabus(majorId, year, recommendationType);

-- 5. เพิ่ม Foreign Key กลับ
ALTER TABLE CourseSyllabus 
ADD CONSTRAINT CourseSyllabus_majorId_fkey 
FOREIGN KEY (majorId) REFERENCES Major(id) ON DELETE CASCADE ON UPDATE CASCADE;
