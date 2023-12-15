'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/car');
        setCars(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <section className='mt-8 bg-orange-400 p-8 max-w-screen-lg mx-auto'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border rounded-xl">
          <thead>
            <tr>
              <th className="border p-3 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photos</th>
              <th className="border p-3 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="border p-3 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Desc</th>
              <th className="border p-3 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="border p-3 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CarSeats</th>
              <th className="border p-3 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
            </tr>
          </thead>
          <tbody className='bg-transparent divide-y divide-gray-200'>
            <AnimatePresence>
              {cars.map((car) => (
                <motion.tr key={car._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <td className="border p-3 px-6 py-3">{/* Car Photos here */}</td>
                  <td className="border p-3 px-6 py-3">{car.title}</td>
                  <td className="border p-3 px-6 py-3">{car.desc}</td>
                  <td className="border p-3 px-6 py-3">{car.price}</td>
                  <td className="border p-3 px-6 py-3">{car.carSeats}</td>
                  <td className="border p-3 px-6 py-3"><Link href={`/car/${car._id}`}>Details</Link></td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      )}
    </section>
  );
};

export default CarList;
