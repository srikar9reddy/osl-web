import React, { useState } from 'react';
import { FaUser, FaPhone } from 'react-icons/fa';
import Header from '../components/header';
import { getFirestore, collection, addDoc, Timestamp, doc } from 'firebase/firestore';
import app from '../firebase';
import { useNavigate, useLocation } from 'react-router-dom';

function ConfirmBooking() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingDetails } = location.state || {};

  const validatePhone = (value) => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(value)) {
      setPhoneError('Phone number must be 10 digits');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePhone(phone)) return;

    const db = getFirestore(app);
    
    try {
      for (const slot of bookingDetails.selectedSlots) {
        const startTime = new Date(bookingDetails.selectedDate);
        const [hours, minutes] = slot.time.split(':');
        startTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        
        const endTime = new Date(startTime);
        endTime.setHours(endTime.getHours() + 1);

        for (const sim of slot.sims) {
          await addDoc(collection(db, 'bookings'), {
            name,
            phone,
            startTime: Timestamp.fromDate(startTime),
            endTime: Timestamp.fromDate(endTime),
            selectedSim: doc(db, 'sims', sim.toString()) // Now 'doc' is properly imported
          });
        }
      }
      
      console.log('Bookings confirmed');
      navigate('/booking-success');
    } catch (error) {
      console.error('Error adding booking: ', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-1 p-4 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Confirm Your Booking</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label className="flex items-center mb-2">
              <FaUser className="mr-2 text-red-500" />
              Your Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-gray-800 text-white p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your full name"
            />
          </div>
          <div className="mb-6">
            <label className="flex items-center mb-2">
              <FaPhone className="mr-2 text-red-500" />
              Phone Number:
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                validatePhone(e.target.value);
              }}
              required
              className="bg-gray-800 text-white p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your 10-digit phone number"
            />
            {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Booking Summary</h2>
            <p>Date: {bookingDetails?.selectedDate.toLocaleDateString()}</p>
            {bookingDetails?.selectedSlots.map((slot, index) => (
              <p key={index}>
                Time: {slot.time}, Sims: {slot.sims.join(', ')}
              </p>
            ))}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300"
          >
            Confirm Booking
          </button>
        </form>
      </main>
    </div>
  );
}

export default ConfirmBooking;
