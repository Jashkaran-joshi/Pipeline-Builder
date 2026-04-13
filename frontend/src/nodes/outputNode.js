// outputNode.js

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';
import styles from '../components/BaseNode.module.css';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="📤"
      leftHandles={[
        { id: `${id}-value`, label: 'input' }
      ]}
    >
      <div className={styles.formGroup}>
        <label className={styles.label}>Name</label>
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Type</label>
        <select value={outputType} onChange={handleTypeChange} className={styles.select}>
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </div>
    </BaseNode>
  );
}
