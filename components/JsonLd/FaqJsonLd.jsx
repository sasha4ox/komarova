import JsonLd from "./JsonLd";
import { buildFaqJsonLd } from "@/lib/schema";

export default function FaqJsonLd({ locale, path, items }) {
  const data = buildFaqJsonLd({ locale, path, items });

  if (!data) {
    return null;
  }

  return <JsonLd data={data} />;
}
