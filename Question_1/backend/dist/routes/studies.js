"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const studies_1 = require("@/controllers/studies");
const express_1 = require("express");
const StudiesRouter = (0, express_1.Router)();
// GET all clinical trials (with filters)
StudiesRouter.get("/", studies_1.getAllStudys);
// GET all countries with clinical trials
StudiesRouter.get("/country", studies_1.getAllStudyCountry);
// GET a single trial by ID
StudiesRouter.get("/:id", studies_1.getStudyById);
// PUT update a trial
StudiesRouter.put("/:id", studies_1.updateStudy);
// DELETE a trial
StudiesRouter.delete("/:id", studies_1.deleteStudy);
// DELETE all trials
StudiesRouter.delete("/", studies_1.deleteAllStudy);
exports.default = StudiesRouter;
