import React from 'react';
import { FaGlobe, FaDiscord, FaEnvelope } from 'react-icons/fa';

const Joining: React.FC = () => {
  return (
    <div className="py-6 flex flex-col sm:flex-row justify-between items-center border-t max-w-4xl mx-auto mt-8 pt-16 px-4">
      <div className="flex-1">
        <h2 className="text-blue-500 text-2xl font-bold">Joining the Workshop</h2>
        <p className="text-gray-600 mt-2 text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras auctor eget lacus id cursus. 
          Nullam ac molestie nisi. Sed varius ligula in iaculis lobortis. Curabitur id est venenatis, 
          auctor urna id, finibus erat. Proin laoreet.
        </p>
      </div>
      <div className="flex space-x-4 mt-4 sm:mt-0 sm:ml-8">
        <div className="flex flex-col items-center cursor-pointer">
          <div className="w-8 h-8 bg-white border border-blue-400 rounded-md flex items-center justify-center text-blue-400">
            <FaGlobe className="text-xl" />
          </div>
          <p className="mt-2 text-sm font-semibold">Website</p>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <div className="w-8 h-8 bg-white border border-blue-400 rounded-md flex items-center justify-center text-blue-400">
            <FaDiscord className="text-xl" />
          </div>
          <p className="mt-2 text-sm font-semibold">Discord</p>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <div className="w-8 h-8 bg-white border border-blue-400 rounded-md flex items-center justify-center text-blue-400">
            <FaEnvelope className="text-xl" />
          </div>
          <p className="mt-2 text-sm font-semibold">Email</p>
        </div>
      </div>
    </div>
  );
}

export default Joining;