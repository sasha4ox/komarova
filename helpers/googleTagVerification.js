const DEBUG_PARAMS = ["gtm_debug", "gtm_auth", "gtm_preview"];
const DEBUG_SESSION_KEY = "komarova_gtm_debug_session";
const DEBUG_QUERY_KEY = "komarova_gtm_debug_query";

function captureDebugQueryFromUrl() {
  if (typeof window === "undefined") {
    return false;
  }

  const params = new URLSearchParams(window.location.search);
  const captured = new URLSearchParams();

  for (const key of DEBUG_PARAMS) {
    const value = params.get(key);
    if (value) {
      captured.set(key, value);
    }
  }

  if ([...captured.keys()].length === 0) {
    return false;
  }

  try {
    sessionStorage.setItem(DEBUG_SESSION_KEY, "1");
    sessionStorage.setItem(DEBUG_QUERY_KEY, captured.toString());
  } catch {
    // ignore
  }

  return true;
}

function getStoredDebugQuery() {
  if (typeof window === "undefined") {
    return "";
  }

  try {
    return sessionStorage.getItem(DEBUG_QUERY_KEY) || "";
  } catch {
    return "";
  }
}

export function isGoogleTagDebugSession() {
  if (typeof window === "undefined") {
    return false;
  }

  if (captureDebugQueryFromUrl()) {
    return true;
  }

  try {
    return sessionStorage.getItem(DEBUG_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function persistGoogleTagDebugParams() {
  if (typeof window === "undefined") {
    return;
  }

  if (captureDebugQueryFromUrl()) {
    return;
  }

  if (!isGoogleTagDebugSession()) {
    return;
  }

  const stored = getStoredDebugQuery();
  if (!stored) {
    return;
  }

  const url = new URL(window.location.href);
  let changed = false;

  for (const [key, value] of new URLSearchParams(stored).entries()) {
    if (!url.searchParams.has(key)) {
      url.searchParams.set(key, value);
      changed = true;
    }
  }

  if (changed) {
    window.history.replaceState(
      window.history.state,
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  }
}

export function withGoogleTagDebugParams(path) {
  if (typeof window === "undefined") {
    return path;
  }

  persistGoogleTagDebugParams();

  const stored = getStoredDebugQuery();
  if (!stored) {
    return path;
  }

  const hashIndex = path.indexOf("#");
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : "";
  const withoutHash = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
  const queryIndex = withoutHash.indexOf("?");
  const pathname = queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash;
  const existing = new URLSearchParams(
    queryIndex >= 0 ? withoutHash.slice(queryIndex + 1) : "",
  );

  for (const [key, value] of new URLSearchParams(stored).entries()) {
    if (!existing.has(key)) {
      existing.set(key, value);
    }
  }

  const qs = existing.toString();
  return qs ? `${pathname}?${qs}${hash}` : `${pathname}${hash}`;
}
