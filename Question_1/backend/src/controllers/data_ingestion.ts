import DB from "@/database";
import { GET } from "@/utils/adapter";
import { createDate } from "@/utils/date_time";
import { CLINICAL_TRIALS_API } from "@/utils/url";
import { Request, Response } from "express";

/**
 * Fetch and ingest clinical trial data into the database.
 */
export const ingestClinicalTrials = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("Starting data ingestion...");
    const data: any = [];
    let nextToken = "";
    let count = 0;

    do {
      count++;
      // Fetch data from ClinicalTrials.gov API
      let url = CLINICAL_TRIALS_API;
      if (nextToken !== "") {
        url = `${CLINICAL_TRIALS_API}?pageToken=${nextToken}`;
      }
      const response = await GET(url);
      const studies = response.studies;

      if (!studies || studies.length === 0) {
        break;
      }

      const trialData = studies.map((study: any) => {
        const id =
          study?.protocolSection?.identificationModule?.nctId || "Unknown";
        const title =
          study?.protocolSection?.identificationModule?.officialTitle ||
          "No Title";
        const status =
          study?.protocolSection?.statusModule?.overallStatus || "Unknown";
        const hasResults = study?.hasResults || false;

        // Extracting date values
        const startDate =
          study?.protocolSection?.statusModule?.startDateStruct?.date || null;
        const endDate =
          study?.protocolSection?.statusModule?.completionDateStruct?.date ||
          null;

        // Extracting disease (from conditions)
        const disease =
          study?.protocolSection?.conditionsModule?.conditions?.join(", ") ||
          "Unknown";

        // Extracting country from locations
        const country =
          study?.protocolSection?.contactsLocationsModule?.locations?.[0]
            ?.country || "Unknown";

        // Extracting phase (Not available in your data)
        const phase =
          study?.protocolSection?.designModule?.phases?.[0] || "Not Specified";

        // Extracting sponsor
        const sponsor =
          study?.protocolSection?.sponsorCollaboratorsModule?.leadSponsor
            ?.name || "Unknown";

        // Extracting intervention
        const intervention =
          study?.protocolSection?.armsInterventionsModule?.interventions?.map(
            (arm: any) => arm?.description || "Unknown"
          ) || [];

        // Extracting enrollment count
        const enrollment =
          study?.protocolSection?.designModule?.enrollmentInfo?.count || null;

        // Extracting eligibility criteria
        const eligibility_criteria =
          study?.protocolSection?.eligibilityModule?.eligibilityCriteria ||
          null;

        // Extracting study results
        const study_results =
          study?.protocolSection?.outcomesModule?.primaryOutcomes?.map(
            (outcome: any) => outcome.measure
          ) || [];

        // Extracting source URL (Not available in the given data, set to null)
        const source_url = id ? `https://clinicaltrials.gov/study/${id}` : null;

        const start_date = startDate ? createDate(startDate) : null;
        const end_date = endDate ? createDate(endDate) : null;

        return {
          id,
          title,
          status,
          hasResults,
          start_date,
          end_date,
          disease,
          country,
          phase,
          sponsor,
          intervention,
          enrollment,
          eligibility_criteria,
          study_results,
          source_url,
        };
      });

      data.push(...trialData);

      nextToken = response.nextPageToken || "";

      if (count >= 5) {
        break;
      }
    } while (nextToken !== "");

    if (data.length === 0) {
      console.log("No data to ingest.");
      res.status(200).json({ message: "No data to ingest" });
      return;
    }

    for (const trial of data) {
      await DB.clinicalTrial.upsert({
        where: { id: trial.id },
        update: { ...trial, updated_at: new Date() },
        create: trial,
      });
    }
    console.log(`Ingested ${data.length} trials successfully.`);
    res
      .status(200)
      .json({ message: "Data ingestion successful", count: data.length });
  } catch (error) {
    console.error("Error in data ingestion:", error);
    res.status(500).json({ message: "Data ingestion failed", error: error });
  }
};
