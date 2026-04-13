// textNode.js - Will be enhanced with auto-resize and dynamic handles in Part 3

import { useState, useEffect } from 'react';
import { BaseNode } from '../components/BaseNode';
import styles from '../components/BaseNode.module.css';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Extract variables from text (dynamic handles will be implemented in Part 3)
  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [...currText.matchAll(regex)];
    const uniqueVars = [...new Set(matches.map(m => m[1]))];
    setVariables(uniqueVars);
  }, [currText]);

  // Generate dynamic left handles for variables
  const leftHandles = variables.map((varName, idx) => ({
    id: `var-${varName}`,
    label: varName,
    top: `${((idx + 1) * 100) / (variables.length + 1)}%`
  }));

  return (
    <BaseNode
      id={id}
      title="Text"
      icon="📝"
      leftHandles={leftHandles}
      rightHandles={[
        { id: `${id}-output`, label: 'output' }
      ]}
    >
      <div className={styles.formGroup}>
        <label className={styles.label}>Text Content</label>
        <textarea
          value={currText}
          onChange={handleTextChange}
          className={styles.textarea}
          rows={Math.max(3, currText.split('\n').length)}
          style={{
            minWidth: '180px',
            width: `${Math.max(180, Math.min(350, currText.split('\n').reduce((max, line) => Math.max(max, line.length * 7), 0)))}px`
          }}
          placeholder="Enter text with {{variables}}"
        />
      </div>
      {variables.length > 0 && (
        <div className={styles.description}>
          Variables: {variables.join(', ')}
        </div>
      )}
    </BaseNode>
  );
}
