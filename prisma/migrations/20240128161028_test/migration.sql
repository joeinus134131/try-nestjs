-- AlterTable
ALTER TABLE `users` ADD COLUMN `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `created_by` VARCHAR(225) NULL DEFAULT 'System',
    ADD COLUMN `id_persons` INTEGER NULL,
    ADD COLUMN `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `updated_by` VARCHAR(225) NULL DEFAULT 'System';

-- CreateTable
CREATE TABLE `persons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bdate` VARCHAR(225) NULL,
    `gender` VARCHAR(225) NULL,
    `photos` VARCHAR(225) NULL,
    `education` VARCHAR(225) NULL,
    `address` VARCHAR(225) NULL,
    `notes` VARCHAR(225) NULL,
    `is_deleted` INTEGER NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` VARCHAR(225) NULL DEFAULT 'System',
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_by` VARCHAR(225) NULL DEFAULT 'System',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
