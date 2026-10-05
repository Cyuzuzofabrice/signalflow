
import { prisma } from "../config/database.js";

interface QualificationBreakdown {
  industryMatch: number;
  locationMatch: number;
  jobTitleMatch: number;
  keywordMatch: number;
  buyingIntent: number;
  signalStrength: number;
  totalScore: number;
}

interface QualificationResult {
  leadId: string;
  score: number;
  status: "NEW" | "QUALIFIED" | "CONTACTED" | "CONVERTED" | "DISQUALIFIED";
  qualification:
    | "HIGH_INTENT"
    | "MEDIUM_INTENT"
    | "LOW_INTENT";
  breakdown: QualificationBreakdown;
  reasons: string[];
  lead: {
    id: string;
    name: string;
    company: string | null;
    jobTitle: string | null;
    location: string | null;
    score: number;
    status: string;
  };
}

async function verifyWorkspaceAccess(
  userId: string,
  workspaceId: string,
) {
  const membership = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId,
        workspaceId,
      },
    },
  });

  if (!membership) {
    throw new Error("Workspace not found");
  }

  return membership;
}

function normalize(value: string | null | undefined) {
  return value?.trim().toLowerCase() ?? "";
}

function containsMatch(
  value: string | null | undefined,
  candidates: string[],
) {
  const normalizedValue = normalize(value);

  if (!normalizedValue) {
    return false;
  }

  return candidates.some((candidate) => {
    const normalizedCandidate = normalize(candidate);

    return (
      normalizedCandidate.length > 0 &&
      normalizedValue.includes(normalizedCandidate)
    );
  });
}

function calculateQualification(
  lead: {
    company: string | null;
    jobTitle: string | null;
    location: string | null;
    signals: {
      type: string;
      title: string;
      description: string;
      intentScore: number;
    }[];
  },
  icp: {
    industries: string[];
    locations: string[];
    jobTitles: string[];
    keywords: string[];
  },
): {
  score: number;
  breakdown: QualificationBreakdown;
  reasons: string[];
} {
  const reasons: string[] = [];

  /*
   * 1. Industry match
   *
   * We don't currently have an industry field on Lead.
   * Therefore, we infer industry from the company, job title,
   * and available signal text.
   */
  const leadText = [
    lead.company,
    lead.jobTitle,
    ...lead.signals.map((signal) => signal.title),
    ...lead.signals.map((signal) => signal.description),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const industryMatchFound = icp.industries.some((industry) =>
    leadText.includes(normalize(industry)),
  );

  const industryMatch = industryMatchFound ? 20 : 0;

  if (industryMatchFound) {
    reasons.push("The lead matches the target industry.");
  }

  /*
   * 2. Location match
   */
  const locationMatchFound = containsMatch(
    lead.location,
    icp.locations,
  );

  const locationMatch = locationMatchFound ? 15 : 0;

  if (locationMatchFound) {
    reasons.push("The lead is located in a target market.");
  }

  /*
   * 3. Job title match
   */
  const jobTitleMatchFound = containsMatch(
    lead.jobTitle,
    icp.jobTitles,
  );

  const jobTitleMatch = jobTitleMatchFound ? 15 : 0;

  if (jobTitleMatchFound) {
    reasons.push("The lead's role matches the target decision-maker profile.");
  }

  /*
   * 4. Keyword match
   *
   * We look across company information, job title,
   * and signal content.
   */
  const keywordMatches = icp.keywords.filter((keyword) =>
    leadText.includes(normalize(keyword)),
  );

  const keywordMatchCount = Math.min(
    keywordMatches.length,
    3,
  );

  const keywordMatch = Math.min(
    keywordMatchCount * 5,
    15,
  );

  if (keywordMatchCount > 0) {
    reasons.push(
      `The lead matches ${keywordMatchCount} relevant ICP keyword${
        keywordMatchCount === 1 ? "" : "s"
      }.`,
    );
  }

  /*
   * 5. Buying intent
   *
   * Use the strongest signal intent score.
   */
  const strongestIntentScore = lead.signals.length
    ? Math.max(
        ...lead.signals.map((signal) => signal.intentScore),
      )
    : 0;

  const buyingIntent = Math.round(
    strongestIntentScore * 0.25,
  );

  if (strongestIntentScore > 0) {
    reasons.push(
      `The strongest buying signal has an intent score of ${strongestIntentScore}/100.`,
    );
  }

  /*
   * 6. Signal strength
   *
   * Multiple relevant signals increase confidence,
   * but this component is capped at 10 points.
   */
  const signalCount = lead.signals.length;

  const signalStrength = Math.min(
    signalCount * 5,
    10,
  );

  if (signalCount > 0) {
    reasons.push(
      `The lead has ${signalCount} detected buying signal${
        signalCount === 1 ? "" : "s"
      }.`,
    );
  }

  /*
   * Total:
   *
   * Industry       20
   * Location       15
   * Job title      15
   * Keywords       15
   * Buying intent  25
   * Signal strength10
   *
   * Maximum = 100
   */
  const totalScore = Math.min(
    100,
    industryMatch +
      locationMatch +
      jobTitleMatch +
      keywordMatch +
      buyingIntent +
      signalStrength,
  );

  if (reasons.length === 0) {
    reasons.push(
      "The lead currently has limited evidence of ICP fit or buying intent.",
    );
  }

  return {
    score: totalScore,
    breakdown: {
      industryMatch,
      locationMatch,
      jobTitleMatch,
      keywordMatch,
      buyingIntent,
      signalStrength,
      totalScore,
    },
    reasons,
  };
}

function determineStatus(
  score: number,
): "NEW" | "QUALIFIED" {
  if (score >= 70) {
    return "QUALIFIED";
  }

  return "NEW";
}

function determineQualification(
  score: number,
): "HIGH_INTENT" | "MEDIUM_INTENT" | "LOW_INTENT" {
  if (score >= 80) {
    return "HIGH_INTENT";
  }

  if (score >= 50) {
    return "MEDIUM_INTENT";
  }

  return "LOW_INTENT";
}

export async function qualifyLead(
  userId: string,
  workspaceId: string,
  leadId: string,
): Promise<QualificationResult> {
  await verifyWorkspaceAccess(
    userId,
    workspaceId,
  );

  const lead = await prisma.lead.findFirst({
    where: {
      id: leadId,
      workspaceId,
    },
    include: {
      signals: {
        orderBy: {
          detectedAt: "desc",
        },
      },
    },
  });

  if (!lead) {
    throw new Error("Lead not found");
  }

  const icp = await prisma.iCP.findUnique({
    where: {
      workspaceId,
    },
  });

  if (!icp) {
    throw new Error(
      "ICP is not configured for this workspace",
    );
  }

  const result = calculateQualification(
    lead,
    icp,
  );

  const status = determineStatus(result.score);

  const updatedLead = await prisma.lead.update({
    where: {
      id: lead.id,
    },
    data: {
      score: result.score,

      /*
       * Don't overwrite leads that have already progressed
       * further through the pipeline.
       */
      ...(lead.status === "NEW" && {
        status,
      }),
    },
  });

  return {
    leadId: updatedLead.id,
    score: result.score,
    status: updatedLead.status,
    qualification: determineQualification(
      result.score,
    ),
    breakdown: result.breakdown,
    reasons: result.reasons,
    lead: {
      id: updatedLead.id,
      name: updatedLead.name,
      company: updatedLead.company,
      jobTitle: updatedLead.jobTitle,
      location: updatedLead.location,
      score: updatedLead.score,
      status: updatedLead.status,
    },
  };
}
