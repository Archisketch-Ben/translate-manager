import { allMessages, getI18nInstance } from "@/src/shared/locale/lib/i18n";
import {
  type PageLangParam,
  withLinguiLayout,
} from "@/src/shared/locale/ui/with-lingui";
import type { Metadata } from "next";

import { LinguiClientProvider } from "@/src/shared/locale/ui/lingui-client-provider";

import { languageConfig } from "@/src/shared/locale/lib/languages";
import "../globals.css";

export async function generateStaticParams() {
  return languageConfig.locales.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: PageLangParam): Metadata {
  const i18n = getI18nInstance(params.lang);

  return {
    title: i18n._("English!"),
  };
}

export default withLinguiLayout(function RootLayout({
  params: { lang },
  children,
}) {
  return (
    <html lang={lang}>
      <body className="antialiased">
        <LinguiClientProvider
          initialLocale={lang}
          initialMessages={allMessages[lang]}
        >
          {children}
        </LinguiClientProvider>
      </body>
    </html>
  );
});
