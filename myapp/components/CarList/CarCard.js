'use client'
// CarCard.jsx
import React from 'react';

const CarCard = ({ car }) => {
  return (
    <div className="border p-4 mb-4 rounded-md">
      <img src={car.imageUrl} alt={car.title} className="w-full h-32 object-cover mb-2 rounded-md" />
      <h2 className="text-xl font-bold mb-2">{car.title}</h2>
      <p>{car.desc}</p>
      <p>Seats: {car.carSeats}</p>
      <p>Price: ${car.price}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default CarCard;
