import Script from "next/script";
import { GOOGLE_ADS_ID } from "../../helpers/googleAds";

export default function ConsentModeDefaults() {
  return (
    <>
      <Script id="google-consent-defaults" strategy="beforeInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;

        gtag('consent', 'default', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          analytics_storage: 'denied',
          wait_for_update: 500
        });

        (function () {
          var debugParams = ['gtm_debug', 'gtm_auth', 'gtm_preview'];
          var search = new URLSearchParams(window.location.search);
          var isDebugSession = debugParams.some(function (param) {
            return search.has(param);
          });

          if (!isDebugSession) {
            try {
              isDebugSession = sessionStorage.getItem('komarova_gtm_debug_session') === '1';
            } catch (e) {}
          }

          if (isDebugSession) {
            try {
              sessionStorage.setItem('komarova_gtm_debug_session', '1');
            } catch (e) {}

            gtag('consent', 'update', {
              ad_storage: 'granted',
              ad_user_data: 'granted',
              ad_personalization: 'granted',
              analytics_storage: 'granted'
            });
          }
        })();

        gtag('js', new Date());
        gtag('config', '${GOOGLE_ADS_ID}');
      `}
      </Script>
      <Script
        id="google-ads-gtag-js"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
