import JsonLd from "./JsonLd";
import { buildArticleJsonLd } from "@/lib/schema";

export default function ArticleJsonLd({
  locale,
  path,
  headline,
  description,
  datePublished,
  dateModified,
  image,
}) {
  return (
    <JsonLd
      data={buildArticleJsonLd({
        locale,
        path,
        headline,
        description,
        datePublished,
        dateModified,
        image,
      })}
    />
  );
}
