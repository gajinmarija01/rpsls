import { LizardIcon, PaperIcon, RockIcon, ScissorsIcon, SpockIcon } from "../../assets";
import type { PlayResponse } from "../../types";
import styles from './Game.module.css'

// Map choice names to their icons
export const choiceIcons: Record<string, React.ReactNode> = {
    rock: <RockIcon />,
    paper: <PaperIcon />,
    scissors: <ScissorsIcon />,
    lizard: <LizardIcon />,
    spock: <SpockIcon />,
};

// Get CSS class based on game result
export const getResultClass = (result: PlayResponse) => {
    return `${styles.arcadeResult} ` +
        (result.results === 'win' ? styles.arcadeWin :
            result.results === 'lose' ? styles.arcadeLose :
                styles.arcadeTie)
}

const choiceMap: Record<number, string> = {
    1: 'Rock',
    2: 'Paper',
    3: 'Scissors',
    4: 'Lizard',
    5: 'Spock'
}

// Format player choice for display
export const formatChoice = (choice: number) => {
    return choiceMap[choice] || choice.toString()
}

// Get result text with proper casing
export const getResultText = (result: string) => {
    return result.charAt(0).toUpperCase() + result.slice(1)
}

