export function isEmailVerificationEnabled() {
  return (
    process.env.EMAIL_VERIFICATION_ENABLED === "true" ||
    process.env.EMAIL_VERIFICATION_ENABLED === "1"
  );
}

export function getSiteUrl() {
  return process.env.SITE_URL || "https://ikomarova.com";
}
