// server/routes.ts
import type { Express } from "express";
import type { Server } from "http";
import { fetchJobSources } from "./services/jobSources.service";
import { fetchJobs } from "./jobs/job.service";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get("/api/job-sources", (_req, res) => {
    const sources = fetchJobSources();
    res.json(sources);
  });

  // ✅ ALL JOBS
  app.get("/api/jobs", async (_req, res) => {
    const jobs = await fetchJobs();
    res.json(jobs);
  });

  // ✅ SINGLE JOB
  app.get("/api/jobs/:id", async (req, res) => {
    const { id } = req.params;
    const jobs = await fetchJobs();
    const job = jobs.find(j => j.id === id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  });

  return httpServer;
}
