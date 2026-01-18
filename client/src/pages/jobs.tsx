import { Layout, JobCard } from "@/components";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Jobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJobs() {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Failed to load jobs", err);
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="p-12 text-muted-foreground">Loading jobs...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Find Opportunities</h1>
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by role, company, or skills..."
              className="pl-10 h-12"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(job => {
            console.log("JOB ID:", job.id); // ✅ DEBUG
            return (
              <motion.div key={job.id}>
                <JobCard job={job} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
