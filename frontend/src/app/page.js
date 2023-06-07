'use client';
import { AiFillAliwangwang } from 'react-icons/ai';
import { FiLogIn } from 'react-icons/fi';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useState } from 'react';
import axios from '../scripts/axios.js';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = async () => {
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
  };

  return (
    <main className="flex bg-white flex-col items-center h-screen">
      <AiFillAliwangwang
        className="cursor-pointer absolute top-0 left-0 m-10"
        size={44}
      />
      <FiLogIn
        className="cursor-pointer absolute top-0 right-0 m-10"
        size={44}
      />
      <p className="absolute top-0 left-1/2 mt-10 text-2xl -translate-x-1/2">
        Career Node
      </p>
      <div className="m-auto flex flex-col items-center">
        <input onChange={handleFileChange} type={'file'} />
        <AiOutlineCloudUpload
          onClick={handleUploadClick}
          className="cursor-pointer"
          size={100}
        />
        <p className="text-center">resume.pdf</p>
      </div>
    </main>
  );
}
