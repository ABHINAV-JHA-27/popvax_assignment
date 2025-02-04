import { ingestClinicalTrials } from "@/controllers/data_ingestion";
import { Request, Response, Router } from "express";

const DataIngestionRouter: Router = Router();

// Ingest clinical trial data into the database
DataIngestionRouter.post("/update", ingestClinicalTrials);

export default DataIngestionRouter;
