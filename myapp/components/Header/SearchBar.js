'use client'
import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const [searchParams, setSearchParams] = useState({
    carSeats: '',
    price: '',
    type: '',
  });
  const [searchedResults, setSearchedResults] = useState([]);
  const router = useRouter();

  const handleInputChange = (field, value) => {
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    const { carSeats, price, type } = searchParams;

    if (carSeats || price || type) {
      // Perform client-side search
      const searchResult = filterCars(searchParams);
      setSearchedResults(searchResult);

      // Update the URL with search parameters
      const query = new URLSearchParams(searchParams).toString();
      router.push(`/searchresult?${query}`);
    } else {
      console.error('At least one search parameter is required');
    }
  };

  const filterCars = ({ carSeats, price, type }) => {
    // Assuming you fetch the car data here
    const allCars = /* Fetch car data from your API or source */ [];

    return allCars.filter(
      (car) =>
        (!carSeats || car.carSeats >= carSeats) &&
        (!price || car.price <= price) &&
        (!type || car.type.toLowerCase() === type.toLowerCase())
    );
  };

  return (
    <div className="flex items-center justify-between p-6 shadow-md rounded-md">
      <div className="flex items-center space-x-4">
        <label htmlFor="carSeats" className="text-gray-500">
          Seats
        </label>
        <input
          type="number"
          id="carSeats"
          placeholder="Min seats"
          className="border-2 border-gray-200 p-2 rounded-md focus:outline-none"
          value={searchParams.carSeats}
          onChange={(e) => handleInputChange('carSeats', e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-4">
        <label htmlFor="price" className="text-gray-500">
          Price
        </label>
        <input
          type="number"
          id="price"
          placeholder="Max price"
          className="border-2 border-gray-200 p-2 rounded-md focus:outline-none"
          value={searchParams.price}
          onChange={(e) => handleInputChange('price', e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-4">
        <label htmlFor="type" className="text-gray-500">
          Type
        </label>
        <input
          type="text"
          id="type"
          placeholder="Search type..."
          className="border-2 border-gray-200 p-2 rounded-md focus:outline-none"
          value={searchParams.type}
          onChange={(e) => handleInputChange('type', e.target.value)}
        />
      </div>

      <button className="bg-primary text-white p-2 rounded-md" onClick={handleSearch}>
        <FiSearch />
      </button>
    </div>
  );
};

export default SearchBar;
