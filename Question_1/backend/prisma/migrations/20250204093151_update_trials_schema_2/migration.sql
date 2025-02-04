/*
  Warnings:

  - The `study_results` column on the `ClinicalTrial` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `intervention` column on the `ClinicalTrial` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ClinicalTrial" DROP COLUMN "study_results",
ADD COLUMN     "study_results" TEXT[],
DROP COLUMN "intervention",
ADD COLUMN     "intervention" TEXT[];
