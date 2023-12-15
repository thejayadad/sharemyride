'use client'
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import BookingForm from '@/components/BookingForm';

const SingleCar = (ctx) => {
  const [carDetails, setCarDetails] = useState('');
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function fetchCar() {
      try {
        const res = await fetch(`http://localhost:3000/api/car/${ctx.params.id}`, { cache: 'no-store' });

        if (!res.ok) {
          throw new Error('Error fetching car details');
        }

        const car = await res.json();
        setCarDetails(car);
      } catch (error) {
        console.error(error);
        // Handle errors, redirect to an error page, etc.
      }
    }

    fetchCar();
  }, [ctx.params.id]);

  return (
    <section className='px-4 py-12'>
      {carDetails ? (
        <>
          {carDetails?.creator?._id === session?.user?._id?.toString() ? (
            <>
              <span>Edit</span>
            </>
          ) : (
            <>
              {carDetails?.creator.username}
              <BookingForm carId={ctx.params.id} />

            </>
          )}
          <p>{carDetails?.desc}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default SingleCar;
