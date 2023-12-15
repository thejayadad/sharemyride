'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AiOutlineFileImage } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSession } from 'next-auth/react'

const CarForm = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [address, setAddress] = useState('');
  const [photos, setPhotos] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [carSeats, setCarSeats] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('sedan');
  const { data: session, status } = useSession();
  const router = useRouter();
  const CLOUD_NAME = 'socialsite';
  const UPLOAD_PRESET = 'shareride';

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return <p className={classes.accessDenied}>Access Denied</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrl = await uploadImage();

      const res = await fetch(`http://localhost:3000/api/car`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        method: 'POST',
        body: JSON.stringify({
          title,
          desc,
          address,
          imageUrl,
          extraInfo,
          pickUp: new Date(checkIn),
          dropOff: new Date(checkOut),
          carSeats,
          price,
          type,
          imageUrl,
          creator: session.user.id,
        }),
      });

      if (!res.ok) {
        throw new Error('Error occurred');
      }

      const car = await res.json();

      router.push(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async () => {
    if (!photos) return;

    const formData = new FormData();

    formData.append('file', photos);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await res.json();

      const imageUrl = data['secure_url'];

      return imageUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePhoto = (index) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}
      className='flex flex-col'
      >
        <input
          type="text"
          placeholder='Title...'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder='Description...'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          type="text"
          placeholder='Address...'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder='ExtraInfo...'
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        <input
          type="number"
          placeholder='Car Seats...'
          value={carSeats}
          onChange={(e) => setCarSeats(e.target.value)}
        />
        <input
          type="number"
          placeholder='Price...'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value='sedan'>Sedan</option>
          <option value='suv'>SUV</option>
          <option value='luxury'>Luxury</option>
          <option value='sports'>Sports</option>
          <option value='truck'>Truck</option>
          <option value='van'>Van</option>
        </select>
 

        <label htmlFor='image'>
          Upload Image <AiOutlineFileImage />
        </label>
        <input
          id='image'
          type='file'
          style={{ display: 'none' }}
          onChange={(e) => setPhotos([...photos, ...e.target.files])}
        />

        {photos.length > 0 && (
          <div className='flex gap-2 mt-2'>
            {photos.map((photo, index) => (
              <div key={index} className='relative'>
                <button
                  className='absolute top-2 right-2 bg-red-500 p-1 rounded-full text-white cursor-pointer'
                  onClick={() => handleDeletePhoto(index)}
                >
                  X
                </button>
                <img
                  src={URL.createObjectURL(photo)}
                  alt={`Preview ${index}`}
                  className='w-20 h-20 object-cover'
                />
              </div>
            ))}
          </div>
        )}

        <label htmlFor='checkIn'>Check In:</label>
        <input type='date' id='checkIn' value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />

        <label htmlFor='checkOut'>Check Out:</label>
        <input type='date' id='checkOut' value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
        <button>Create</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CarForm;
