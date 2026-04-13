// jsonNode.js - JSON data node

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';
import styles from '../components/BaseNode.module.css';

export const JSONNode = ({ id, data }) => {
    const [jsonData, setJsonData] = useState(data?.json || '{\n  "key": "value"\n}');

    const handleJsonChange = (e) => {
        setJsonData(e.target.value);
    };

    return (
        <BaseNode
            id={id}
            title="JSON"
            icon="📋"
            rightHandles={[
                { id: `${id}-output`, label: 'output' }
            ]}
        >
            <div className={styles.formGroup}>
                <label className={styles.label}>JSON Data</label>
                <textarea
                    value={jsonData}
                    onChange={handleJsonChange}
                    className={styles.textarea}
                    rows={5}
                    placeholder='{"key": "value"}'
                    style={{ fontFamily: 'monospace', fontSize: '11px' }}
                />
            </div>
        </BaseNode>
    );
}
