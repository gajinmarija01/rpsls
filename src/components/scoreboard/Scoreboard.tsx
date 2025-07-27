
import type { PlayResponse } from '../../types';
import styles from './Scoreboard.module.css';

// Game history and scores
export default function Scoreboard({ history, onReset }: { history: PlayResponse[], onReset?: () => void }) {

    return (
        <div className={styles.panel}>
            <h2 className={styles.title}>LEADERBOARD</h2>
            {onReset && (
                <button
                    onClick={onReset}
                    className={styles.resetBtn}
                >
                    Reset
                </button>
            )}
            {/* display game history in a readable way */}
            <div>
                {history.map((game, index) => (
                    <li key={index} className={
                        styles.row + ' ' +
                        (game.results === 'win' ? styles.win : game.results === 'lose' ? styles.lose : styles.tie)
                    }>
                        <span>
                            <span className={styles.playerLabel}>
                                You:</span> {game.player}
                            <span className={styles.computerLabel}>
                                CPU:
                            </span> {game.computer}
                        </span>
                        <span className={styles.resultLabel}>{game.results.toUpperCase()}</span>
                    </li>
                ))}
            </div>
        </div>
    )
}

