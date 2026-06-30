const DEFAULT_WINDOW_HOURS = 3;

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

export function buildPhoneKey(phone: string) {
  return `phone:${phone.replace(/\D/g, "")}`;
}

export function buildEmailKey(email: string) {
  return `email:${email.toLowerCase().trim()}`;
}

export function buildIpKey(ip: string) {
  return `ip:${ip}`;
}

export function buildSubmissionKeys(
  email: string,
  phone: string,
  ip?: string,
): string[] {
  const keys = [
    buildSubmissionKey(email, phone),
    buildPhoneKey(phone),
    buildEmailKey(email),
  ];

  if (ip) {
    keys.push(buildIpKey(ip));
  }

  return keys;
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

export function isAnyDuplicateSubmission(keys: string[]) {
  return keys.some((key) => isDuplicateSubmission(key));
}

export function isCompletedSubmission(key: string) {
  return isActiveInMap(completedSubmissions, key);
}

export function isAnyCompletedSubmission(keys: string[]) {
  return keys.some((key) => isCompletedSubmission(key));
}

export function markPendingSubmission(keys: string | string[]) {
  const list = Array.isArray(keys) ? keys : [keys];
  const now = Date.now();

  for (const key of list) {
    pendingSubmissions.set(key, now);
  }
}

export function markCompletedSubmission(keys: string | string[]) {
  const list = Array.isArray(keys) ? keys : [keys];
  const now = Date.now();

  for (const key of list) {
    pendingSubmissions.delete(key);
    completedSubmissions.set(key, now);
  }
}
