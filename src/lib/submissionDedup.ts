const DEFAULT_WINDOW_HOURS = 24;

function getWindowMs() {
  const hours = Number(process.env.SUBMIT_DEDUP_HOURS || DEFAULT_WINDOW_HOURS);
  return (Number.isFinite(hours) && hours > 0 ? hours : DEFAULT_WINDOW_HOURS) * 60 * 60 * 1000;
}

const pendingSubmissions = new Map<string, number>();
const completedSubmissions = new Map<string, number>();

export function buildSubmissionKey(email: string, phone: string) {
  const normalizedEmail = email.toLowerCase().trim();
  const normalizedPhone = phone.replace(/\D/g, "");
  return `${normalizedEmail}:${normalizedPhone}`;
}

function pruneMap(map: Map<string, number>) {
  const windowMs = getWindowMs();
  const now = Date.now();

  for (const [key, timestamp] of map.entries()) {
    if (now - timestamp > windowMs) {
      map.delete(key);
    }
  }
}

function isActiveInMap(map: Map<string, number>, key: string) {
  pruneMap(map);

  const timestamp = map.get(key);
  if (!timestamp) {
    return false;
  }

  if (Date.now() - timestamp > getWindowMs()) {
    map.delete(key);
    return false;
  }

  return true;
}

export function isDuplicateSubmission(key: string) {
  return (
    isActiveInMap(pendingSubmissions, key) ||
    isActiveInMap(completedSubmissions, key)
  );
}

export function isCompletedSubmission(key: string) {
  return isActiveInMap(completedSubmissions, key);
}

export function markPendingSubmission(key: string) {
  pendingSubmissions.set(key, Date.now());
}

export function markCompletedSubmission(key: string) {
  pendingSubmissions.delete(key);
  completedSubmissions.set(key, Date.now());
}
