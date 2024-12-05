"use client";

import { I18nProvider } from "@lingui/react";
import { type Messages, setupI18n } from "@lingui/core";
import React from "react";

type Props = {
  children: React.ReactNode;
  initialLocale: string;
  initialMessages: Messages;
};

/**
 * `lang`이 주어지면, I18n 인스턴스를 가져와 `I18nProvider`를 통해 클라이언트 측에서 사용할 수 있도록 설정합니다.
 *
 * I18n 객체는 직렬화할 수 없기 때문에 서버에서 클라이언트로 전달할 수 없기 때문에
 * `withLinguiLayout`에서 `LinguiClientProvider`를 통해 i18n 인스턴스를 클라이언트로 직접 전달하지 않습니다.
 *
 * @see https://lingui.dev/tutorials/react-rsc#setup-with-server-components
 */
export function LinguiClientProvider({
  children,
  initialLocale,
  initialMessages,
}: Props) {
  const [i18n] = React.useState(() => {
    return setupI18n({
      locale: initialLocale,
      messages: { [initialLocale]: initialMessages },
    });
  });
  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
