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
exports.getAllStudyCountry = exports.deleteAllStudy = exports.deleteStudy = exports.updateStudy = exports.getStudyById = exports.getAllStudys = void 0;
const database_1 = __importDefault(require("@/database"));
/**
 * Get all clinical trials with optional filters and pagination
 */
const getAllStudys = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, disease, status, country, phase, start_date, page = 1, limit = 10, } = req.query;
        const filters = {};
        if (title)
            filters.title = { contains: title, mode: "insensitive" };
        if (disease)
            filters.disease = { contains: disease, mode: "insensitive" };
        if (status)
            filters.status = status;
        if (country)
            filters.country = { contains: country, mode: "insensitive" };
        if (phase)
            filters.phase = phase;
        if (start_date)
            filters.start_date = { gte: new Date(start_date) };
        const trials = yield database_1.default.clinicalTrial.findMany({
            where: filters,
            orderBy: { start_date: "desc" },
            skip: (Number(page) - 1) * Number(limit),
            take: Number(limit),
        });
        const total = yield database_1.default.clinicalTrial.count({ where: filters });
        res
            .status(200)
            .json({ total, page: Number(page), limit: Number(limit), data: trials });
    }
    catch (error) {
        console.error("🔴 Error fetching clinical trials:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getAllStudys = getAllStudys;
/**
 * Get a single clinical trial by ID
 */
const getStudyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const trial = yield database_1.default.clinicalTrial.findUnique({ where: { id } });
        if (!trial) {
            res.status(404).json({ error: "Study not found" });
            return;
        }
        res.status(200).json(trial);
    }
    catch (error) {
        console.error("🔴 Error fetching clinical trial:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getStudyById = getStudyById;
/**
 * Update an existing clinical trial
 */
const updateStudy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, disease, status, start_date, end_date, country, phase, study_results, source_url, } = req.body;
        const updatedStudy = yield database_1.default.clinicalTrial.update({
            where: { id },
            data: {
                title,
                disease,
                status,
                start_date: start_date ? new Date(start_date) : undefined,
                end_date: end_date ? new Date(end_date) : undefined,
                country,
                phase,
                study_results,
                source_url,
            },
        });
        res.status(200).json(updatedStudy);
    }
    catch (error) {
        console.error("🔴 Error updating clinical trial:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updateStudy = updateStudy;
/**
 * Delete a clinical trial
 */
const deleteStudy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield database_1.default.clinicalTrial.delete({ where: { id } });
        res.status(200).json({ message: "Study deleted successfully" });
    }
    catch (error) {
        console.error("🔴 Error deleting clinical trial:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.deleteStudy = deleteStudy;
/**
 * Delete all clinical trial
 */
const deleteAllStudy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.clinicalTrial.deleteMany({});
        res.status(200).json({ message: "All Studys deleted successfully" });
    }
    catch (error) {
        console.error("🔴 Error deleting clinical trial:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.deleteAllStudy = deleteAllStudy;
const getAllStudyCountry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cities = yield database_1.default.clinicalTrial.findMany({
            select: { country: true },
            distinct: ["country"],
        });
        const data = cities.map((city) => city.country);
        res.status(200).json(data);
    }
    catch (error) {
        console.error("🔴 Error fetching cities:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getAllStudyCountry = getAllStudyCountry;
