# AI Search / LLMO report — ikomarova.com

Date: 19 August 2026  
Stack: Next.js 16 App Router, next-intl, SSG/ISR.

Primary goal: increase citation probability in ChatGPT Search, Google AI Mode, Gemini, Claude, Perplexity, and Bing.

---

## Architecture

Public URLs (locale prefix always):

```text
/ua | /ru | /en
  /services
  /services/{anxiety|panic-attacks|depression|relationships|self-esteem|burnout|divorce|codependency|loneliness|family-conflicts}
  /knowledge-base
  /knowledge-base/{article-slug}
  /about
  /quiz
```

hreflang uses ISO codes `uk` / `ru` / `en` + `x-default` → `/ua/...`. The URL prefix `/ua` is not the language code.

Content engine:

- Catalog: `src/content/catalog.ts`
- Service records: `src/content/services.ts` (10)
- Articles: `src/content/articles/*.ts` (100 unique intents)
- Templates: `components/templates/ServicePage.jsx`, `ArticlePage.jsx`
- Metadata/sitemap/params read the catalog. New article = catalog slug + `makeArticle()`; no new route file.
- Validate: `npm run validate-content`

Indexable set: 10 services × 3 locales + 100 articles × 3 locales = **330 topic URLs**, plus hubs, about, home, quiz, legal.

Legacy 301: `/` → `/ua`, unprefixed legal/quiz paths → `/ua/...`, `/uk/...` → `/ua/...`.

---

## Critical

### 1. JSON-LD was a meta tag, not a script
- **Problem:** FAQ schema lived in `generateMetadata().other["application/ld+json"]`. Crawlers and LLMs expect `<script type="application/ld+json">`.
- **Solution:** `components/JsonLd/JsonLd.jsx` + `src/lib/schema.ts` `@graph`.
- **Implementation:** injected on home, about, services, articles.
- **AI impact:** models can parse entity, FAQ, and article blocks as quotable source material.

### 2. FAQ schema on every URL
- **Problem:** Locale layout attached FAQPage to quiz, legal, and transactional pages.
- **Solution:** FAQ JSON-LD only where the same questions are visible.
- **AI impact:** avoids contradictory page-type signals; FAQ citations map to the right URL.

### 3. No citatable corpus
- **Problem:** One landing page. LLMs had almost nothing specific to quote besides a short bio.
- **Solution:** 10 service pages (commercial intent) + 100 knowledge-base articles (question → short answer → signs → causes → self-help → when to seek help → FAQ).
- **AI impact:** each article is a retrieval unit with a 2–3 sentence lead that can be quoted verbatim.

### 4. No robots.txt / sitemap coverage for new IA
- **Problem:** Missing `robots.ts`. Sitemap listed only home, quiz, legal.
- **Solution:** `src/app/robots.ts` + catalog-driven `src/app/sitemap.ts` with hreflang alternates.
- **AI impact:** discovery of ~330 new URLs for Bing/Google and tools that fetch sitemaps.

### 5. Several H1s on the home page
- **Problem:** Header logo, hero, and contacts all used `<h1>`.
- **Solution:** Logo is text, contacts `<h2>`, one hero `<h1>`. Inner pages: one H1 in the template.
- **AI impact:** clearer document outline for heading-based extraction.

---

## High

### 6. Missing Open Graph / Twitter
- **Problem:** Shares and some crawlers saw title/description only.
- **Solution:** `buildPageMetadata()` in `src/lib/seo.ts` — unique title/description, canonical, hreflang, OG, Twitter on every indexable page.
- **AI impact:** consistent page identity when models or browsers preview the source.

### 7. Ukrainian URLs had no prefix; languages not 1:1
- **Problem:** Default locale had no `/ua`. Language switcher was a `<button>` (not crawlable). No `x-default`.
- **Solution:** `localePrefix: 'always'`, prefixes `/ua|/ru|/en`, same English slugs, `Link locale={}`, 301 from old paths.
- **AI impact:** each language version is a distinct, interlinked document.

### 8. JSON-LD types for trust
- **Problem:** No Person / ProfessionalService graph.
- **Solution:** `@graph`: WebSite, WebPage, Person (`Psychologist` as extra type + Occupation), LocalBusiness+ProfessionalService (online, Ukraine, no `sameAs`), Article, FAQPage, BreadcrumbList, Review (10 real testimonials only, **no** aggregateRating 260+).
- **AI impact:** models can attach answers to a named specialist and service, not an anonymous page.

### 9. Home was fully client-rendered
- **Problem:** Entire landing hydrated as `"use client"`; LCP image `loading="lazy"`.
- **Solution:** Server `page.jsx` + `HomePage` island; hero `priority` / `fetchPriority="high"`; `display: swap` fonts; unused Geist Mono removed.
- **AI impact:** faster first HTML with full text; better Core Web Vitals as a quality signal.

### 10. Transactional confirmation was indexable
- **Problem:** `/form-confirmation` had canonical + default index.
- **Solution:** `noindex,nofollow` + robots disallow for confirmation and email-pending.
- **AI impact:** index budget stays on citatable pages.

---

## Medium

### 11. E-E-A-T
- **Problem:** Bio was one paragraph; no education/certificates/diplomas.
- **Solution:** `/about` with known facts (Gestalt, FOP, online, adults) and **placeholders** for education, certificates, experience, diploma photos. Placeholders are **not** in JSON-LD.
- **AI impact:** a dedicated specialist URL. Authority stays honest until real credentials are added.

### 12. Internal linking
- **Problem:** Service chips opened a modal, not a page.
- **Solution:** Home cards → `/services/{id}`. Articles ↔ service via `src/lib/internalLinks.ts`. Footer lists all services.
- **AI impact:** topical clusters (service + 10 articles) that retrieval systems can treat as one subject.

### 13. Semantic landmarks
- **Problem:** Quiz/legal lacked `<main>`; header menu was a `<section>`; quiz H1 missing.
- **Solution:** `<main>`, `<nav>`, `<article>`, quiz H1 (visually hidden), legal in `<main><article>`.
- **AI impact:** more reliable boilerplate stripping.

### 14. Manifest branding
- **Problem:** `site.webmanifest` said “MyWebSite”.
- **Solution:** Brand name, theme colors, `start_url: /ua`.

---

## Low

### 15. Keywords meta
- Still present on the home layout. Low value for AI search; kept as harmless extra.

### 16. Geist without Cyrillic
- Body copy uses Arial. Display fonts (Yeseva, Great Vibes) stay for headings/accents.

### 17. Review count “260+”
- Marketing copy on the slider is unchanged. Schema uses only the 10 published quotes.

---

## Expected effect on AI search

| Change | Why models might cite it |
|--------|---------------------------|
| Short answer block first | Matches “direct answer” extraction |
| Q→A + FAQ | Matches question-shaped queries |
| One intent per URL | Reduces mixed-topic pages |
| Person + service graph | Named source, not a faceless domain |
| 3 languages, linked | Query language can hit the matching URL |
| Disclaimer | Safer to quote (not a diagnosis) |

Fill education, certificates, diploma photos, and (optionally) `sameAs` social profiles when available — then add those facts to Person schema.

Run `npm run validate-content` after adding articles.
