import { nanoid } from 'nanoid';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },

  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3', animated: true },
];

export const structureData = (root, prev, ith, nodes, edges) => {
  ` Each root will be assigned a uuid. I.e, each node
    after all recursions.
  `;

  console.log(root, prev, ith, nodes, edges);

  const id = nanoid(); // current root node id
  let position;
  let parentNode = null;
  if (!prev) {
    position = { x: 0, y: 0 }; // initial node with person name
  } else {
    parentNode = prev.id; // parent node
    // position = {
    //   x: prev.position.x + 200,
    //   y: prev.position.y + (ith - 1) * 100,
    // };
    position = {
      // relative to parent node
      x: 200,
      y: (ith - 1) * 100,
    };
  }
  const label = root.title;

  // console.log(`Parent for ${root.title}: ${parentNode}`);

  // creating a node in the graph
  let rootNode = {
    id,
    position,
    data: { label },
    parentNode,
    sourcePosition: 'right',
    targetPosition: 'left',
  }; // transforming root to rep for graph
  nodes.push(rootNode); // rendering current root node

  // need to build edges from root to children
  if (prev) {
    const edgeId = `e${prev.id}-${id}`;
    const source = prev.id;
    const target = id;
    edges.push({ id: edgeId, source, target });
  }

  if (root.nodes) {
    for (let i = 0; i < root.nodes.length; i++) {
      // recursing to current root's children, if any.
      structureData(root.nodes[i], rootNode, i, nodes, edges);
    }
  }
};
