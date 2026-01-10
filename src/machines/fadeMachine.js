// import { createMachine, assign } from 'xstate'

// export const FADE_TYPES = {
//     SHORT: 1000,
//     MEDIUM: 2500,
//     LONG: 5000,
// }

// export const fadeMachine = createMachine({
//     id: 'fade',
//     initial: 'idle',
//     context: {
//         fadeType: 'MEDIUM',
//         duration: FADE_TYPES.MEDIUM,
//         opacity: 0,
//         onMidpoint: null,
//     },

//     states: {
//         idle: {
//             entry: assign({
//                 opacity: 0,
//                 onMidpoint: null,
//             }),

//             on: {
//                 START_FADE: {
//                     target: 'fading',
//                     actions: assign((_, event) => {
//                         // ⬅️ the ONLY place event is touched
//                         const fadeType = event.fadeType ?? 'MEDIUM'

//                         return {
//                             fadeType,
//                             duration: FADE_TYPES[fadeType] ?? FADE_TYPES.MEDIUM,
//                             opacity: 1,
//                             onMidpoint: event.onMidpoint ?? null,
//                         }
//                     }),
//                 },
//             },
//         },

//         fading: {
//             after: {
//                 MIDPOINT: 'midpoint',
//             },
//         },

//         midpoint: {
//             entry: ({ context }) => {
//                 context.onMidpoint?.()
//             },
//             after: {
//                 COMPLETE: 'idle',
//             },
//         },
//     },

//     delays: {
//         MIDPOINT: (ctx) => ctx.duration / 2,
//         COMPLETE: (ctx) => ctx.duration / 2,
//     }
// })



import { createMachine, assign } from 'xstate'

export const FADE_TYPES = {
    SHORT: 2000,
    MEDIUM: 3500,
    LONG: 5000,
}

export const fadeMachine = createMachine({
    id: 'fade',
    initial: 'idle',
    context: {
        fadeType: 'MEDIUM',
        duration: FADE_TYPES.MEDIUM,
        opacity: 0,
        onMidpoint: null,
    },

    states: {
        idle: {
            entry: assign({
                opacity: 0,
                onMidpoint: null,
            }),

            on: {
                START_FADE: {
                    target: 'fading',
                    actions: assign(({ event }) => {
                        const fadeType = event.fadeType ?? 'MEDIUM'

                        return {
                            fadeType,
                            duration: FADE_TYPES[fadeType] ?? FADE_TYPES.MEDIUM,
                            opacity: 1,
                            onMidpoint: event.onMidpoint ?? null,
                        }
                    }),
                },
            },
        },

        fading: {
            after: {
                MIDPOINT: 'midpoint',
            },
        },

        midpoint: {
            entry: ({ context }) => {
                context.onMidpoint?.()
            },
            after: {
                COMPLETE: 'fadeOut',
            },
        },
        fadeOut: {
            entry: assign({ opacity: 0 }),
            after: {
                END: 'idle',
            },
        },
    },
}, {
    delays: {
        MIDPOINT: ({ context }) => context.duration / 1.25,
        COMPLETE: ({ context }) => context.duration / 2,
    },
})