import React from 'react';
import { FaGlobe, FaDiscord, FaEnvelope } from 'react-icons/fa';

const Joining: React.FC = () => {
  return (
    <div className="py-6 flex flex-col sm:flex-row justify-between items-center border-t max-w-4xl mx-auto mt-8 pt-16 px-4">
      <div className="flex-1">
        <h2 className="text-blue-500 text-2xl font-bold">Joining the Workshop</h2>
        <p className="text-gray-600 mt-2 text-justify">
          To participate, please register for the workshop through the UIST registration system. 
          The workshop will be held in-person only.
        </p>
      </div>
      <div className="flex space-x-4 mt-4 sm:mt-0 sm:ml-8">
        {/* <div className="flex flex-col items-center cursor-pointer">
          <div className="w-8 h-8 bg-white border border-blue-400 rounded-md flex items-center justify-center text-blue-400">
            <FaGlobe className="text-xl" />
          </div>
          <p className="mt-2 text-sm font-semibold">Website</p>
        </div> */}
        <div className="flex flex-col items-center cursor-pointer">
          <a
            href="https://discord.gg/kVBGW5GG"
            target="_blank"
            className="w-8 h-8 bg-white border border-blue-400 rounded-md flex items-center justify-center text-blue-400">
            <FaDiscord className="text-xl" />
          </a>
          <p className="mt-2 text-sm font-semibold">Discord</p>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <div className="w-8 h-8 bg-white border border-blue-400 rounded-md flex items-center justify-center text-blue-400">
            <a href="mailto:dynamicabstractions.gmail.com"><FaEnvelope className="text-xl" /></a>
          </div>
          <p className="mt-2 text-sm font-semibold">Email</p>
        </div>
      </div>
    </div>
  );
}

export default Joining;