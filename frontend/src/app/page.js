'use client';
import { AiFillAliwangwang } from 'react-icons/ai';
import { FiLogIn } from 'react-icons/fi';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import axios from '../scripts/axios.js';
import { useRouter } from 'next/navigation';
import Image from 'next/image.js';
import Link from 'next/link.js';
import { RxEnter, RxQuestionMark } from 'react-icons/rx';
import { HiOutlineUserCircle } from 'react-icons/hi';
import bodymovin from 'bodymovin';

export default function Home() {
  useEffect(() => {
    var animation = bodymovin.loadAnimation({
      container: document.getElementById('bm'), // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'loader_funtimeError.json', // the path to the animation json
    });
  }, []);

  const router = useRouter();
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = async () => {
    setLoading(true);
    if (!file) {
      return;
    }
    try {
      var formData = new FormData();
      formData.append('file', file);
      // 👇 Uploading the file using the fetch API to the server
      const res = await axios.post('/linkedin/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'ngrok-skip-browser-warning': '69420',
        },
      });
      console.log(res);
      window.localStorage.setItem('sessionId', res.data.sessionId);
      router.push('/graph');
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const [loading, setLoading] = useState(false);

  return (
    <main className="flex bg-white flex-col items-center h-screen">
      <div className="flex w-screen p-10 flex-row justify-between items-center">
        <Image
          width={100}
          height={100}
          src={'/careerNode_alt.png'}
          alt="logo"
        />
        <div className="flex flex-row gap-10 items-center">
          <p>About</p>
          <p>Pricing</p>
          <p>Help</p>
          <HiOutlineUserCircle className="cursor-pointer" size={35} />
        </div>
      </div>
      <div className="absolute bottom-0"></div>
      <div className="m-auto flex flex-col bg-white shadow-md shadow-slate-600 p-10 rounded-lg items-center">
        <label for="file" class="drop-container">
          <span class="drop-title">Drop files here</span>
          or
          <input onChange={handleFileChange} type={'file'} id="file" />
        </label>
        {/* <input onChange={handleFileChange} type={'file'} /> */}
        <div id="bm" className={`${!loading ? 'hidden' : 'hidden'} bm`} />
        {loading && (
          <Image
            className="animate-spin mt-3 mb-1"
            width={70}
            height={70}
            src={'/loader.png'}
            alt="loader"
          />
        )}
        {!loading && (
          <AiOutlineCloudUpload
            onClick={handleUploadClick}
            className="cursor-pointer"
            size={100}
          />
        )}
        <p className="text-center">Please upload .pdf files only.</p>
      </div>
    </main>
  );
}
