// mergeNode.js - Merge multiple inputs into one output

import { BaseNode } from '../components/BaseNode';
import styles from '../components/BaseNode.module.css';

export const MergeNode = ({ id, data }) => {
    return (
        <BaseNode
            id={id}
            title="Merge"
            icon="🔗"
            leftHandles={[
                { id: `${id}-input1`, label: 'input 1', top: '40%' },
                { id: `${id}-input2`, label: 'input 2', top: '60%' }
            ]}
            rightHandles={[
                { id: `${id}-output`, label: 'output' }
            ]}
        >
            <div className={styles.description}>
                Merges two inputs into a single output stream.
            </div>
        </BaseNode>
    );
}
