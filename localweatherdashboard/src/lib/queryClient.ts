import { QueryClient } from "@tanstack/react-query"

/**
 * Single shared QueryClient instance. Centralizing the default options here (rather than
 * letting each provider/test construct its own) keeps cache behavior consistent everywhere
 * it's used.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Weather data doesn't change second-to-second.
    },
  },
})
