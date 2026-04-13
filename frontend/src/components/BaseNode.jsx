// BaseNode.jsx - Reusable node abstraction component

import { Handle, Position } from 'reactflow';
import styles from './BaseNode.module.css';

export const BaseNode = ({
  id,
  title,
  icon,
  leftHandles = [],
  rightHandles = [],
  children,
  className = ''
}) => {
  return (
    <div className={`${styles.nodeWrapper} ${className}`}>
      {/* Render left handles - direct children for proper positioning */}
      {leftHandles.map((handle, index) => (
        <Handle
          key={handle.id}
          type="target"
          position={Position.Left}
          id={handle.id}
          style={{ top: handle.top || `${((index + 1) * 100) / (leftHandles.length + 1)}%` }}
        />
      ))}

      {/* Render right handles - direct children for proper positioning */}
      {rightHandles.map((handle, index) => (
        <Handle
          key={handle.id}
          type="source"
          position={Position.Right}
          id={handle.id}
          style={{ top: handle.top || `${((index + 1) * 100) / (rightHandles.length + 1)}%` }}
        />
      ))}

      {/* Node header */}
      <div className={styles.nodeHeader}>
        {icon && <div className={styles.nodeIcon}>{icon}</div>}
        <div className={styles.nodeTitle}>{title}</div>
      </div>

      {/* Node body - custom content */}
      <div className={styles.nodeBody}>
        {children}
      </div>
    </div>
  );
};
