"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingestClinicalTrials = void 0;
const database_1 = __importDefault(require("@/database"));
const adapter_1 = require("@/utils/adapter");
const date_time_1 = require("@/utils/date_time");
const url_1 = require("@/utils/url");
/**
 * Fetch and ingest clinical trial data into the database.
 */
const ingestClinicalTrials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Starting data ingestion...");
        const data = [];
        let nextToken = "";
        let count = 0;
        do {
            count++;
            // Fetch data from ClinicalTrials.gov API
            let url = url_1.CLINICAL_TRIALS_API;
            if (nextToken !== "") {
                url = `${url_1.CLINICAL_TRIALS_API}?pageToken=${nextToken}`;
            }
            const response = yield (0, adapter_1.GET)(url);
            const studies = response.studies;
            if (!studies || studies.length === 0) {
                break;
            }
            const trialData = studies.map((study) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11;
                const id = ((_b = (_a = study === null || study === void 0 ? void 0 : study.protocolSection) === null || _a === void 0 ? void 0 : _a.identificationModule) === null || _b === void 0 ? void 0 : _b.nctId) || "Unknown";
                const title = ((_d = (_c = study === null || study === void 0 ? void 0 : study.protocolSection) === null || _c === void 0 ? void 0 : _c.identificationModule) === null || _d === void 0 ? void 0 : _d.officialTitle) ||
                    "No Title";
                const status = ((_f = (_e = study === null || study === void 0 ? void 0 : study.protocolSection) === null || _e === void 0 ? void 0 : _e.statusModule) === null || _f === void 0 ? void 0 : _f.overallStatus) || "Unknown";
                const hasResults = (study === null || study === void 0 ? void 0 : study.hasResults) || false;
                // Extracting date values
                const startDate = ((_j = (_h = (_g = study === null || study === void 0 ? void 0 : study.protocolSection) === null || _g === void 0 ? void 0 : _g.statusModule) === null || _h === void 0 ? void 0 : _h.startDateStruct) === null || _j === void 0 ? void 0 : _j.date) || null;
                const endDate = ((_m = (_l = (_k = study === null || study === void 0 ? void 0 : study.protocolSection) === null || _k === void 0 ? void 0 : _k.statusModule) === null || _l === void 0 ? void 0 : _l.completionDateStruct) === null || _m === void 0 ? void 0 : _m.date) ||
                    null;
                // Extracting disease (from conditions)
                const disease = ((_q = (_p = (_o = study === null || study === void 0 ? void 0 : study.protocolSection) === null || _o === void 0 ? void 0 : _o.conditionsModule) === null || _p === void 0 ? void 0 : _p.conditions) === null || _q === void 0 ? void 0 : _q.join(", ")) ||
                    "Unknown";
                // Extracting country from locations
                const country = ((_u = (_t = (_s = (_r = study === null || study === void 0 ? void 0 : study.protocolSection) === null || _r === void 0 ? void 0 : _r.contactsLocationsModule) === null || _s === void 0 ? void 0 : _s.locations) === null || _t === void 0 ? void 0 : _t[0]) === null || _u === void 0 ? void 0 : _u.country) || "Unknown";
                // Extracting phase (Not available in your data)
                const phase = ((_x = (_w = (_v = study === null || study === void 0 ? void 0 : study.protocolSection) === null || _v === void 0 ? void 0 : _v.designModule) === null || _w === void 0 ? void 0 : _w.phases) === null || _x === void 0 ? void 0 : _x[0]) || "Not Specified";
                // Extracting sponsor
                const sponsor = ((_0 = (_z = (_y = study === null || study === void 0 ? void 0 : study.protocolSection) === null || _y === void 0 ? void 0 : _y.sponsorCollaboratorsModule) === null || _z === void 0 ? void 0 : _z.leadSponsor) === null || _0 === void 0 ? void 0 : _0.name) || "Unknown";
                // Extracting intervention
                const intervention = ((_3 = (_2 = (_1 = study === null || study === void 0 ? void 0 : study.protocolSection) === null || _1 === void 0 ? void 0 : _1.armsInterventionsModule) === null || _2 === void 0 ? void 0 : _2.interventions) === null || _3 === void 0 ? void 0 : _3.map((arm) => (arm === null || arm === void 0 ? void 0 : arm.description) || "Unknown")) || [];
                // Extracting enrollment count
                const enrollment = ((_6 = (_5 = (_4 = study === null || study === void 0 ? void 0 : study.protocolSection) === null || _4 === void 0 ? void 0 : _4.designModule) === null || _5 === void 0 ? void 0 : _5.enrollmentInfo) === null || _6 === void 0 ? void 0 : _6.count) || null;
                // Extracting eligibility criteria
                const eligibility_criteria = ((_8 = (_7 = study === null || study === void 0 ? void 0 : study.protocolSection) === null || _7 === void 0 ? void 0 : _7.eligibilityModule) === null || _8 === void 0 ? void 0 : _8.eligibilityCriteria) ||
                    null;
                // Extracting study results
                const study_results = ((_11 = (_10 = (_9 = study === null || study === void 0 ? void 0 : study.protocolSection) === null || _9 === void 0 ? void 0 : _9.outcomesModule) === null || _10 === void 0 ? void 0 : _10.primaryOutcomes) === null || _11 === void 0 ? void 0 : _11.map((outcome) => outcome.measure)) || [];
                // Extracting source URL (Not available in the given data, set to null)
                const source_url = id ? `https://clinicaltrials.gov/study/${id}` : null;
                const start_date = startDate ? (0, date_time_1.createDate)(startDate) : null;
                const end_date = endDate ? (0, date_time_1.createDate)(endDate) : null;
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
            yield database_1.default.clinicalTrial.upsert({
                where: { id: trial.id },
                update: Object.assign(Object.assign({}, trial), { updated_at: new Date() }),
                create: trial,
            });
        }
        console.log(`Ingested ${data.length} trials successfully.`);
        res
            .status(200)
            .json({ message: "Data ingestion successful", count: data.length });
    }
    catch (error) {
        console.error("Error in data ingestion:", error);
        res.status(500).json({ message: "Data ingestion failed", error: error });
    }
});
exports.ingestClinicalTrials = ingestClinicalTrials;
