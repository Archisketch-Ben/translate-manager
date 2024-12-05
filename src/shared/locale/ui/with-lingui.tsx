/**
 * App Router가 설계된 방식 때문에 Layout 뿐만 아니라 Page에서도 `setI18n` 함수를 호출해야 합니다.
 *  - 중첩된 layouts/page가 상위 layout보다 먼저 렌더링됩니다. @see https://github.com/vercel/next.js/discussions/53026
 *    => 이는 외부 레이아웃은 다시 렌더링하지 않고, 레이아웃의 UI 컴포넌트가 상태를 유지할 수 있도록 하기 위함입니다.
 *
 * 즉, 모든 페이지와 레이아웃에서 `setI18n`을 호출해야 하는데, 이를 간편하게 하기 위해 HOC를 만들었습니다.
 *
 * @see https://lingui.dev/tutorials/react-rsc#pages-layouts-and-lingui
 */

import { setI18n } from "@lingui/react/server";
import * as React from "react";

import { getI18nInstance } from "../lib/i18n";
import { type Locale } from "../lib/languages";

export type PageLangParam = {
  params: { lang: Locale };
};

type PageProps = PageLangParam & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParams?: any; // in query
};

type PageExposedToNextJS<Props extends PageProps> = (
  props: Props
) => React.ReactNode;

/**
 * 페이지를 위한 HOC입니다.
 *
 * `lang` 프로퍼티가 주어지면, I18n 인스턴스를 가져와서 서버 측에서 사용할 수 있도록 설정합니다.
 *
 * @see https://lingui.dev/tutorials/react-rsc#setup-with-server-components
 */
export const withLinguiPage = <Props extends PageProps>(
  AppRouterPage: React.ComponentType<PageLangParam & Props>
): PageExposedToNextJS<Props> => {
  return function WithLingui(props) {
    const lang = props.params.lang;
    const i18n = getI18nInstance(lang); // 주어진 locale에 대한 i18n 인스턴스를 가져옵니다.
    setI18n(i18n); // 현재 요청에 대해 서버 측에서 사용할 수 있도록 설정합니다.

    return <AppRouterPage {...props} lang={lang} />;
  };
};

type LayoutProps = PageLangParam & {
  children: React.ReactNode;
};

type LayoutExposedToNextJS<Props extends LayoutProps> = (
  props: Props
) => React.ReactNode;

/**
 * 레이아웃 페이지를 위한 HOC입니다.
 *
 * `lang` 프로퍼티가 주어지면, I18n 인스턴스를 가져와서 서버 측에서 사용할 수 있도록 설정합니다.
 *
 * @see https://lingui.dev/tutorials/react-rsc#setup-with-server-components
 */
export const withLinguiLayout = <Props extends LayoutProps>(
  AppRouterPage: React.ComponentType<PageLangParam & Props>
): LayoutExposedToNextJS<Props> => {
  return function WithLingui(props) {
    const lang = props.params.lang;
    const i18n = getI18nInstance(lang); // 주어진 locale에 대한 i18n 인스턴스를 가져옵니다.
    setI18n(i18n); // 현재 요청에 대해 서버 측에서 사용할 수 있도록 설정합니다.

    return <AppRouterPage {...props} lang={lang} />;
  };
};
