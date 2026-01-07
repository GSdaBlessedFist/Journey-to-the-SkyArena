'use client'

import { PortfolioActorContext } from '@/actors/PortfolioActorContext'
import { FadeActorContext } from '@/actors/FadeActorContext'
import { PortfolioProvider } from './PortfolioProvider'
import { LevaProvider } from './LevaProvider'
import { InstructionsProvider } from './InstructionsProvider'

export default function ClientProviders({ children }) {
  return (
    <PortfolioActorContext.Provider>
      <FadeActorContext.Provider>
        <PortfolioProvider>
          <LevaProvider>
            <InstructionsProvider>{children}</InstructionsProvider>
          </LevaProvider>
        </PortfolioProvider>
      </FadeActorContext.Provider>
    </PortfolioActorContext.Provider>
  )
}
