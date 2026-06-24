export type SubmissionAttribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  fbclid?: string;
  referrer?: string;
  landingPage?: string;
};

const MAX_FIELD_LENGTH = 200;

function sanitizeField(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim().slice(0, MAX_FIELD_LENGTH);
  return trimmed || undefined;
}

export function normalizeAttribution(
  body: Record<string, unknown>,
): SubmissionAttribution | undefined {
  const attribution =
    body.attribution && typeof body.attribution === "object"
      ? (body.attribution as Record<string, unknown>)
      : body;

  const normalized: SubmissionAttribution = {
    utmSource: sanitizeField(attribution.utm_source ?? attribution.utmSource),
    utmMedium: sanitizeField(attribution.utm_medium ?? attribution.utmMedium),
    utmCampaign: sanitizeField(
      attribution.utm_campaign ?? attribution.utmCampaign,
    ),
    utmTerm: sanitizeField(attribution.utm_term ?? attribution.utmTerm),
    utmContent: sanitizeField(
      attribution.utm_content ?? attribution.utmContent,
    ),
    gclid: sanitizeField(attribution.gclid),
    fbclid: sanitizeField(attribution.fbclid),
    referrer: sanitizeField(attribution.referrer),
    landingPage: sanitizeField(attribution.landingPage),
  };

  const hasValue = Object.values(normalized).some(Boolean);
  return hasValue ? normalized : undefined;
}

export function formatAttributionForTelegram(
  attribution?: SubmissionAttribution,
): string {
  if (!attribution) {
    return "Прямий вхід";
  }

  if (attribution.gclid) {
    const parts = ["Google Ads"];
    if (attribution.utmCampaign) {
      parts.push(attribution.utmCampaign);
    }
    return parts.join(" · ");
  }

  if (attribution.fbclid) {
    return "Facebook Ads";
  }

  if (attribution.utmSource) {
    return [
      attribution.utmSource,
      attribution.utmMedium,
      attribution.utmCampaign,
    ]
      .filter(Boolean)
      .join(" / ");
  }

  if (attribution.referrer) {
    try {
      return new URL(attribution.referrer).hostname.replace(/^www\./, "");
    } catch {
      return attribution.referrer;
    }
  }

  return "Прямий вхід";
}

export function formatAttributionDetails(
  attribution?: SubmissionAttribution,
): string {
  if (!attribution) {
    return "";
  }

  const lines: string[] = [];

  const summary = formatAttributionForTelegram(attribution);
  if (summary) {
    lines.push(`Джерело: ${summary}`);
  }

  if (attribution.landingPage) {
    lines.push(`Сторінка: ${attribution.landingPage}`);
  }

  if (attribution.utmTerm) {
    lines.push(`Ключове слово: ${attribution.utmTerm}`);
  }

  if (attribution.utmContent) {
    lines.push(`Контент: ${attribution.utmContent}`);
  }

  if (attribution.referrer && !attribution.utmSource && !attribution.gclid) {
    lines.push(`Referrer: ${attribution.referrer}`);
  }

  return lines.join("\n");
}
