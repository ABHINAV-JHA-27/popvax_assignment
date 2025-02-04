import {
  deleteAllStudy,
  deleteStudy,
  getAllStudyCountry,
  getAllStudys,
  getStudyById,
  updateStudy,
} from "@/controllers/studies";
import { Router } from "express";

const StudiesRouter: Router = Router();

// GET all clinical trials (with filters)
StudiesRouter.get("/", getAllStudys);

// GET all countries with clinical trials
StudiesRouter.get("/country", getAllStudyCountry);

// GET a single trial by ID
StudiesRouter.get("/:id", getStudyById);

// PUT update a trial
StudiesRouter.put("/:id", updateStudy);

// DELETE a trial
StudiesRouter.delete("/:id", deleteStudy);

// DELETE all trials
StudiesRouter.delete("/", deleteAllStudy);

export default StudiesRouter;
