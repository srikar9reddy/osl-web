import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaGamepad, FaLock, FaTimes } from 'react-icons/fa';
import Header from '../components/header';

function Booking() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState([]);

  const timeSlots = [
    { id: 1, time: '12:00', available: 2, price: 999, blocked: [3, 4] },
    { id: 2, time: '13:00', available: 4, price: 999, blocked: [1] },
    { id: 3, time: '14:00', available: 1, price: 999, blocked: [2, 3, 4] },
    { id: 4, time: '15:00', available: 3, price: 999, blocked: [4] },
    { id: 5, time: '16:00', available: 0, price: 999, blocked: [1, 2, 3, 4] },
    { id: 6, time: '17:00', available: 4, price: 999, blocked: [] },
    { id: 7, time: '18:00', available: 2, price: 999, blocked: [3, 4] },
    { id: 8, time: '19:00', available: 3, price: 999, blocked: [2] },
    { id: 9, time: '20:00', available: 4, price: 999, blocked: [] },
  ];

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate >= today) {
      setSelectedDate(selectedDate);
    }
  };

  const handleSlotSelection = (slotId, simNum) => {
    setSelectedSlots(prevSlots => {
      const existingSlotIndex = prevSlots.findIndex(slot => slot.id === slotId);
      if (existingSlotIndex !== -1) {
        const updatedSlots = [...prevSlots];
        const existingSlot = updatedSlots[existingSlotIndex];
        if (existingSlot.sims.includes(simNum)) {
          existingSlot.sims = existingSlot.sims.filter(num => num !== simNum);
          if (existingSlot.sims.length === 0) {
            updatedSlots.splice(existingSlotIndex, 1);
          }
        } else {
          existingSlot.sims.push(simNum);
        }
        return updatedSlots;
      } else {
        return [...prevSlots, { id: slotId, sims: [simNum] }];
      }
    });
  };

  const clearSelectedSlots = () => {
    setSelectedSlots([]);
  };

  const handleDeselectSlot = (slotId) => {
    setSelectedSlots(prevSlots => prevSlots.filter(slot => slot.id !== slotId));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-1 p-4 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Book Your Racing Session</h1>
        <div className="mb-6">
          <label className="flex items-center mb-2">
            <FaCalendarAlt className="mr-2 text-red-500" />
            Select Date:
          </label>
          <input
            type="date"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={handleDateChange}
            min={new Date().toISOString().split('T')[0]}
            className="bg-gray-800 text-white p-2 rounded w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div>
          <label className="flex items-center mb-2">
            <FaClock className="mr-2 text-red-500" />
            Available Time Slots:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {timeSlots.map((slot) => (
              <div
                key={slot.id}
                className={`p-4 rounded-lg transition-colors duration-300 ${
                  slot.available > 0
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-700 text-gray-500'
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold">{slot.time}</span>
                  <span className="text-lg">₹{slot.price}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <FaGamepad className="text-xl mr-2" />
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        onClick={() => handleSlotSelection(slot.id, num)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          selectedSlots.find(s => s.id === slot.id && s.sims.includes(num))
                            ? 'bg-red-600 text-white'
                            : slot.blocked.includes(num)
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            : num <= slot.available
                            ? 'bg-gray-600 text-white hover:bg-red-900'
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={slot.blocked.includes(num) || num > slot.available}
                      >
                        {slot.blocked.includes(num) ? <FaLock /> : num}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  {slot.available} sim{slot.available !== 1 ? 's' : ''} available
                </p>
              </div>
            ))}
          </div>
        </div>
        {selectedSlots.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-bold">Selected Slots:</p>
              <button
                onClick={clearSelectedSlots}
                className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300 flex items-center"
              >
                <FaTimes className="mr-2" />
                Clear All
              </button>
            </div>
            {selectedSlots.map(slot => (
              <div key={slot.id} className="flex items-center mt-2">
                <span className="mr-2">{timeSlots.find(s => s.id === slot.id).time}:</span>
                {slot.sims.map(sim => (
                  <button
                    key={sim}
                    onClick={() => handleSlotSelection(slot.id, sim)}
                    className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 hover:bg-red-700"
                  >
                    {sim}
                  </button>
                ))}
                <button
                  onClick={() => handleDeselectSlot(slot.id)}
                  className="ml-2 bg-gray-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
            <p className="mt-4">Total Price: ₹{selectedSlots.reduce((total, slot) => {
              const timeSlot = timeSlots.find(s => s.id === slot.id);
              return total + (timeSlot.price * slot.sims.length);
            }, 0)}</p>
            <button className="mt-4 py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300">
              Confirm Booking
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Booking;