-- CreateTable
CREATE TABLE "ClinicalTrial" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "disease" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "country" TEXT NOT NULL,
    "phase" TEXT NOT NULL,
    "study_results" TEXT,
    "source_url" TEXT,
    "last_updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClinicalTrial_pkey" PRIMARY KEY ("id")
);
