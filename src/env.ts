// @ts-ignore
const env = import.meta.env

export const { VITE_LOGIN_URL, SENTRY_DSN, VITE_INVITATION_REDEEM_URL, VITE_PYLON_URL } = env as Record<string, string>
