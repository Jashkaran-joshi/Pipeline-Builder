// delayNode.js - Delay/sleep node

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';
import styles from '../components/BaseNode.module.css';

export const DelayNode = ({ id, data }) => {
    const [delay, setDelay] = useState(data?.delay || '1000');

    const handleDelayChange = (e) => {
        setDelay(e.target.value);
    };

    return (
        <BaseNode
            id={id}
            title="Delay"
            icon="⏱️"
            leftHandles={[
                { id: `${id}-input`, label: 'input' }
            ]}
            rightHandles={[
                { id: `${id}-output`, label: 'output' }
            ]}
        >
            <div className={styles.formGroup}>
                <label className={styles.label}>Delay (ms)</label>
                <input
                    type="number"
                    value={delay}
                    onChange={handleDelayChange}
                    className={styles.input}
                    min="0"
                    step="100"
                    placeholder="1000"
                />
            </div>
            <div className={styles.description}>
                Delays execution by {delay}ms
            </div>
        </BaseNode>
    );
}
