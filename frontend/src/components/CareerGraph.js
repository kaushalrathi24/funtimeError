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

function CareerGraph({ datam }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [data, setData] = useState(datam);

  console.log('DATA from GRAPH,', data, datam);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

  useEffect(() => {
    let n = [];
    let e = [];
    structureData(datam, null, null, n, e);
    n.push({
      id: 'node-1',
      type: 'customNode',
      image: '/careerNode_alt.png',
      position: { x: 25, y: -70 },
    });
    setNodes(n);
    setEdges(e);
    console.log(n, e);
  }, [datam]);

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
        <MiniMap nodeColor={'#fd7615'} className="!m-12" zoomable pannable />
      </ReactFlow>
    </div>
  );
}

export default CareerGraph;
