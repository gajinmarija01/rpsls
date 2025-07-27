import styles from './ErrorBanner.module.css';

// Shows error messages with retry button
export default function ErrorBanner({ message, onRetry }: { message: string, onRetry?: () => void }) {

    return (
        <div className={styles.overlay}>
            <div className={styles.banner}>
                <span className={styles.message} data-testid="error-message">
                    {message}
                </span>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className={styles.retryBtn}
                        aria-label="Retry"
                        data-testid="retry-button"
                    >
                        Retry
                    </button>
                )}
            </div>
        </div>
    )
}

