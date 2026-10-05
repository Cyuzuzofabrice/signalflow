import { prisma } from "../config/database.js";

export async function getUserWorkspaces(userId: string) {
  const memberships = await prisma.workspaceMember.findMany({
    where: {
      userId,
    },
    include: {
      workspace: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return memberships.map((membership) => ({
    id: membership.workspace.id,
    name: membership.workspace.name,
    website: membership.workspace.website,
    description: membership.workspace.description,
    role: membership.role,
    createdAt: membership.workspace.createdAt,
    updatedAt: membership.workspace.updatedAt,
  }));
}

export async function getWorkspaceById(
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
    include: {
      workspace: {
        include: {
          icp: true,
          _count: {
            select: {
              leads: true,
              signals: true,
            },
          },
        },
      },
    },
  });

  if (!membership) {
    throw new Error("Workspace not found");
  }

  return {
    id: membership.workspace.id,
    name: membership.workspace.name,
    website: membership.workspace.website,
    description: membership.workspace.description,
    role: membership.role,
    icp: membership.workspace.icp,
    stats: {
      leads: membership.workspace._count.leads,
      signals: membership.workspace._count.signals,
    },
    createdAt: membership.workspace.createdAt,
    updatedAt: membership.workspace.updatedAt,
  };
}

export async function updateWorkspace(
  userId: string,
  workspaceId: string,
  data: {
    name?: string;
    website?: string | null;
    description?: string | null;
  },
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

  if (membership.role !== "OWNER" && membership.role !== "ADMIN") {
    throw new Error("You do not have permission to update this workspace");
  }

  return prisma.workspace.update({
    where: {
      id: workspaceId,
    },
    data,
  });
}