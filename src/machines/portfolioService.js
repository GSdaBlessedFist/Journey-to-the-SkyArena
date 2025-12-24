// // machines/portfolioService.js
// import { createActor } from 'xstate';
// import portfolioMachine from './portfolioMachine.js';

// // Create and start a global service
// const portfolioService = createActor(portfolioMachine).start();

// export default portfolioService


import { createActor } from 'xstate';
import portfolioMachine from './portfolioMachine.js';
import p from '../lib/imported_utilities/helpers/consoleHelper';

const SOURCE = 'portfolioService off';
const srcColor = [150, 50];

// Create the actor/service
const portfolioService = createActor(portfolioMachine);

// Wrap the service with logging on `send` and `subscribe`
const originalSend = portfolioService.send.bind(portfolioService);
portfolioService.send = (event) => {
    p(SOURCE, 24, srcColor, event, 'EVENT SENT');
    const result = originalSend(event);
    p(SOURCE, 26, srcColor, portfolioService.getSnapshot(), 'STATE AFTER SEND');
    return result;
};

const originalSubscribe = portfolioService.subscribe.bind(portfolioService);
portfolioService.subscribe = (listener) => {
    const wrappedListener = (snapshot) => {
        p(SOURCE, 33, srcColor, snapshot, 'SUBSCRIPTION CALLBACK');
        listener(snapshot);
    };
    return originalSubscribe(wrappedListener);
};

// Start the actor
portfolioService.start();
p(SOURCE, 41, srcColor, portfolioService.getSnapshot(), 'Service started');

export default portfolioService;
