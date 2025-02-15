export {}

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData?: string
        initDataUnsafe?: TelegramWebAppInitData
        init: () => void
      }
    }
  }
}
