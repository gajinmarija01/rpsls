import { useState } from 'react';

import { getRandomChoice } from '../../api';
import { useChoices, usePlay, useLocalStorage } from '../../hooks';
import type { PlayResponse } from '../../types';

import { ChoiceButton, ErrorBanner, GameResult, Loader, Scoreboard } from '../';
import { choiceIcons } from './Game.helpers';

import styles from './Game.module.css';

export default function GamePage() {
    // Store game history in localStorage to persist score between sessions
    const [gameHistory, setGameHistory, clearGameHistory] = useLocalStorage<PlayResponse[]>('rpsls-history', [])
    const [currentResult, setCurrentResult] = useState<PlayResponse | null>(null)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)

    const { data: choices, isError, isLoading, refetch, error } = useChoices();
    const { mutate, isPending } = usePlay();

    // Handle when user picks a choice
    const handleChoice = (choiceId: number) => {
        mutate(choiceId, {
            onSuccess: (result) => {
                setCurrentResult(result)
                // Keep only last 10 games in history
                setGameHistory((prev) => [result, ...prev].slice(0, 10))
            },
            onError: (err: any) => {
                setErrorMsg(err.message || 'Something went wrong!')
            }
        })
    }

    // Get random choice
    const handleRandomChoice = async () => {
        try {
            const randomChoice = await getRandomChoice()
            handleChoice(randomChoice.id)
        } catch (e) {
            setErrorMsg('Failed to get random choice!')
        }
    }

    const handleResetHistory = () => {
        clearGameHistory();
        setGameHistory([]);
        setCurrentResult(null);
    }

    // early return in case of loading state
    if (isLoading || isPending) {
        return (
            <main className={styles.main}>
                <Loader />
            </main>
        )
    }

    // early return in case of error
    if (errorMsg || isError) {
        return (
            <main className={styles.main}>
                <section className={styles.section}>
                    <ErrorBanner
                        message={typeof error === 'string' ? error : 'Oops! Something went wrong.'}
                        onRetry={async () => {
                            setErrorMsg(null);
                            const result = await refetch();
                            if (result.error) setErrorMsg('Oops! Something went wrong.');
                        }}
                    />
                </section>
            </main>
        )
    }

    // Main game UI - happy path
    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <div className={styles.arcadePanel}>
                    <h1 className={styles.arcadeTitle}>RPSLS ARCADE</h1>
                    <a
                        href="https://en.wikipedia.org/wiki/Rock_paper_scissors#Additional_weapons"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.rulesLink}
                    >
                        Game Rules
                    </a>
                    <div className={styles.choicesGrid}>
                        {choices?.map((choice) => (
                            <ChoiceButton
                                key={choice.id}
                                icon={choiceIcons[choice.name.toLowerCase()]}
                                label={choice.name.charAt(0).toUpperCase() + choice.name.slice(1)}
                                onClick={() => handleChoice(choice.id)}
                            />
                        ))}
                        <ChoiceButton icon={"❓"} label="Random" onClick={handleRandomChoice} />
                    </div>
                    <div className={styles.resultContainer}>
                        {currentResult ? (
                            <GameResult result={currentResult} />
                        ) : (
                            <div className={styles.resultPlaceholder}>
                                <span>Choose your weapon!</span>
                            </div>
                        )}
                    </div>
                </div>
                <aside className={styles.scoreboardContainer}>
                    <Scoreboard history={gameHistory} onReset={handleResetHistory} />
                </aside>
            </section>
        </main>
    )
}
