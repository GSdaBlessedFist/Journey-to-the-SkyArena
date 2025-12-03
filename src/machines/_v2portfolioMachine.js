import { createMachine, assign } from 'xstate';
import p from '../lib/helpers/consoleHelper';
import { getTimeOfDay } from '../lib/helpers/getTimeOfDay';

const SOURCE = 'portfolioMachine';
const srcColor = [95, 35];
const { label } = getTimeOfDay();

const chapters = {
    chapter_one: { id: 1, name: "Journey to the Sky Arena", scene: "chapter_one" },
    chapter_two: { id: 2, name: "Good Times/Holiday Cheer", scene: "chapter_two" },
    chapter_three: { id: 3, name: "Danger in the Sky", scene: "chapter_three" }
};

let hiScore;
if (typeof window !== 'undefined') {
    localStorage.setItem('hiScore', 5000);
    hiScore = localStorage.getItem('hiScore') || 0;
}

// helper to update sceneName in context
const setSceneName = (key) =>
    assign(({ context, event }) => ({
        sceneName: chapters[key]?.scene || key
    }));

const portfolioMachine = createMachine({
    id: 'portfolioMachine',
    initial: 'title_screen',
    context: {
        healthPool: 10000,
        currentScore: 0,
        hiScore: hiScore,
        onChapter: chapters.chapter_one,
        timeOfDay: label,
        spotted: false,
        sceneName: "title"
    },

    // Global transitions
    on: {
        ENTER_SCENE: {
            target: ({ event }) => {
                switch (event.sceneName) {
                    case 'hangar': return '#portfolioMachine.idle'
                    case 'outside': return '#portfolioMachine.outside'
                    case 'chapter_one': return '#portfolioMachine.chapter_one'
                    case 'chapter_two': return '#portfolioMachine.chapter_two'
                    case 'chapter_three': return '#portfolioMachine.chapter_three'
                    default: return '#portfolioMachine.idle'
                }
            },
            actions: [
                'fadeOutTitle',
                ({ event }) => p(SOURCE, 79, srcColor, event.sceneName, 'sceneName')
            ],
        },
    },

    // States
    states: {
        /** ===========================
         *  TITLE SCREEN
         *  =========================== */
        title_screen: {
            entry: [setSceneName('title')],
            on: {
                SET_SKY_CONDITIONS: {
                    target: 'idle',
                    actions: [
                        'setTimeOfDay',
                        ({ event }) => p(SOURCE, 69, srcColor, event.timeOfDay)
                    ]
                },
                SKIP_INTRO: { target: 'idle' },
            },
        },

        /** ===========================
         *  IDLE / HANGAR
         *  =========================== */
        idle: {
            entry: [setSceneName('hangar')],
            on: {
                WELCOME: { target: 'idle', actions: ['displayWelcomeMessage'] },
                STYLE: { target: 'idle', actions: ['displayLevaPanel'] },
                LIFTOFF: { target: 'outside', actions: ['playGoingOutsideCinematic'] }
            }
        },

        /** ===========================
         *  OUTSIDE
         *  =========================== */
        outside: {
            entry: [setSceneName('outside')],
            on: { ASCEND: { target: 'chapter_one', actions: ['playGearUpCinematic'] } }
        },

        /** ===========================
         *  CHAPTERS
         *  =========================== */
        chapter_one: {
            entry: [setSceneName('chapter_one'), 'loadProjectData'],
            on: {
                SHOW_PROJECT_DETAILS: { target: 'chapter_one', actions: ['displayProjectDetails'] },
                CONTINUE_PORTFOLIO_EXP: { target: 'chapter_two' },
                OPEN_PROJECT: { target: 'chapter_one', actions: ['goToProjectSite'] },
                SKIP_TO_CHAPTER2: { target: 'chapter_two' }
            }
        },
        chapter_two: {
            entry: [setSceneName('chapter_two'), 'loadProjectData'],
            on: {
                SHOW_PROJECT_DETAILS: { target: 'chapter_two', actions: ['displayProjectDetails'] },
                CONTINUE_PORTFOLIO_EXP: { target: 'chapter_three' },
                SKIP_TO_CHAPTER3: { target: 'chapter_three' },
                OPEN_PROJECT: { target: 'chapter_two', actions: ['goToProjectSite'] }
            }
        },
        chapter_three: {
            entry: [setSceneName('chapter_three'), 'resetHealthPool', 'enemiesSpottedSequence'],
            on: {
                START_OVER: { target: 'idle', actions: ['recordChapterProgress'] },
                EVADE: { target: 'evade_sequence', guard: (ctx) => ctx.isNightTime === false, actions: ['handleEvade'] },
                STEALTH: { target: 'stealth_sequence', guard: (ctx) => ctx.isNightTime === true, actions: ['handleStealth'] },
                ENGAGE: { target: 'engage_sequence', actions: ['handleEngage'] },
                TIME_EXPIRED: { target: 'engage_sequence', actions: ['alertEnemyDetected'] }
            },
            after: { 10000: { target: 'engage_sequence', actions: ['alertEnemyDetected'] } }
        },

        /** ===========================
         *  EVADE PATH
         *  =========================== */
        evade_sequence: {
            entry: ['playAdditionalPowerCinematic'],
            on: {
                EVADE_SUCCESS: { target: 'evade_success_sequence' },
                EVADE_FAIL: { target: 'evade_failed_sequence' }
            }
        },
        evade_success_sequence: {
            entry: ['handleEvadeSuccess'],
            on: {
                BATTLE_AGAIN: { target: 'chapter_three' },
                CONTINUE_PORTFOLIO_EXP: { target: 'final_project_demo' }
            }
        },
        evade_failed_sequence: {
            entry: ['handleEvadeFailure', 'alertEnemyDetected'],
            always: { target: 'engage_sequence' }
        },

        /** ===========================
         *  STEALTH PATH
         *  =========================== */
        stealth_sequence: {
            entry: ['theHunt'],
            on: {
                STEALTH_SUCCESS: { target: 'stealth_success_sequence' },
                STEALTH_FAIL: { target: 'stealth_failed_sequence' }
            }
        },
        stealth_success_sequence: {
            entry: ['handleStealthSuccess'],
            on: {
                BATTLE_AGAIN: { target: 'chapter_three' },
                CONTINUE_PORTFOLIO_EXP: { target: 'final_project_demo' }
            }
        },
        stealth_failed_sequence: {
            entry: ['handleStealthFailure', 'alertEnemyDetected'],
            always: { target: 'engage_sequence' }
        },

        /** ===========================
         *  ENGAGE PATH
         *  =========================== */
        engage_sequence: {
            entry:[],
            on: {
                SUCCESS: { target: 'engagement_success' },
                FAILURE: { target: 'engagement_failed' }
            }
        },
        engagement_success: {
            entry: ['playBattleWonCinematic', 'updateHiScore'],
            on: {
                BATTLE_AGAIN: { target: 'chapter_three' },
                CONTINUE_PORTFOLIO_EXP: { target: 'final_project_demo' }
            }
        },
        engagement_failed: {
            entry: ['updateHiScore'],
            on: {
                TRY_AGAIN: { target: 'chapter_three' },
                CONTINUE_PORTFOLIO_EXP: { target: 'final_project_demo' }
            }
        },

        /** ===========================
         *  FINAL PROJECT DEMO
         *  =========================== */
        final_project_demo: {
            entry: [setSceneName('final_project_demo'), 'displayFinalDemoBillboard'],
            on: {
                GO_TO_MMO: { actions: ['openBlimpyFortsDemo'] },
                CONTINUE_PROJECTS: { actions: ['showUpcomingProjects'] },
                RETURN_TO_HANGAR: { target: 'idle' }
            }
        }
    },

    // Global actions (still reference your actions map)
    actions: {
        fadeOutTitle: (ctx, evt) => { },
        displayWelcomeMessage: (ctx, evt) => { },
        displayLevaPanel: (ctx, evt) => { },
        setTimeOfDay: assign(({ event }) => ({ timeOfDay: event.timeOfDay })),
        playGoingOutsideCinematic: (ctx, evt) => { },
        playGearUpCinematic: (ctx, evt) => { },
        displayControls: (ctx, evt) => { },
        loadProjectData: (ctx, evt) => { },
        displayProjectDetails: (ctx, evt) => { },
        playTextReveal: (ctx, evt) => { },
        goToProjectSite: (ctx, evt) => { },
        recordChapterProgress: (ctx, evt) => { },
        resetHealthPool: assign((ctx, evt) => { }),
        enemiesSpottedSequence: (ctx, evt) => { },
        handleEvade: (ctx, evt) => { },
        handleEvadeSuccess: (ctx, evt) => { },
        handleEvadeFailure: (ctx, evt) => { },
        playAdditionalPowerCinematic: (ctx, evt) => { },
        handleStealth: (ctx, evt) => { },
        theHunt: (ctx, evt) => { },
        handleStealthSuccess: (ctx, evt) => { },
        handleStealthFailure: (ctx, evt) => { },
        handleEngage: (ctx, evt) => { },
        alertEnemyDetected: (ctx, evt) => { },
        playBattleWonCinematic: (ctx, evt) => { },
        updateHiScore: (ctx, evt) => { },
        displayFinalDemoBillboard: (ctx, evt) => { },
        openBlimpyFortsDemo: (ctx, evt) => {
            if (typeof window !== 'undefined') {
                window.open('https://your-blimpy-forts-demo-url.com', '_blank');
            }
        },
        showUpcomingProjects: (ctx, evt) => { }
    }
});

export default portfolioMachine;
