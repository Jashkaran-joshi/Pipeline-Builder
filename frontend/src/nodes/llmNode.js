// llmNode.js

import { BaseNode } from '../components/BaseNode';
import styles from '../components/BaseNode.module.css';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🤖"
      leftHandles={[
        { id: `${id}-system`, label: 'system', top: '33%' },
        { id: `${id}-prompt`, label: 'prompt', top: '66%' }
      ]}
      rightHandles={[
        { id: `${id}-response`, label: 'response' }
      ]}
    >
      <div className={styles.description}>
        This is a Large Language Model node. Connect system and prompt inputs to generate a response.
      </div>
    </BaseNode>
  );
}
