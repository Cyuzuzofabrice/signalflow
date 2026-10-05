const API_URL = "http://localhost:5000/api";

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem("signalflow_token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
      ...options.headers,
    },
  });

  const result = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Something went wrong",
    );
  }

  return result.data as T;
}

/* =========================
   AUTH
========================= */

export type AuthResult = {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
  };
  workspace: {
    id: string;
    name: string;
  };
};

export async function loginUser(
  email: string,
  password: string,
): Promise<AuthResult> {
  const result = await request<AuthResult>(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    },
  );

  localStorage.setItem(
    "signalflow_token",
    result.token,
  );

  localStorage.setItem(
    "signalflow_workspace",
    JSON.stringify(result.workspace),
  );

  return result;
}

export async function registerUser(input: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  workspaceName: string;
}): Promise<AuthResult> {
  const result = await request<AuthResult>(
    "/auth/register",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );

  localStorage.setItem(
    "signalflow_token",
    result.token,
  );

  localStorage.setItem(
    "signalflow_workspace",
    JSON.stringify(result.workspace),
  );

  return result;
}

/* =========================
   WORKSPACE
========================= */

export type WorkspaceDetails = {
  id: string;
  name: string;
  website: string | null;
  description: string | null;
  role: string;

  icp: {
    id: string;
    workspaceId: string;
    name: string;
    industries: string[];
    locations: string[];
    companySizes: string[];
    jobTitles: string[];
    keywords: string[];
    description: string | null;
  } | null;

  stats: {
    leads: number;
    signals: number;
  };

  createdAt: string;
  updatedAt: string;
};

export async function getWorkspaceDetails(
  workspaceId: string,
): Promise<WorkspaceDetails> {
  return request<WorkspaceDetails>(
    `/workspaces/${workspaceId}`,
  );
}

export async function updateWorkspace(
  workspaceId: string,
  data: {
    name?: string;
    website?: string | null;
    description?: string | null;
  },
): Promise<WorkspaceDetails> {
  return request<WorkspaceDetails>(
    `/workspaces/${workspaceId}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  );
}

/* =========================
   ICP
========================= */

export async function createWorkspaceIcp(
  workspaceId: string,
  data: {
    name: string;
    industries: string[];
    locations: string[];
    companySizes: string[];
    jobTitles: string[];
    keywords: string[];
    description?: string | null;
  },
) {
  return request(
    `/workspaces/${workspaceId}/icp`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

export async function updateWorkspaceIcp(
  workspaceId: string,
  data: {
    name?: string;
    industries?: string[];
    locations?: string[];
    companySizes?: string[];
    jobTitles?: string[];
    keywords?: string[];
    description?: string | null;
  },
) {
  return request(
    `/workspaces/${workspaceId}/icp`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  );
}

/* =========================
   AI
========================= */

export type AIAnalysisResult = {
  signal: string;
  score: number;
  action: string;
  message: string;
  reasoning: string;
};

export async function analyzeBuyingSignal(
  workspaceId: string,
  requestText: string,
): Promise<AIAnalysisResult> {
  return request<AIAnalysisResult>(
    `/workspaces/${workspaceId}/ai/analyze`,
    {
      method: "POST",
      body: JSON.stringify({
        request: requestText,
      }),
    },
  );
}

/* =========================
   LOCAL WORKSPACE
========================= */

export function getWorkspace() {
  const stored = localStorage.getItem("signalflow_workspace");

  if (stored) {
    try {
      return JSON.parse(stored) as {
        id: string;
        name: string;
      };
    } catch {
      localStorage.removeItem("signalflow_workspace");
    }
  }

  return null;
}

/* =========================
   LOGOUT
========================= */

export function logoutUser() {
  localStorage.removeItem(
    "signalflow_token",
  );

  localStorage.removeItem(
    "signalflow_workspace",
  );
}