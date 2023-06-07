import React from 'react';
import { Handle, Position, handleStyle } from 'reactflow';
import Image from 'next/image';

function CustomNode({ image }) {
  console.log(image);
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Image width={50} height={50} src={'/laptop.png'} />
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />
    </>
  );
}

export default CustomNode;
