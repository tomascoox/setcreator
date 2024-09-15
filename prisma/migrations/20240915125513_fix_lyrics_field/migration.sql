/*
  Warnings:

  - You are about to drop the column `location` on the `Gig` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Gig` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Setlist` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Setlist` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Setlist` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Song` table. All the data in the column will be lost.
  - Added the required column `title` to the `Gig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Gig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `venue` to the `Gig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Setlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Setlist` table without a default value. This is not possible if the table is not empty.
  - Made the column `artist` on table `Song` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Gig` DROP COLUMN `location`,
    DROP COLUMN `name`,
    ADD COLUMN `isCollaborative` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    ADD COLUMN `venue` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Setlist` DROP COLUMN `date`,
    DROP COLUMN `location`,
    DROP COLUMN `name`,
    ADD COLUMN `isCollaborative` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Song` DROP COLUMN `notes`,
    ADD COLUMN `bpm` INTEGER NULL,
    ADD COLUMN `isCollaborative` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `key` VARCHAR(191) NULL,
    ADD COLUMN `timeSignature` VARCHAR(191) NULL,
    MODIFY `artist` VARCHAR(191) NOT NULL,
    MODIFY `lyrics` TEXT NULL;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Collaboration` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `songId` VARCHAR(191) NULL,
    `gigId` VARCHAR(191) NULL,
    `setlistId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Collaboration_userId_idx`(`userId`),
    INDEX `Collaboration_songId_idx`(`songId`),
    INDEX `Collaboration_gigId_idx`(`gigId`),
    INDEX `Collaboration_setlistId_idx`(`setlistId`),
    UNIQUE INDEX `Collaboration_userId_songId_key`(`userId`, `songId`),
    UNIQUE INDEX `Collaboration_userId_gigId_key`(`userId`, `gigId`),
    UNIQUE INDEX `Collaboration_userId_setlistId_key`(`userId`, `setlistId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    INDEX `Account_userId_idx`(`userId`),
    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    INDEX `Session_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Band` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BandMember` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `bandId` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'member',
    `joinedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `BandMember_userId_idx`(`userId`),
    INDEX `BandMember_bandId_idx`(`bandId`),
    UNIQUE INDEX `BandMember_userId_bandId_key`(`userId`, `bandId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Gig_userId_idx` ON `Gig`(`userId`);

-- CreateIndex
CREATE INDEX `Setlist_userId_idx` ON `Setlist`(`userId`);

-- CreateIndex
CREATE INDEX `Song_userId_idx` ON `Song`(`userId`);
