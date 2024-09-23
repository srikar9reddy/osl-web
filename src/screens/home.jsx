import React, { useState } from 'react';
import { FaCalendarAlt, FaUserCircle, FaTrophy, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';

function Home() {
  const [sections] = useState([
    {
      title: 'Quick Book',
      icon: <FaClock className="text-red-500 text-2xl mb-2" />,
      content: 'Book your next racing session now!',
      action: 'Book Now',
      page: '/booking',
    },
    {
      title: 'Upcoming Events',
      icon: <FaCalendarAlt className="text-red-500 text-2xl mb-2" />,
      content: 'F1 Grand Prix this weekend',
      action: 'View All',
    },
    {
      title: 'Your Membership',
      icon: <FaUserCircle className="text-red-500 text-2xl mb-2" />,
      content: 'Gold Member - 20% off all bookings',
      action: 'Manage',
    },
    {
      title: 'Top Racers',
      icon: <FaTrophy className="text-red-500 text-2xl mb-2" />,
      content: '1. John Doe - 1:23.456',
      action: 'See Leaderboard',
    },
  ]);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <Header />
      {/* Main Content */}
      <main className="flex-1 p-4 overflow-auto">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* F1 GIF */}
          <div className="col-span-full lg:col-span-1 h-64 md:h-96 flex justify-center items-center">
            <img src="https://media.giphy.com/media/oDSzlVeXHLsIg/giphy.gif" alt="F1 racing" className="w-full h-full object-cover rounded-lg" />
          </div>

          {/* Cards for various sections */}
          {sections.map(({ title, icon, content, action }) => (
            <div key={title} className="p-4 bg-gray-950 rounded-lg shadow transition-colors duration-300 hover:bg-red-900 text-left">
              <div className="flex flex-col items-start">
                {icon}
                <h2 className="text-lg font-semibold mb-2">{title}</h2>
              </div>
              <p className="text-gray-400 mb-4">{content}</p>
              <button className="w-[30vw] py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300" 
                onClick={() => navigate('/booking')}
              >
                {action}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
