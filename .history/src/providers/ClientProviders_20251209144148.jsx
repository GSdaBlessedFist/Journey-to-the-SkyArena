'use client'

import { InstructionsProvider } from './InstructionsProvider'
import { PortfolioProvider } from './PortfolioProvider'

export default function ClientProviders({ children }) {
  return (
    <PortfolioProvider>
      <InstructionsProvider>
        {children}
      </InstructionProvider>
    </PortfolioProvider>
  )
}
