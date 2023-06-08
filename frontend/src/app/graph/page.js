'use client';
import CareerGraph from '@/components/CareerGraph';
import { useState, useCallback, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import {
  BsArrowLeft,
  BsDownload,
  BsFillArrowLeftCircleFill,
} from 'react-icons/bs';
import { RxExit } from 'react-icons/rx';
import { MdReplay } from 'react-icons/md';
import { useReactFlow } from 'reactflow';
import { useRouter } from 'next/navigation';
import axios from '../../scripts/axios.js';
import { useOnSelectionChange } from 'reactflow';

// const data = {
//   sessionId: '123',
//   title: 'Anirudh Mishra',
//   description: 'Student',
//   nodes: [
//     {
//       title: 'Technical',
//       description: 'lorem',
//       nodes: [
//         {
//           title: 'Database Developer',
//           description: 'lorem',
//         },
//         {
//           title: 'Software Developer',
//           description: 'lorem',
//         },
//         {
//           title: 'Frontend Developer',
//           description: 'lorem',
//           nodes: [
//             {
//               title: 'Cross Platform',
//               description: 'lorem',
//             },
//             {
//               title: 'Frontend Security',
//               description: 'lorem',
//             },
//             {
//               title: 'Full Stack Developer',
//               description: 'lorem',
//             },
//           ],
//         },
//       ],
//     },
//     {
//       title: 'Management',
//       description: 'lorem',
//     },
//     {
//       title: 'Analyst',
//       description: 'lorem',
//     },
//   ],
// };

export default function Home() {
  let datatemp = {
    sessionId: '123',
    title: 'Anirudh Mishra',
    description: 'Student',
    nodes: [
      {
        title: 'Technical',
        description: 'lorem',
        nodes: [],
      },
      {
        title: 'Management',
        description: 'lorem',
        nodes: [],
      },
      {
        title: 'Analyst',
        description: 'lorem',
        nodes: [],
      },
    ],
  };
  const [data, setData] = useState(datatemp);
  const router = useRouter();
  const [currLevel, setCurrLevel] = useState(0);
  const [currObj, setCurrObj] = useState(data);

  const sendNode = async (nodeName) => {
    try {
      const res = await axios.post('/linkedin/secondNodes', {
        node: nodeName,
        sessionId: localStorage.getItem('sessionId'),
      });
      console.log(res);
      for (let i = 0; i < data.nodes.length; i++) {
        if (datatemp.nodes[i].title === nodeName) {
          console.log(datatemp.nodes[i]);
          datatemp.nodes[i].nodes = res.data.nodes;
          datatemp.nodes[i].nodes = [...res.data.nodes];

          setData({ ...datatemp });
        }
      }
      datatemp = { ...datatemp };
    } catch (error) {
      console.log(error);
    }
  };

  const [comp, setComp] = useState(<CareerGraph datam={data} />);

  useEffect(() => {
    console.log(data);
    setComp(<CareerGraph datam={data} />);
  }, [data]);

  useOnSelectionChange({
    onChange: ({ nodes, edges }) => {
      console.log('changed selection', nodes, edges);
      if (nodes && nodes[0]) {
        if (nodes[0].data) sendNode(nodes[0].data.label);
      }
    },
  });

  const reactFlowInstance = useReactFlow();
  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      console.log(entry);
      reactFlowInstance.fitView();
    }
  });
  const [sidebar, setSidebar] = useState(false);
  useEffect(() => {
    resizeObserver.observe(document.querySelector('.graph-container'));
  });

  const getNode = async (nodeName) => {
    const sessionId = window.localStorage.getItem('sessionId');
    // try {
    //   const res = await axios.post("/")
    // }
  };
  return (
    <main className="flex min-h-screen flex-row items-center">
      <div
        className={`graph-container ${
          !sidebar ? 'grow-[2]' : 'grow-[6]'
        } relative`}
      >
        {sidebar && (
          <div
            onClick={() => setSidebar(false)}
            className="w-full h-screen cursor-pointer bg-slate-400 opacity-70 absolute z-20"
          />
        )}
        {/* <CareerGraph datam={data} /> */}
        {comp}
        <BsArrowLeft
          onClick={() => router.push('/')}
          className="cursor-pointer absolute top-0 left-0 m-10"
          size={44}
        />
        <div className="absolute top-0 right-0 flex">
          <MdReplay className="cursor-pointer m-10" size={44} />
          <RxExit className="cursor-pointer mt-10 mr-10" size={40} />
          <BsDownload className="cursor-pointer mt-10 mr-10" size={40} />
        </div>
      </div>
      <div
        className={`relative transition-all linear duration-400 ${
          sidebar ? 'grow' : 'w-0'
        }`}
      >
        <div
          onClick={() => setSidebar(!sidebar)}
          className={`absolute -translate-y-1/2 cursor-pointer z-30 left-0 -ml-12 top-1/2  ${
            !sidebar ? 'bg-slate-200' : 'bg-slate-200'
          } hover:bg-slate-300
           w-12 h-44 flex items-center justify-center rounded-l-2xl`}
        >
          {sidebar ? <FiChevronRight size={32} /> : <FiChevronLeft size={32} />}
        </div>
        <div
          onClick={() => setSidebar(true)}
          className={`w-full flex justify-center items-center min-h-screen ${
            !sidebar ? 'bg-slate-200 cursor-pointer' : 'bg-white'
          } ${!sidebar && 'hover:bg-slate-300'}`}
        >
          {sidebar && (
            <div className="w">
              Looks like you haven't selected any node right now.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
