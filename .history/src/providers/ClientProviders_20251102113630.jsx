'use client'

import { PortfolioProvider } from './PortfolioProvider'

export default function ClientProviders({ children }) {
  return <PortfolioProvider>{children}</PortfolioProvider>
}
