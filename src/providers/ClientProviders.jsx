'use client'

import { PortfolioActorContext } from '@/actors/PortfolioActorContext'
import { FadeActorContext } from '@/actors/FadeActorContext'
import { LevaProvider } from './LevaProvider'
import { InstructionsProvider } from './InstructionsProvider'

export default function ClientProviders({ children }) {
  return (
    <FadeActorContext.Provider>
      <PortfolioActorContext.Provider>
        <LevaProvider>
          <InstructionsProvider>{children}</InstructionsProvider>
        </LevaProvider>
      </PortfolioActorContext.Provider>
    </FadeActorContext.Provider>
  )
}
