import { prisma } from "../config/database.js";
import type {
  CreateSignalInput,
  UpdateSignalInput,
} from "../validators/signal.validator.js";

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

export async function createSignal(
  userId: string,
  workspaceId: string,
  input: CreateSignalInput,
) {
  await verifyWorkspaceAccess(userId, workspaceId);

  if (input.leadId) {
    const lead = await prisma.lead.findFirst({
      where: {
        id: input.leadId,
        workspaceId,
      },
    });

    if (!lead) {
      throw new Error("Lead not found");
    }
  }

  return prisma.signal.create({
    data: {
      workspaceId,
      leadId: input.leadId ?? null,
      type: input.type.trim(),
      title: input.title.trim(),
      description: input.description.trim(),
      source: input.source?.trim() ?? null,
      sourceUrl: input.sourceUrl?.trim() ?? null,
      intentScore: input.intentScore ?? 0,
      detectedAt: input.detectedAt
        ? new Date(input.detectedAt)
        : new Date(),
    },
    include: {
      lead: true,
    },
  });
}

export async function getSignals(
  userId: string,
  workspaceId: string,
) {
  await verifyWorkspaceAccess(userId, workspaceId);

  return prisma.signal.findMany({
    where: {
      workspaceId,
    },
    include: {
      lead: true,
    },
    orderBy: {
      detectedAt: "desc",
    },
  });
}

export async function getSignalById(
  userId: string,
  workspaceId: string,
  signalId: string,
) {
  await verifyWorkspaceAccess(userId, workspaceId);

  const signal = await prisma.signal.findFirst({
    where: {
      id: signalId,
      workspaceId,
    },
    include: {
      lead: true,
    },
  });

  if (!signal) {
    throw new Error("Signal not found");
  }

  return signal;
}

export async function updateSignal(
  userId: string,
  workspaceId: string,
  signalId: string,
  input: UpdateSignalInput,
) {
  await verifyWorkspaceAccess(userId, workspaceId);

  const existingSignal = await prisma.signal.findFirst({
    where: {
      id: signalId,
      workspaceId,
    },
  });

  if (!existingSignal) {
    throw new Error("Signal not found");
  }

  if (input.leadId) {
    const lead = await prisma.lead.findFirst({
      where: {
        id: input.leadId,
        workspaceId,
      },
    });

    if (!lead) {
      throw new Error("Lead not found");
    }
  }

  return prisma.signal.update({
    where: {
      id: signalId,
    },
    data: {
      ...(input.leadId !== undefined && {
        leadId: input.leadId ?? null,
      }),

      ...(input.type !== undefined && {
        type: input.type.trim(),
      }),

      ...(input.title !== undefined && {
        title: input.title.trim(),
      }),

      ...(input.description !== undefined && {
        description: input.description.trim(),
      }),

      ...(input.source !== undefined && {
        source: input.source?.trim() ?? null,
      }),

      ...(input.sourceUrl !== undefined && {
        sourceUrl: input.sourceUrl?.trim() ?? null,
      }),

      ...(input.intentScore !== undefined && {
        intentScore: input.intentScore,
      }),

      ...(input.detectedAt !== undefined && {
        detectedAt: new Date(input.detectedAt),
      }),
    },
    include: {
      lead: true,
    },
  });
}

export async function deleteSignal(
  userId: string,
  workspaceId: string,
  signalId: string,
) {
  await verifyWorkspaceAccess(userId, workspaceId);

  const existingSignal = await prisma.signal.findFirst({
    where: {
      id: signalId,
      workspaceId,
    },
  });

  if (!existingSignal) {
    throw new Error("Signal not found");
  }

  await prisma.signal.delete({
    where: {
      id: signalId,
    },
  });

  return {
    message: "Signal deleted successfully",
  };
}