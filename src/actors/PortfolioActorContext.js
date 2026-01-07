// 2026-01-07 01:02
import portfolioMachine from '@/machines/portfolioMachine'
import { createActorContext } from '@xstate/react'


export const PortfolioActorContext =
    createActorContext(portfolioMachine)