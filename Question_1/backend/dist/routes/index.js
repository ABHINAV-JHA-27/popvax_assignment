"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainRouter = void 0;
const express_1 = require("express");
const studies_1 = __importDefault(require("./studies"));
const data_ingestion_1 = __importDefault(require("./data_ingestion"));
const router = (0, express_1.Router)();
router.use("/studies", studies_1.default);
router.use("/data-ingestion", data_ingestion_1.default);
exports.MainRouter = router;
