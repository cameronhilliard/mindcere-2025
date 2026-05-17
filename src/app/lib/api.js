const API_TIMEOUT_MS = 4500;

export const isLiveApiEnabled = () => {
  return Boolean(process.env.NEXT_PUBLIC_API_URL) && process.env.NEXT_PUBLIC_ENABLE_LIVE_API === "true";
};

const getApiBase = () => {
  const rawBase = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!rawBase) {
    return null;
  }

  if (rawBase.startsWith("http://") || rawBase.startsWith("https://")) {
    return rawBase.endsWith("/") ? rawBase : `${rawBase}/`;
  }

  return `https://${rawBase.replace(/^\/+/, "")}/`;
};

export const buildApiUrl = (endpoint) => {
  const apiBase = getApiBase();

  if (!apiBase) {
    return null;
  }

  return new URL(endpoint.replace(/^\/+/, ""), apiBase).toString();
};

export const fetchJsonWithTimeout = async (endpoint) => {
  const apiUrl = buildApiUrl(endpoint);

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const response = await fetch(apiUrl, { signal: controller.signal });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
};
