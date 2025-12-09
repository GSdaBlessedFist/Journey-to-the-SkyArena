'use client'

import { InstructionProvider } from './InstructionsProvider'
import { PortfolioProvider } from './PortfolioProvider'

export default function ClientProviders({ children }) {
  return (
    <PortfolioProvider>
      <InstructionProvider>
        {children}
      </InstructionProvider>
    </PortfolioProvider>
  )
}
