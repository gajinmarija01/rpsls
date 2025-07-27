import React from 'react';
import styles from './Loader.module.css';

// Simple loading spinner component
const Loader: React.FC = () => (
    <div className={styles.overlay}>
        <div className={styles.loader}>
            <div className={styles.spinner} />
            <span className={styles.text}>Loading...</span>
        </div>
    </div>
)

export default Loader