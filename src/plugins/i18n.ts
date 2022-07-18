import { ComponentInternalInstance } from "vue";
import { createI18n, useI18n } from "vue-i18n";

export function i18n(currentInstance: ComponentInternalInstance) {
  if (typeof navigator === "undefined") return { t: (text: string) => text };

  const app = currentInstance.appContext.app;
  app.use(
    createI18n({
      locale: navigator.language,
      fallbackLocale: "en",
    })
  );

  const { t } = useI18n();
  return { t };
}
