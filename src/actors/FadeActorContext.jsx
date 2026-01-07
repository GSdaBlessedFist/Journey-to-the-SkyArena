// src/actors/FadeActorContext.js
// 2026-01-07 02:15
import { createActorContext } from '@xstate/react'
import { fadeMachine } from '@/scenes/HangarScene/composite/machines/fadeMachine'

// Create the actor context for fade
export const FadeActorContext = createActorContext(fadeMachine)
