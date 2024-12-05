"use client";

import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { type Locale } from "../lib/languages";

const languages = {
  en: msg`English`,
  ko: msg`Korean`,
  ja: msg`Japanese`,
  vi: msg`Vietnamese`,
} as const;

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const { i18n } = useLingui();

  const [locale, setLocale] = React.useState<Locale>(
    pathname?.split("/")[1] as Locale
  );

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const locale = event.target.value as Locale;

    const pathNameWithoutLocale = pathname?.split("/")?.slice(2) ?? [];
    const newPath = `/${locale}/${pathNameWithoutLocale.join("/")}`;

    setLocale(locale);
    router.push(newPath);

    document.cookie =
      `ARCHI_COMMUNITY_LOCALE=${locale}; path=/; secure; samesite=strict; domain=${window.location.hostname}`.concat(
        process.env.NODE_ENV === "development" ? "" : "; secure"
      );
  }

  return (
    <select value={locale} onChange={handleChange}>
      {Object.keys(languages).map((locale) => {
        return (
          <option value={locale} key={locale}>
            {i18n._(languages[locale as keyof typeof languages])}
          </option>
        );
      })}
    </select>
  );
}
