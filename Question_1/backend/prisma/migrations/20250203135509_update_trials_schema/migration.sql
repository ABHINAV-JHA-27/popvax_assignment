/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `ClinicalTrial` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hasResults` to the `ClinicalTrial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClinicalTrial" ADD COLUMN     "eligibility_criteria" TEXT,
ADD COLUMN     "enrollment" INTEGER,
ADD COLUMN     "hasResults" BOOLEAN NOT NULL,
ADD COLUMN     "intervention" TEXT,
ADD COLUMN     "sponsor" TEXT,
ALTER COLUMN "disease" DROP NOT NULL,
ALTER COLUMN "start_date" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "phase" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ClinicalTrial_id_key" ON "ClinicalTrial"("id");
