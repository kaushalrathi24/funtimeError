'use client';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  Controls,
  Background,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { structureData } from '@/scripts/structureData';
import CustomNode from './CustomNode';

function CareerGraph({ data }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

  useEffect(() => {
    let n = [];
    let e = [];
    structureData(data, null, null, n, e);
    n.push({
      id: 'node-1',
      type: 'customNode',
      image: '/laptop.png',
      position: { x: 50, y: -200 },
    });
    setNodes(n);
    setEdges(e);
    console.log(n, e);
  }, []);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div className="h-screen bg-white w-full">
      <ReactFlow
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodes={nodes}
        edges={edges}
        fitView={true}
        proOptions={{ hideAttribution: true }}
      >
        <Background />
        <Controls className="!m-12" />
        <MiniMap className="!m-12" zoomable pannable />
      </ReactFlow>
    </div>
  );
}

export default CareerGraph;
