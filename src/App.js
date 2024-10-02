import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './screens/home';
import Booking from './screens/booking';
import ConfirmBooking from './screens/confirm-booking';
import BookingSuccess from './screens/booking-success';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/confirm-booking" element={<ConfirmBooking />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
