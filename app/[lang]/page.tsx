import { LocaleSwitcher } from "@/src/shared/locale/ui/locale-switcher";
import { withLinguiPage } from "@/src/shared/locale/ui/with-lingui";
import { Trans, useLingui } from "@lingui/react";

export default withLinguiPage(function Home() {
  const { i18n } = useLingui();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>{i18n._("Welcome to Naver!")}</h1>

        <LocaleSwitcher />

        <Trans id="greeting">
          Welcome to <a href="https://naver.com">Naver!</a>
        </Trans>
      </main>
    </div>
  );
});
