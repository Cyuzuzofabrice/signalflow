
import { prisma } from "../config/database.js";
import type {
  CreateIcpInput,
  UpdateIcpInput,
} from "../validators/icp.validator.js";

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

export async function getIcp(
  userId: string,
  workspaceId: string,
) {
  await verifyWorkspaceAccess(userId, workspaceId);

  return prisma.iCP.findUnique({
    where: {
      workspaceId,
    },
  });
}

export async function createIcp(
  userId: string,
  workspaceId: string,
  input: CreateIcpInput,
) {
  const membership = await verifyWorkspaceAccess(
    userId,
    workspaceId,
  );

  if (
    membership.role !== "OWNER" &&
    membership.role !== "ADMIN"
  ) {
    throw new Error(
      "You do not have permission to configure this workspace",
    );
  }

  const existingIcp = await prisma.iCP.findUnique({
    where: {
      workspaceId,
    },
  });

  if (existingIcp) {
    throw new Error(
      "An ICP already exists for this workspace",
    );
  }

  return prisma.iCP.create({
    data: {
      workspaceId,
      name: input.name.trim(),
      industries: input.industries,
      locations: input.locations,
      companySizes: input.companySizes,
      jobTitles: input.jobTitles,
      keywords: input.keywords,
      description: input.description?.trim() ?? null,
    },
  });
}

export async function updateIcp(
  userId: string,
  workspaceId: string,
  input: UpdateIcpInput,
) {
  const membership = await verifyWorkspaceAccess(
    userId,
    workspaceId,
  );

  if (
    membership.role !== "OWNER" &&
    membership.role !== "ADMIN"
  ) {
    throw new Error(
      "You do not have permission to configure this workspace",
    );
  }

  const existingIcp = await prisma.iCP.findUnique({
    where: {
      workspaceId,
    },
  });

  if (!existingIcp) {
    throw new Error("ICP not found");
  }

  return prisma.iCP.update({
    where: {
      workspaceId,
    },
    data: {
      ...(input.name !== undefined && {
        name: input.name.trim(),
      }),

      ...(input.industries !== undefined && {
        industries: input.industries,
      }),

      ...(input.locations !== undefined && {
        locations: input.locations,
      }),

      ...(input.companySizes !== undefined && {
        companySizes: input.companySizes,
      }),

      ...(input.jobTitles !== undefined && {
        jobTitles: input.jobTitles,
      }),

      ...(input.keywords !== undefined && {
        keywords: input.keywords,
      }),

      ...(input.description !== undefined && {
        description: input.description?.trim() ?? null,
      }),
    },
  });
}

export async function deleteIcp(
  userId: string,
  workspaceId: string,
) {
  const membership = await verifyWorkspaceAccess(
    userId,
    workspaceId,
  );

  if (
    membership.role !== "OWNER" &&
    membership.role !== "ADMIN"
  ) {
    throw new Error(
      "You do not have permission to delete this ICP",
    );
  }

  const existingIcp = await prisma.iCP.findUnique({
    where: {
      workspaceId,
    },
  });

  if (!existingIcp) {
    throw new Error("ICP not found");
  }

  await prisma.iCP.delete({
    where: {
      workspaceId,
    },
  });

  return {
    message: "ICP deleted successfully",
  };
}
