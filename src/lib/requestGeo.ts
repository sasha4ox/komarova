import type { NextApiRequest } from "next";

export type RequestGeo = {
  city?: string;
  countryCode?: string;
  region?: string;
};

function headerValue(value: string | string[] | undefined): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) {
    return undefined;
  }

  const trimmed = raw.trim();
  return trimmed || undefined;
}

export function getRequestGeo(req: NextApiRequest): RequestGeo | undefined {
  const countryCode =
    headerValue(req.headers["x-vercel-ip-country"]) ||
    headerValue(req.headers["cf-ipcountry"]);

  const city = decodeCity(
    headerValue(req.headers["x-vercel-ip-city"]) ||
      headerValue(req.headers["cf-ipcity"]),
  );

  const region =
    headerValue(req.headers["x-vercel-ip-country-region"]) ||
    headerValue(req.headers["cf-region"]);

  if (!countryCode && !city && !region) {
    return undefined;
  }

  return {
    city,
    countryCode: countryCode?.toUpperCase(),
    region,
  };
}

function decodeCity(city?: string) {
  if (!city) {
    return undefined;
  }

  try {
    return decodeURIComponent(city.replace(/\+/g, " "));
  } catch {
    return city;
  }
}

export function getClientIp(req: NextApiRequest): string | undefined {
  const forwarded = req.headers["x-forwarded-for"];
  const fromForwarded = Array.isArray(forwarded)
    ? forwarded[0]
    : forwarded?.split(",")[0]?.trim();

  const ip =
    fromForwarded ||
    headerValue(req.headers["x-real-ip"]) ||
    req.socket?.remoteAddress;

  if (!ip || ip === "::1" || ip === "127.0.0.1") {
    return undefined;
  }

  return ip;
}
