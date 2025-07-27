import type { PlayResponse } from '../../types'
import { formatChoice, getResultClass, getResultText } from './Game.helpers'
import styles from './Game.module.css'

interface GameResultProps {
    result: PlayResponse
}

// Shwos the result of the last game
export default function GameResult({ result }: GameResultProps) {
    return (
        <div className={getResultClass(result)}>
            <span>
                You chose{' '}
                <span className={styles.playerChoice}>
                    {formatChoice(result.player)}
                </span>, Computer chose{' '}
                <span className={styles.computerChoice}>
                    {formatChoice(result.computer)}
                </span>.
            </span>
            <span className={styles.resultText}>{getResultText(result.results)}</span>
        </div>
    )
} 