import React from 'react';
import { Handle, Position, handleStyle } from 'reactflow';
import Image from 'next/image';

function CustomNode({ image }) {
  console.log(image);
  return (
    <>
      {/* <Handle type="target" position={Position.Left} /> */}
      <Image width={100} height={100} src={'/careerNode_alt.png'} />
      {/* <Handle type="source" position={Position.Bottom} id="a" /> */}
      {/* <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={handleStyle}
      /> */}
    </>
  );
}

export default CustomNode;
