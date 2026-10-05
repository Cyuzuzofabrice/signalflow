import { prisma } from "../config/database.js";
import type {
  CreateLeadInput,
  UpdateLeadInput,
} from "../validators/lead.validator.js";

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

export async function createLead(
  userId: string,
  workspaceId: string,
  input: CreateLeadInput,
) {
  await verifyWorkspaceAccess(userId, workspaceId);

  return prisma.lead.create({
    data: {
      workspaceId,
      name: input.name.trim(),
      company: input.company?.trim() ?? null,
      jobTitle: input.jobTitle?.trim() ?? null,
      email: input.email?.trim().toLowerCase() ?? null,
      website: input.website?.trim() ?? null,
      location: input.location?.trim() ?? null,
      linkedinUrl: input.linkedinUrl?.trim() ?? null,
      score: input.score ?? 0,
      status: input.status ?? "NEW",
      summary: input.summary?.trim() ?? null,
    },
    include: {
      signals: {
        orderBy: {
          detectedAt: "desc",
        },
      },
    },
  });
}

export async function getLeads(
  userId: string,
  workspaceId: string,
) {
  await verifyWorkspaceAccess(userId, workspaceId);

  return prisma.lead.findMany({
    where: {
      workspaceId,
    },
    include: {
      signals: {
        orderBy: {
          detectedAt: "desc",
        },
      },
      _count: {
        select: {
          signals: true,
        },
      },
    },
    orderBy: [
      {
        score: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });
}

export async function getLeadById(
  userId: string,
  workspaceId: string,
  leadId: string,
) {
  await verifyWorkspaceAccess(userId, workspaceId);

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

  return lead;
}

export async function updateLead(
  userId: string,
  workspaceId: string,
  leadId: string,
  input: UpdateLeadInput,
) {
  await verifyWorkspaceAccess(userId, workspaceId);

  const existingLead = await prisma.lead.findFirst({
    where: {
      id: leadId,
      workspaceId,
    },
  });

  if (!existingLead) {
    throw new Error("Lead not found");
  }

  return prisma.lead.update({
    where: {
      id: leadId,
    },
    data: {
      ...(input.name !== undefined && {
        name: input.name.trim(),
      }),

      ...(input.company !== undefined && {
        company: input.company?.trim() ?? null,
      }),

      ...(input.jobTitle !== undefined && {
        jobTitle: input.jobTitle?.trim() ?? null,
      }),

      ...(input.email !== undefined && {
        email: input.email?.trim().toLowerCase() ?? null,
      }),

      ...(input.website !== undefined && {
        website: input.website?.trim() ?? null,
      }),

      ...(input.location !== undefined && {
        location: input.location?.trim() ?? null,
      }),

      ...(input.linkedinUrl !== undefined && {
        linkedinUrl: input.linkedinUrl?.trim() ?? null,
      }),

      ...(input.score !== undefined && {
        score: input.score,
      }),

      ...(input.status !== undefined && {
        status: input.status,
      }),

      ...(input.summary !== undefined && {
        summary: input.summary?.trim() ?? null,
      }),
    },
    include: {
      signals: {
        orderBy: {
          detectedAt: "desc",
        },
      },
    },
  });
}

export async function deleteLead(
  userId: string,
  workspaceId: string,
  leadId: string,
) {
  await verifyWorkspaceAccess(userId, workspaceId);

  const existingLead = await prisma.lead.findFirst({
    where: {
      id: leadId,
      workspaceId,
    },
  });

  if (!existingLead) {
    throw new Error("Lead not found");
  }

  await prisma.lead.delete({
    where: {
      id: leadId,
    },
  });

  return {
    message: "Lead deleted successfully",
  };
}