import '@testing-library/jest-dom';
import React from 'react';

// Mock import.meta for Jest
Object.defineProperty(global, 'import', {
    value: {
        meta: {
            env: {
                VITE_API_BASE: 'https://test-api.com'
            }
        }
    }
});

// Mock CSS modules
jest.mock('*.module.css', () => ({
    overlay: 'overlay',
    bg: 'bg',
    banner: 'banner',
    message: 'message',
    retryBtn: 'retryBtn',
    btnWrap: 'btnWrap',
    loader: 'loader',
    spinner: 'spinner',
    text: 'text',
    panel: 'panel',
    title: 'title',
    resetBtn: 'resetBtn',
    row: 'row',
    win: 'win',
    lose: 'lose',
    tie: 'tie',
    main: 'main',
    section: 'section',
    arcadePanel: 'arcadePanel',
    arcadeTitle: 'arcadeTitle',
    choicesGrid: 'choicesGrid',
    arcadeResult: 'arcadeResult',
    arcadeWin: 'arcadeWin',
    arcadeLose: 'arcadeLose',
    arcadeTie: 'arcadeTie',
    buttonCircleWrap: 'buttonCircleWrap',
    buttonGridWrap: 'buttonGridWrap',
    randomBtnWrap: 'randomBtnWrap',
    btn: 'btn',
}));

// Mock components with data-testid
jest.mock('./components/loader/Loader', () => {
    return function MockLoader() {
        return React.createElement('div', { 'data-testid': 'loader' }, 'Loading...');
    };
});

jest.mock('./components/errorBanner/ErrorBanner', () => {
    return function MockErrorBanner(props: { message: string; onRetry?: () => void }) {
        return React.createElement('div', { 'data-testid': 'error-banner' }, [
            React.createElement('span', { key: 'message', 'data-testid': 'error-message' }, props.message),
            props.onRetry && React.createElement('button', {
                key: 'retry',
                onClick: props.onRetry,
                'data-testid': 'retry-button',
                'aria-label': 'Retry'
            }, 'Retry')
        ].filter(Boolean));
    };
});

jest.mock('./components/choiceButton/ChoiceButton', () => {
    return function MockChoiceButton(props: { icon?: React.ReactNode; label: string; onClick: () => void }) {
        return React.createElement('button', {
            'data-testid': `choice-button-${props.label.toLowerCase()}`,
            onClick: props.onClick,
            'aria-label': props.label,
            title: props.label
        }, props.icon);
    };
});

jest.mock('./components/scoreboard/Scoreboard', () => {
    return function MockScoreboard(props: { history: any[]; onReset?: () => void }) {
        return React.createElement('div', { 'data-testid': 'scoreboard' }, [
            React.createElement('h2', { key: 'title', 'data-testid': 'scoreboard-title' }, 'LEADERBOARD'),
            React.createElement('ul', { key: 'list', 'data-testid': 'scoreboard-list' },
                props.history.map((item, index) =>
                    React.createElement('li', {
                        key: index,
                        className: item.results,
                        'data-testid': `scoreboard-item-${index}`
                    }, item.results.toUpperCase())
                )
            ),
            props.onReset && React.createElement('button', {
                key: 'reset',
                onClick: props.onReset,
                'data-testid': 'reset-button'
            }, 'Reset')
        ].filter(Boolean));
    };
});

// Mock SVG icons with data-testid
jest.mock('./assets/RockIcon', () => {
    return function MockRockIcon(props: { className?: string }) {
        return React.createElement('svg', { 'data-testid': 'rock-icon', className: props.className });
    };
});

jest.mock('./assets/PaperIcon', () => {
    return function MockPaperIcon(props: { className?: string }) {
        return React.createElement('svg', { 'data-testid': 'paper-icon', className: props.className });
    };
});

jest.mock('./assets/ScissorsIcon', () => {
    return function MockScissorsIcon(props: { className?: string }) {
        return React.createElement('svg', { 'data-testid': 'scissors-icon', className: props.className });
    };
});

jest.mock('./assets/LizardIcon', () => {
    return function MockLizardIcon(props: { className?: string }) {
        return React.createElement('svg', { 'data-testid': 'lizard-icon', className: props.className });
    };
});

jest.mock('./assets/SpockIcon', () => {
    return function MockSpockIcon(props: { className?: string }) {
        return React.createElement('svg', { 'data-testid': 'spock-icon', className: props.className });
    };
});

// Mock environment variables
Object.defineProperty(process, 'env', {
    value: {
        VITE_API_BASE: 'https://test-api.com'
    }
});

// Global test utilities
(global as any).testUtils = {
    waitForElement: (selector: string) => new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(() => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    })
}; 