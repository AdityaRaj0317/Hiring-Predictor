// server/jobs/job.analysis.ts

export type ApplySignal = "GOOD" | "SOON" | "WAIT";

export interface JobAnalysisResult {
  probability: number;        // 0–100
  applySignal: ApplySignal;
  reasoning: string;
}

interface AnalyzeJobInput {
  daysSincePosted: number;
  applicants?: number;
  roleLevel?: "Intern" | "Junior" | "Mid" | "Senior";
}

function getRoleTimingPenalty(
  roleLevel: "Intern" | "Junior" | "Mid" | "Senior",
  daysSincePosted: number
): { penalty: number; note: string } {
  const roleWindows = {
    Intern: 2,
    Junior: 5,
    Mid: 10,
    Senior: 15,
  };

  const window = roleWindows[roleLevel];

  if (daysSincePosted <= window) {
    return {
      penalty: 0,
      note: `Timing is ideal for ${roleLevel} role.`,
    };
  }

  return {
    penalty: 15,
    note: `This role is past the ideal apply window for ${roleLevel} positions.`,
  };
}


/**
 * Rule-based analysis (v1)
 * No ML yet — deterministic, explainable, safe
 */
export function analyzeJob(input: AnalyzeJobInput): JobAnalysisResult {
  const days = input.daysSincePosted;
  const applicants = input.applicants ?? 0;
  const roleLevel = input.roleLevel ?? "Mid";

  
  
  let probability = 0;
  let applySignal: ApplySignal = "WAIT";
  let reasoning = "";
  const timingResult = getRoleTimingPenalty(roleLevel, days);
  probability -= timingResult.penalty;
  reasoning += timingResult.note + " ";

  // --- Time-based logic ---
  if (days <= 3) {
    probability += 40;
    reasoning += "Job is newly posted. ";
  } else if (days <= 7) {
    probability += 25;
    reasoning += "Job is still fresh. ";
  } else if (days <= 14) {
    probability += 10;
    reasoning += "Job is aging. ";
  } else {
    probability -= 10;
    reasoning += "Job is old. ";
  }

  // --- Competition logic ---
  if (applicants < 100) {
    probability += 30;
    reasoning += "Low competition. ";
  } else if (applicants < 300) {
    probability += 15;
    reasoning += "Moderate competition. ";
  } else {
    probability -= 10;
    reasoning += "High competition. ";
  }

  // --- Final normalization ---
  probability = Math.max(5, Math.min(95, probability));

  // --- Apply signal ---
  if (probability >= 70) {
    applySignal = "GOOD";
  } else if (probability >= 45) {
    applySignal = "SOON";
  } else {
    applySignal = "WAIT";
  }

  return {
    probability,
    applySignal,
    reasoning: reasoning.trim(),
  };
}
