/*
  Warnings:

  - You are about to drop the column `isCollaborative` on the `Gig` table. All the data in the column will be lost.
  - You are about to drop the column `isCollaborative` on the `Setlist` table. All the data in the column will be lost.
  - You are about to drop the column `isCollaborative` on the `Song` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Gig` DROP COLUMN `isCollaborative`,
    ADD COLUMN `isShared` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Setlist` DROP COLUMN `isCollaborative`,
    ADD COLUMN `isShared` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Song` DROP COLUMN `isCollaborative`,
    ADD COLUMN `isShared` BOOLEAN NOT NULL DEFAULT false;
