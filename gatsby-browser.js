import { inject } from "@vercel/analytics"

// Vercel Web Analytics, loaded once; it follows Gatsby's page changes on its own
export const onClientEntry = () => {
  inject()
}
