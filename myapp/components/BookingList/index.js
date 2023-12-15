'use client'
// BookingList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingList = ({ userId }) => {
    const [userBookings, setUserBookings] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchUserBookings = async () => {
        try {
          console.log('Fetching user bookings for user ID:', userId);
          const response = await axios.get(`http://localhost:3000/api/booking/${userId}`);
          console.log('Response data:', response.data);
  
          const bookings = response.data;
          setUserBookings(bookings);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user bookings:', error);
          setLoading(false);
        }
      };
  
      fetchUserBookings();
    }, [userId]);
  
    console.log('Rendering BookingList with user bookings:', userBookings);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Your Bookings</h2>
          {userBookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <ul>
              {userBookings.map((booking) => (
                <li key={booking._id}>
                  {/* Display booking details here */}
                  <p>Car: {booking.name}</p>
                  <p>Pick-up Date: {new Date(booking.pickUp).toLocaleDateString()}</p>
                  <p>Drop-off Date: {new Date(booking.dropOff).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingList;
