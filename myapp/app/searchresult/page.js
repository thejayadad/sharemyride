'use client'
// SearchResult.jsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CarCard from '@/components/CarList/CarCard';

const SearchResult = () => {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        // Check if all required query parameters are defined
        if (router.query.carSeats && router.query.price && router.query.type) {
          const queryParams = new URLSearchParams(router.query);
          const response = await fetch(`/api/search?${queryParams}`);
          const data = await response.json();
          setSearchResults(data);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [router.query]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {searchResults.length > 0 ? (
          searchResults.map((result) => (
            <CarCard key={result._id} car={result} />
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
