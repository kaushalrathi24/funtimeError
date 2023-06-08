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
import bodymovin from 'bodymovin';
import Image from 'next/image.js';
import { toast } from 'react-toastify';
import Link from 'next/link.js';

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
  // bodymovin.loadAnimation({
  //   container: element, // the dom element that will contain the animation
  //   renderer: 'svg',
  //   loop: true,
  //   autoplay: true,
  //   path: 'loader_funtimeError.json', // the path to the animation json
  // });

  let datatemp = {
    sessionId: '123',
    title: 'You',
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
  const [dest, setDest] = useState('');
  const router = useRouter();
  const [currLevel, setCurrLevel] = useState(0);
  const [currObj, setCurrObj] = useState(datatemp);

  const [resourcesTime, setResourcesTime] = useState(false);
  const [resources, setResources] = useState([]);

  // const insertNodes = (dtemp, recnodes, nodeName) => {
  //   console.log('inserting', dtemp, recnodes, nodeName);
  //   for (let i = 0; i < dtemp.nodes.length; i++) {
  //     if (dtemp.nodes[i].title === nodeName) {
  //       dtemp.nodes[i].nodes = [...recnodes];
  //       setData({ ...dtemp });
  //       break;
  //     } else {
  //       insertNodes(dtemp.nodes[i], recnodes, nodeName);
  //     }
  //   }
  // };

  const insertNodes = (dtemp, recnodes, nodeName) => {
    console.log('inserting', dtemp, recnodes, nodeName);
    for (let i = 0; i < dtemp.nodes.length; i++) {
      if (dtemp.nodes[i].title === nodeName) {
        dtemp.nodes[i].nodes = [...recnodes];
        setData({ ...dtemp });
        break;
      }
    }
  };

  const sendNode = async (nodeName) => {
    setLoading(true);
    if (!resourcesTime) {
      try {
        const res = await axios.post('/linkedin/secondNodes', {
          node: nodeName,
          sessionId: localStorage.getItem('sessionId'),
        });
        console.log(res);
        datatemp.title = res.data.name;
        datatemp.description = res.data.designation;
        insertNodes(datatemp, res.data.nodes, nodeName);
        datatemp = { ...datatemp };
        setResourcesTime(true);
      } catch (error) {
        toast.error(error);
        console.log(error);
        sendNode(nodeName);
      }
    } else {
      try {
        const res = await axios.post('/linkedin/resources', {
          start: datatemp.description,
          end: nodeName,
        });
        console.log('Resources:', res);
        if (!Array.isArray(res.data)) {
          throw Error('gpt did gpt thing');
        }
        setResources(res.data);
        setSidebar(true);
      } catch (error) {
        toast.error(error);
        console.log(error);
        sendNode(nodeName);
      }
    }
    setLoading(false);
  };

  const [timeline, setTimeline] = useState('');

  const getTimeline = async (weeks) => {
    try {
      const res = await axios.post('/linkedin/timeline', {
        start: datatemp.description,
        end: dest,
      });
      console.log('Timeline: ', res);
      setTimeline(res.data);
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
      setTimeline('');
      console.log('changed selection', nodes, edges);
      if (nodes && nodes[0]) {
        if (nodes[0].data) {
          sendNode(nodes[0].data.label);
          setDest(nodes[0].data.label);
        }
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

  const [weeks, setWeeks] = useState(0);

  const [loading, setLoading] = useState(false);
  return (
    <main className="flex min-h-screen flex-row items-center">
      <div
        className={`graph-container ${
          !sidebar ? 'grow-[2]' : 'grow-[6]'
        } relative`}
      >
        {(sidebar || loading) && (
          <div
            onClick={() => setSidebar(false)}
            className="w-full h-screen cursor-pointer bg-slate-400 opacity-70 absolute z-20"
          />
        )}
        {loading && (
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-40">
            <Image
              className="animate-spin"
              width={70}
              height={70}
              src={'/loader.png'}
              alt="loader"
            />
          </div>
        )}
        {/* <CareerGraph datam={data} /> */}
        {comp}
        <BsArrowLeft
          onClick={() => router.push('/')}
          className="cursor-pointer absolute top-0 left-0 m-10"
          size={34}
        />
        <div className="absolute top-0 right-0 flex">
          {/* <MdReplay className="cursor-pointer m-10" size={34} /> */}
          <RxExit className="cursor-pointer mt-10 mr-10" size={30} />
          <BsDownload className="cursor-pointer mt-10 mr-10" size={30} />
        </div>
      </div>
      <div
        className={`relative transition-all linear duration-400 ${
          sidebar ? 'grow max-w-2xl' : 'w-0'
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
            <div className="">
              {!resources.length ? (
                "Looks like you haven't selected any node right now."
              ) : (
                <div className="overflow-scroll">
                  <p className="text-[#fd7615] text-lg mb-3 font-bold">
                    {resources.length && 'Courses Suggested for your path.'}
                  </p>
                  {resources.map((resource, index) => {
                    return (
                      <Link target={'_blank'} className="block" href={resource}>
                        {resource}
                      </Link>
                    );
                  })}
                  <p className="mt-10">
                    How many weeks do you want to go through this path?
                  </p>
                  <input
                    value={weeks}
                    type={'number'}
                    className="border border-black rounded-md"
                    onChange={(e) => setWeeks(e.target.value)}
                  />
                  <p
                    onClick={() => getTimeline(weeks)}
                    className="text-[#fd7615] cursor-pointer"
                  >
                    Generate a plan for me.
                  </p>
                  <p className="mt-10 whitespace-pre-line">{timeline}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
