/*
 * For more info see
 * https://nextjs.org/docs/app/building-your-application/routing/internationalization
 * */
import { type NextRequest, NextResponse } from "next/server";

import Negotiator from "negotiator";
import { languageConfig, type Locale } from "./src/shared/locale/lib/languages";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // pathname에 지원되는 locale이 있는지 확인합니다.
  const pathnameHasLocale = languageConfig.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // locale이 없는 경우 리디렉션
  const locale = getRequestLocale(
    request.headers,
    request.cookies.get("ARCHI_COMMUNITY_LOCALE")?.value
  );
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. /products에 대한 요청은
  // URL이 /en/products로 변경됩니다.
  return NextResponse.redirect(request.nextUrl);
}

function getRequestLocale(
  requestHeaders: Headers,
  cookieLocale: string | undefined
) {
  // 쿠키가 있고 지원되는 locale인 경우 해당 값 사용
  if (cookieLocale && languageConfig.locales.includes(cookieLocale as Locale)) {
    return cookieLocale;
  }

  const langHeader = requestHeaders.get("accept-language") || undefined;
  const languages = new Negotiator({
    headers: { "accept-language": langHeader },
  }).languages(languageConfig.locales.slice());

  const activeLocale = languages[0] || "en";

  return activeLocale;
}

export const config = {
  matcher: [
    /*
     * 다음을 제외한 모든 요청 경로를 일치시킵니다:
     * - _next/static(정적 파일)
     * - _next/image(이미지 최적화 파일)
     * - favicon.ico(파비콘 파일)
     * - 이미지 - .svg, .png, .jpg, .jpeg, .gif, .webp
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
