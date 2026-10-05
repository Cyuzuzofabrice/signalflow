import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../config/database.js";
import type {
  LoginInput,
  RegisterInput,
} from "../validators/auth.validator.js";

function createToken(userId: string) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign({ userId }, secret, {
    expiresIn: 604800,
  });
}

export async function registerUser(input: RegisterInput) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: input.email.toLowerCase(),
    },
  });

  if (existingUser) {
    throw new Error("An account with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(input.password, 12);

  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: input.email.toLowerCase(),
        password: hashedPassword,
        firstName: input.firstName,
        lastName: input.lastName,
      },
    });

    const workspace = await tx.workspace.create({
      data: {
        name: input.workspaceName,
      },
    });

    await tx.workspaceMember.create({
      data: {
        userId: user.id,
        workspaceId: workspace.id,
        role: "OWNER",
      },
    });

    return {
      user,
      workspace,
    };
  });

  const token = createToken(result.user.id);

  return {
    token,
    user: {
      id: result.user.id,
      email: result.user.email,
      firstName: result.user.firstName,
      lastName: result.user.lastName,
    },
    workspace: {
      id: result.workspace.id,
      name: result.workspace.name,
    },
  };
}

export async function loginUser(input: LoginInput) {
  const user = await prisma.user.findUnique({
    where: {
      email: input.email.toLowerCase(),
    },
    include: {
      workspaces: {
        include: {
          workspace: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatches = await bcrypt.compare(
    input.password,
    user.password,
  );

  if (!passwordMatches) {
    throw new Error("Invalid email or password");
  }

  const membership = user.workspaces[0];

  if (!membership) {
    throw new Error("User is not associated with a workspace");
  }

  const token = createToken(user.id);

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    workspace: {
      id: membership.workspace.id,
      name: membership.workspace.name,
    },
  };
}