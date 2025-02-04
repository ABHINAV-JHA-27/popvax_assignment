"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_ingestion_1 = require("@/controllers/data_ingestion");
const express_1 = require("express");
const DataIngestionRouter = (0, express_1.Router)();
// Ingest clinical trial data into the database
DataIngestionRouter.post("/update", data_ingestion_1.ingestClinicalTrials);
exports.default = DataIngestionRouter;
