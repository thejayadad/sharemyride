'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from 'next-auth/react';


const CarForm = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [address, setAddress] = useState('');
    const [photos, setPhotos] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [start, setStart] = useState('');
    const [finish, setFinish] = useState('');
    const [carSeats, setCarSeats] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('sedan');
    const { data: session, status } = useSession();
    const router = useRouter();
  
    if (status === 'loading') {
      return <p className='text-center'>Loading...</p>;
    }
  
    if (status === 'unauthenticated') {
      return <p className='text-center'>Access Denied</p>;
    }
  
    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files);
    
        if (files.length > 5) {
          toast.error('You can only upload up to 5 photos.');
          return;
        }
    
        setPhotos((prevPhotos) => [...prevPhotos, ...files]);
    
        const previewContainer = document.getElementById('previewContainer');
    
        if (previewContainer) {
          previewContainer.innerHTML = '';
    
          files.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = () => {
              const img = document.createElement('img');
              img.src = reader.result;
              img.alt = `Preview ${index}`;
              img.className = 'w-20 h-20 object-cover';
    
              previewContainer.appendChild(img);
            };
            reader.readAsDataURL(file);
          });
        }
      };
      
  
    const handleDeletePhoto = (index) => {
      const newPhotos = [...photos];
      newPhotos.splice(index, 1);
      setPhotos(newPhotos);
  
      const previewContainer = document.getElementById('previewContainer');
      if (previewContainer) {
        previewContainer.innerHTML = '';
        newPhotos.forEach((photo, index) => {
          const img = document.createElement('img');
          img.src = URL.createObjectURL(photo);
          img.alt = `Preview ${index}`;
          img.className = 'w-30 h-30 object-cover';
          previewContainer.appendChild(img);
        });
      }
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        // if (!title || !desc || !address || !extraInfo || !start || !finish || !carSeats || !price || !type) {
        //   toast.error('All fields are required');
        //   return;
        // }
      
        try {
     
          const res = await fetch(`http://localhost:3000/api/car`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.user?.accessToken}`,
              },
              body: JSON.stringify({
                creator: session.user.id,
                title,
                address,
                photos,
                desc,
                extraInfo,
                availableStart: new Date(start),
                availableFinish: new Date(finish),
                carSeats,
                price,
                type 
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

     
      

  return (
    <div className='max-w-screen-xl mx-auto'>

      <form onSubmit={handleSubmit} className='flex flex-col gap-3 max-w-screen-md mx-auto'>
        <input 
        className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        value={title}
        id='title'
        type='text' placeholder='Title...' onChange={(e) => setTitle(e.target.value)} />
        <textarea 
        value={desc}
        id='desc'
        className="flex h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder='Description...' onChange={(e) => setDesc(e.target.value)} />
        <input 
        value={address}
        id='address'
         className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
     
        type='text' placeholder='Address...' onChange={(e) => setAddress(e.target.value)} />
         <div className='flex gap-6 h-36'>
          {photos.map((photo, index) => (
            <div key={index} className='relative'>
              <button
                className='absolute top-2 right-2 bg-red-500 p-1 rounded-full text-white cursor-pointer'
                onClick={() => handleDeletePhoto(index)}
              >
                X
              </button>
              <img key={index} src={URL.createObjectURL(photo)} alt={`Preview ${index}`} className='w-20 h-20 object-cover' />
            </div>
          ))}
        </div>
        <div className='flex flex-col gap-3'>
      <label className='text-sm text-gray-500'>Upload Photos</label>
        <div className='relative'>
            <input
            type='file'        
            multiple
            onChange={handlePhotoChange}
            className='hidden'
            id='photos'
            accept='image/*'
            />
            <label
            htmlFor='photos'
            className='cursor-pointer bg-primary text-white p-2 rounded-md'
            >
            Choose Photos
            </label>
        </div>
        </div>
        <input
        value={extraInfo}
        id='value'
          className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        type='text' placeholder='ExtraInfo...' onChange={(e) => setExtraInfo(e.target.value)} />
        <select
        value={type}
        id='type'
        className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        onChange={(e) => setType(e.target.value)}>
          <option value='sedan'>Sedan</option>
          <option value='suv'>SUV</option>
          <option value='luxury'>Luxury</option>
          <option value='sports'>Sports</option>
          <option value='truck'>Truck</option>
          <option value='van'>Van</option>
        </select>
        <div className='flex items-center gap-3 justify-center'>
            <div className='flex flex-col gap-1 items-center'>
                <label className='text-sm text-mildOrange'>Available Start</label>
                <input
                id='date'
                type='date'
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className='rounded-md border border-input px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                />
            </div>
            <div className='flex flex-col gap-1 items-center'>
                <label className='text-sm text-mildOrange'>Available Finish</label>
                <input
                id='date'
                type='date'
                value={finish}
                onChange={(e) => setFinish(e.target.value)}
                className='rounded-md border border-input px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                />
            </div>
            </div>


        <input 
        value={carSeats}
         className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

        type='number' placeholder='CarSeats...' onChange={(e) => setCarSeats(e.target.value)} />
       <input 
       value={price}
        className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  
        type='number' placeholder='Price...' onChange={(e) => setPrice(e.target.value)} />

        <button>Create</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CarForm;
