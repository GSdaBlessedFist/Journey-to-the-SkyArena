'use client'

import { InstructionsProvider } from './InstructionsProvider'
import { LevaProvider } from './LevaProvider'
import { PortfolioProvider } from './PortfolioProvider'

export default function ClientProviders({ children }) {
  return (
    <PortfolioProvider>
      <LevaProvider>
        <InstructionsProvider>{children}</InstructionsProvider>
      </LevaProvider>
    </PortfolioProvider>
  )
}
