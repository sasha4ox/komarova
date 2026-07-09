const DEBUG_PARAMS = ["gtm_debug", "gtm_auth", "gtm_preview"];
const DEBUG_SESSION_KEY = "komarova_gtm_debug_session";

function hasDebugParams() {
  if (typeof window === "undefined") {
    return false;
  }

  const params = new URLSearchParams(window.location.search);
  return DEBUG_PARAMS.some((key) => params.has(key));
}

export function isGoogleTagDebugSession() {
  if (typeof window === "undefined") {
    return false;
  }

  if (hasDebugParams()) {
    sessionStorage.setItem(DEBUG_SESSION_KEY, "1");
    return true;
  }

  return sessionStorage.getItem(DEBUG_SESSION_KEY) === "1";
}
