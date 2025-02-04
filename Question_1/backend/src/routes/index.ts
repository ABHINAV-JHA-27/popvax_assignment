import { Router } from "express";
import StudiesRouter from "./studies";
import DataIngestionRouter from "./data_ingestion";

const router: Router = Router();

router.use("/studies", StudiesRouter);
router.use("/data-ingestion", DataIngestionRouter);

export const MainRouter: Router = router;
