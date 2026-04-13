// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap, MarkerType } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { MathNode } from './nodes/mathNode';
import { DelayNode } from './nodes/delayNode';
import { JSONNode } from './nodes/jsonNode';
import { ConditionNode } from './nodes/conditionNode';
import { MergeNode } from './nodes/mergeNode';

import 'reactflow/dist/style.css';
import './reactflow-custom.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

// Premium edge styling with smooth curves, glow, and arrows
const defaultEdgeOptions = {
  type: 'smoothstep',
  animated: true,
  style: {
    stroke: '#818cf8',
    strokeWidth: 2,
    filter: 'drop-shadow(0 0 4px rgba(129, 140, 248, 0.4))',
  },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
    color: '#818cf8',
  },
};

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  math: MathNode,
  delay: DelayNode,
  json: JSONNode,
  condition: ConditionNode,
  merge: MergeNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  }

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, addNode, getNodeID]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Enhanced onInit with fitView
  const onInit = (instance) => {
    setReactFlowInstance(instance);
    instance.fitView({ padding: 0.2 });
  };

  return (
    <>
      <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={onInit}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          snapToGrid={true}
          connectionLineType='smoothstep'
          connectionLineStyle={{
            stroke: '#818cf8',
            strokeWidth: 2,
          }}
          fitView
          minZoom={0.2}
          maxZoom={4}
        >
          <Background
            color="#475569"
            gap={gridSize}
            variant="dots"
            style={{ backgroundColor: '#0f172a' }}
          />
          <Controls
            style={{
              button: {
                backgroundColor: '#1e293b',
                color: '#f1f5f9',
                borderColor: '#334155',
              }
            }}
          />
          <MiniMap
            nodeColor={(node) => {
              switch (node.type) {
                case 'customInput': return '#10b981';
                case 'customOutput': return '#ef4444';
                case 'llm': return '#8b5cf6';
                case 'text': return '#6366f1';
                default: return '#64748b';
              }
            }}
            maskColor="rgba(15, 23, 42, 0.8)"
            style={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
            }}
          />
        </ReactFlow>
      </div>
    </>
  )
}
