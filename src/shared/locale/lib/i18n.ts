import "server-only";

import { I18n, setupI18n } from "@lingui/core";
import type { CompiledMessage } from "@lingui/message-utils/compileMessage";
import { type LanguageConfig, languageConfig, type Locale } from "./languages";

const { locales } = languageConfig;

type UncompiledMessage = string;
type Messages = Record<Locale, UncompiledMessage | CompiledMessage>;

async function loadCatalog(locale: Locale): Promise<{
  [k: string]: Messages;
}> {
  const { messages } = await import(`../locales/${locale}/messages.po`);
  return {
    [locale]: messages,
  };
}
const catalogs = await Promise.all(
  (locales as LanguageConfig["locales"]).map(loadCatalog)
);

// catalogs 배열을 단일 객체로 변환
export const allMessages = catalogs.reduce((acc, oneCatalog) => {
  return { ...acc, ...oneCatalog };
}, {});

type AllI18nInstances = { [K in Locale]: I18n };

export const allI18nInstances: AllI18nInstances = locales.reduce(
  (acc, locale) => {
    const messages = allMessages[locale] ?? {};
    const i18n = setupI18n({
      locale,
      messages: { [locale]: messages },
    });
    return { ...acc, [locale]: i18n };
  },
  {} as AllI18nInstances
);

/**
 * RSC에서 사용할 수 있도록 `locale`에 대한 Lingui의 i18n 인스턴스를 반환합니다.
 */
export const getI18nInstance = (locale: Locale): I18n => {
  if (!allI18nInstances[locale]) {
    console.warn(`"${locale}"에 대한 i18n 인스턴스를 찾을 수 없습니다.`);
  }
  return allI18nInstances[locale]! || allI18nInstances["en"]!;
};
