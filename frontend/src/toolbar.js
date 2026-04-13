// toolbar.js

import { DraggableNode } from './draggableNode';
import styles from './toolbar.module.css';

export const PipelineToolbar = () => {

    return (
        <div className={styles.toolbar}>
            <div className={styles.title}>Available Nodes</div>
            <div className={styles.nodeList}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='delay' label='Delay' />
                <DraggableNode type='json' label='JSON' />
                <DraggableNode type='condition' label='Condition' />
                <DraggableNode type='merge' label='Merge' />
            </div>
        </div>
    );
};
