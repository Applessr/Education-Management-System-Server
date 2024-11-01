-- AlterTable
ALTER TABLE `student` MODIFY `adviserId` INTEGER NULL;

-- CreateTable
CREATE TABLE `SectionChangeRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `requestedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `studentId` INTEGER NOT NULL,
    `courseId` INTEGER NOT NULL,
    `currentSection` INTEGER NOT NULL,
    `newSection` INTEGER NOT NULL,
    `teacherId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InfoChangeRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `requestedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `studentId` INTEGER NULL,
    `userType` ENUM('TEACHER', 'STUDENT') NOT NULL,
    `fieldToChange` VARCHAR(191) NOT NULL,
    `newValue` VARCHAR(191) NOT NULL,
    `employeeId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SectionChangeRequest` ADD CONSTRAINT `SectionChangeRequest_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SectionChangeRequest` ADD CONSTRAINT `SectionChangeRequest_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SectionChangeRequest` ADD CONSTRAINT `SectionChangeRequest_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InfoChangeRequest` ADD CONSTRAINT `InfoChangeRequest_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InfoChangeRequest` ADD CONSTRAINT `InfoChangeRequest_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
