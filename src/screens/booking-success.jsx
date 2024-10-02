import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Header from '../components/header';

function BookingSuccess() {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <FaCheckCircle className="text-green-500 text-6xl mb-4 mx-auto" />
          <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
          <p className="text-xl mb-8">Thank you for your booking. We look forward to seeing you!</p>
          <div className="space-y-4">
            <Link 
              to="/" 
              className="block w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300"
            >
              Return to Home
            </Link>
            <Link 
              to="/booking" 
              className="block w-full py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors duration-300"
            >
              Make Another Booking
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BookingSuccess;