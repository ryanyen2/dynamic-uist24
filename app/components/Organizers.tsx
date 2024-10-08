import React from 'react';
import { organizers } from '../data/organizers';
import { FaLink } from 'react-icons/fa';

const Organizer: React.FC = () => {
  return (
    <div className="py-6 px-6 mt-12 border-t max-w-4xl mx-auto pt-16 sm:px-4">
      <h2 className="text-blue-500 text-2xl font-bold">Organizers</h2>
      <div className="flex flex-wrap mt-4">
        {organizers.map((organizer, index) => (
          <div key={index} className="flex items-center w-full sm:w-1/2 md:w-1/2 mb-4 space-x-4 pr-4">
            <img
              src={organizer.pfp}
              alt={`${organizer.name}'s profile`}
              className="rounded-full border object-cover sm:w-14 sm:h-14 w-14 h-14"
            />
            <div className="w-3/4">
              <a href={organizer.website} target="_blank" rel="noopener noreferrer" className="flex items-center mt-1 font-semibold hover:text-blue-500">
                {organizer.name}
              </a>
              <h4 className="text-gray-800">{organizer.title}</h4>
              <p className="text-gray-600">{organizer.institution}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Organizer;