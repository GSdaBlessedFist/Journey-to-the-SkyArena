// 2026-01-07 01:34
'use client'
import { useEffect } from 'react'
import { PortfolioActorContext } from '@/actors/PortfolioActorContext'

export default function PortfolioActorProbe() {
  const state = PortfolioActorContext.useSelector((s) => s)

  useEffect(() => {
    console.log('[PortfolioActorProbe]', state.value)
  }, [state])

  return null
}
