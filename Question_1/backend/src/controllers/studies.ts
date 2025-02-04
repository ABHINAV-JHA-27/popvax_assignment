import DB from "@/database";
import { Request, Response } from "express";

/**
 * Get all clinical trials with optional filters and pagination
 */
export const getAllStudys = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      disease,
      status,
      country,
      phase,
      start_date,
      page = 1,
      limit = 10,
    } = req.query;

    const filters: any = {};
    if (title)
      filters.title = { contains: title as string, mode: "insensitive" };
    if (disease)
      filters.disease = { contains: disease as string, mode: "insensitive" };
    if (status) filters.status = status;
    if (country)
      filters.country = { contains: country as string, mode: "insensitive" };
    if (phase) filters.phase = phase;
    if (start_date)
      filters.start_date = { gte: new Date(start_date as string) };

    const trials = await DB.clinicalTrial.findMany({
      where: filters,
      orderBy: { start_date: "desc" },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    });

    const total = await DB.clinicalTrial.count({ where: filters });

    res
      .status(200)
      .json({ total, page: Number(page), limit: Number(limit), data: trials });
  } catch (error) {
    console.error("🔴 Error fetching clinical trials:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Get a single clinical trial by ID
 */
export const getStudyById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const trial = await DB.clinicalTrial.findUnique({ where: { id } });

    if (!trial) {
      res.status(404).json({ error: "Study not found" });
      return;
    }

    res.status(200).json(trial);
  } catch (error) {
    console.error("🔴 Error fetching clinical trial:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Update an existing clinical trial
 */
export const updateStudy = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      title,
      disease,
      status,
      start_date,
      end_date,
      country,
      phase,
      study_results,
      source_url,
    } = req.body;

    const updatedStudy = await DB.clinicalTrial.update({
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
  } catch (error) {
    console.error("🔴 Error updating clinical trial:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Delete a clinical trial
 */
export const deleteStudy = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    await DB.clinicalTrial.delete({ where: { id } });

    res.status(200).json({ message: "Study deleted successfully" });
  } catch (error) {
    console.error("🔴 Error deleting clinical trial:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Delete all clinical trial
 */
export const deleteAllStudy = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await DB.clinicalTrial.deleteMany({});

    res.status(200).json({ message: "All Studys deleted successfully" });
  } catch (error) {
    console.error("🔴 Error deleting clinical trial:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllStudyCountry = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cities = await DB.clinicalTrial.findMany({
      select: { country: true },
      distinct: ["country"],
    });

    const data = cities.map((city) => city.country);
    res.status(200).json(data);
  } catch (error) {
    console.error("🔴 Error fetching cities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
