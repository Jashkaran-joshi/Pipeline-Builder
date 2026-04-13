// conditionNode.js - Conditional branching node

import { BaseNode } from '../components/BaseNode';
import styles from '../components/BaseNode.module.css';

export const ConditionNode = ({ id, data }) => {
    return (
        <BaseNode
            id={id}
            title="Condition"
            icon="🔀"
            leftHandles={[
                { id: `${id}-condition`, label: 'condition' }
            ]}
            rightHandles={[
                { id: `${id}-true`, label: 'true', top: '40%' },
                { id: `${id}-false`, label: 'false', top: '60%' }
            ]}
        >
            <div className={styles.description}>
                Evaluates condition and routes to true or false output.
            </div>
        </BaseNode>
    );
}
