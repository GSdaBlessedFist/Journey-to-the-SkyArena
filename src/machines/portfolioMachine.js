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

    states: {
        title_screen: {
            entry: assign({ sceneName: "title" }),
            on: {
                SKIP_INTRO: 'idle',
                SET_TIME_OF_DAY: {
                    target: 'idle',
                    actions: assign({ timeOfDay: (ctx, evt) => evt.value })
                }
            }
        },

        idle: {
            entry: assign({ sceneName: "hangar" }),
            on: {
                GO_TO_OUTSIDE: 'outside',
                GO_TO_CHAPTER_ONE: 'chapter_one'
            }
        },

        outside: {
            entry: assign({ sceneName: "outside" }),
            on: {
                GO_TO_CHAPTER_ONE: 'chapter_one'
            }
        },

        chapter_one: {
            entry: [
                assign({ sceneName: "chapter_one" }),
                'loadProjectData'
            ],
            on: {
                GO_TO_CHAPTER_TWO: 'chapter_two',
                SHOW_PROJECT_DETAILS: { actions: ['displayProjectDetails'] },
                OPEN_PROJECT: { actions: ['goToProjectSite'] }
            }
        },

        chapter_two: {
            entry: [
                assign({ sceneName: "chapter_two" }),
                'loadProjectData'
            ],
            on: {
                GO_TO_CHAPTER_THREE: 'chapter_three',
                SHOW_PROJECT_DETAILS: { actions: ['displayProjectDetails'] },
                OPEN_PROJECT: { actions: ['goToProjectSite'] }
            }
        },

        chapter_three: {
            entry: [
                assign({ sceneName: "chapter_three" }),
                'resetHealthPool',
                'enemiesSpottedSequence'
            ],
            on: {
                GO_TO_IDLE: 'idle',
                GO_TO_FINAL_PROJECT: 'final_project_demo',
                START_OVER: { actions: ['recordChapterProgress'], target: 'idle' },
                EVADE: { actions: ['handleEvade'], target: 'evade_sequence' },
                STEALTH: { actions: ['handleStealth'], target: 'stealth_sequence' },
                ENGAGE: { actions: ['handleEngage'], target: 'engage_sequence' }
            }
        },

        evade_sequence: {
            entry: ['playAdditionalPowerCinematic'],
            on: {
                EVADE_SUCCESS: 'evade_success_sequence',
                EVADE_FAIL: 'evade_failed_sequence'
            }
        },
        evade_success_sequence: {
            entry: ['handleEvadeSuccess'],
            on: {
                BATTLE_AGAIN: 'chapter_three',
                CONTINUE_PORTFOLIO_EXP: 'final_project_demo'
            }
        },
        evade_failed_sequence: {
            entry: ['handleEvadeFailure', 'alertEnemyDetected'],
            always: 'engage_sequence'
        },

        stealth_sequence: {
            entry: ['theHunt'],
            on: {
                STEALTH_SUCCESS: 'stealth_success_sequence',
                STEALTH_FAIL: 'stealth_failed_sequence'
            }
        },
        stealth_success_sequence: {
            entry: ['handleStealthSuccess'],
            on: {
                BATTLE_AGAIN: 'chapter_three',
                CONTINUE_PORTFOLIO_EXP: 'final_project_demo'
            }
        },
        stealth_failed_sequence: {
            entry: ['handleStealthFailure', 'alertEnemyDetected'],
            always: 'engage_sequence'
        },

        engage_sequence: {
            entry: [],
            on: {
                SUCCESS: 'engagement_success',
                FAILURE: 'engagement_failed'
            }
        },
        engagement_success: {
            entry: ['playBattleWonCinematic', 'updateHiScore'],
            on: {
                BATTLE_AGAIN: 'chapter_three',
                CONTINUE_PORTFOLIO_EXP: 'final_project_demo'
            }
        },
        engagement_failed: {
            entry: ['updateHiScore'],
            on: {
                TRY_AGAIN: 'chapter_three',
                CONTINUE_PORTFOLIO_EXP: 'final_project_demo'
            }
        },

        final_project_demo: {
            entry: [assign({ sceneName: "final_project_demo" }), 'displayFinalDemoBillboard'],
            on: {
                GO_TO_IDLE: 'idle',
                GO_TO_CHAPTER_ONE: 'chapter_one'
            }
        }
    },

    actions: {
        fadeOutTitle: () => { },
        displayWelcomeMessage: () => { },
        displayLevaPanel: () => { },
        setTimeOfDay: assign(({ event }) => ({ timeOfDay: event.timeOfDay })),
        playGoingOutsideCinematic: () => { },
        playGearUpCinematic: () => { },
        displayControls: () => { },
        loadProjectData: () => { },
        displayProjectDetails: () => { },
        playTextReveal: () => { },
        goToProjectSite: () => { },
        recordChapterProgress: () => { },
        resetHealthPool: assign(() => ({})),
        enemiesSpottedSequence: () => { },
        handleEvade: () => { },
        handleEvadeSuccess: () => { },
        handleEvadeFailure: () => { },
        playAdditionalPowerCinematic: () => { },
        handleStealth: () => { },
        theHunt: () => { },
        handleStealthSuccess: () => { },
        handleStealthFailure: () => { },
        handleEngage: () => { },
        alertEnemyDetected: () => { },
        playBattleWonCinematic: () => { },
        updateHiScore: () => { },
        displayFinalDemoBillboard: () => { },
        openBlimpyFortsDemo: () => {
            if (typeof window !== 'undefined') {
                window.open('https://your-blimpy-forts-demo-url.com', '_blank');
            }
        },
        showUpcomingProjects: () => { }
    }
});

export default portfolioMachine;
