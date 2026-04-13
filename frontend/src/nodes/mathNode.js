// mathNode.js - Math operation node

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';
import styles from '../components/BaseNode.module.css';

export const MathNode = ({ id, data }) => {
    const [operation, setOperation] = useState(data?.operation || 'add');

    const handleOperationChange = (e) => {
        setOperation(e.target.value);
    };

    return (
        <BaseNode
            id={id}
            title="Math"
            icon="➗"
            leftHandles={[
                { id: `${id}-a`, label: 'a', top: '40%' },
                { id: `${id}-b`, label: 'b', top: '60%' }
            ]}
            rightHandles={[
                { id: `${id}-result`, label: 'result' }
            ]}
        >
            <div className={styles.formGroup}>
                <label className={styles.label}>Operation</label>
                <select value={operation} onChange={handleOperationChange} className={styles.select}>
                    <option value="add">Add (+)</option>
                    <option value="subtract">Subtract (−)</option>
                    <option value="multiply">Multiply (×)</option>
                    <option value="divide">Divide (÷)</option>
                </select>
            </div>
        </BaseNode>
    );
}
