'use client'
import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = () => {
  return (
    <div className="flex items-center justify-between bg-secondary p-6 shadow-md rounded-md">
      <div className="flex items-center space-x-4">
        <label htmlFor="city" className="text-gray-500">City</label>
        <input
          type="text"
          id="city"
          placeholder="Search city..."
          className="border-2 border-gray-200 p-2 rounded-md focus:outline-none"
        />
      </div>
      
      <div className="flex items-center space-x-4">
        <label htmlFor="seats" className="text-gray-500">Seats</label>
        <input
          type="number"
          id="seats"
          placeholder="Min seats"
          className="border-2 border-gray-200 p-2 rounded-md focus:outline-none"
        />
      </div>

      <div className="flex items-center space-x-4">
        <label htmlFor="price" className="text-gray-500">Price</label>
        <input
          type="number"
          id="price"
          placeholder="Max price"
          className="border-2 border-gray-200 p-2 rounded-md focus:outline-none"
        />
      </div>

      <button className="bg-primary text-white p-2 rounded-md">
        <FiSearch />
      </button>
    </div>
  );
};

export default SearchBar;
