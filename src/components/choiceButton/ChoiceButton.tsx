import React from 'react'
import styles from './ChoiceButton.module.css';

export default function ChoiceButton({
    icon,
    onClick,
    label
}: {
    icon: React.ReactNode
    onClick: () => void
    label: string
}) {
    return (
        <button
            onClick={onClick}
            className={styles.btn}
            aria-label={label}
            title={label}
            data-testid={`choice-button-${label.toLowerCase()}`}
        >
            <span>{icon}</span>
        </button>
    )
}
