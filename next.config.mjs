import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const unprefixedLegacyPaths = [
  '/quiz',
  '/polityka-konfidentsiynosti',
  '/cookie-policy',
  '/oferta',
  '/form-confirmation',
  '/email-pending',
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      { source: '/', destination: '/ua', permanent: true },
      { source: '/uk', destination: '/ua', permanent: true },
      { source: '/uk/:path*', destination: '/ua/:path*', permanent: true },
      ...unprefixedLegacyPaths.map((path) => ({
        source: path,
        destination: `/ua${path}`,
        permanent: true,
      })),
    ];
  },
};

export default withNextIntl(nextConfig);
