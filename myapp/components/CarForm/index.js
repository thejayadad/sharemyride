'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSession } from 'next-auth/react'

const CarForm = () => {
    
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [address, setAddress] = useState("")
    const [photos, setPhotos] = useState('')
    const [extraInfo, setExtraInfo] = useState('')
    const [pickUp, setPickUp] = useState('')
    const [dropOff, setDropOff] = useState('')
    const [carSeats, setCarSeats] = useState('')
    const [price, setPrice] = useState('')


        const { data: session, status } = useSession()
    const router = useRouter()


    if (status === 'loading') {
        return <p>Loading...</p>
    }

    if (status === 'unauthenticated') {
        return <p>
            Access Denied
        </p>
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title || !desc || !address || !photos || !extraInfo || !pickUp || !dropOff || !carSeats || !price) {
            toast.error("All fields are required")
            return
        }

        try {

            const res = await fetch(`http://localhost:3000/api/car`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.user?.accessToken}`
                },
                method: 'POST',
                body: JSON.stringify({ title, desc, address, photos, extraInfo, pickUp, dropOff, carSeats, price, creator: session?.user?._id })
            })

            if (!res.ok) {
                throw new Error("Error occured")
            }

            const car = await res.json()

            router.push(`/`)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='max-w-screen-xl mx-auto'>
        <form onSubmit={handleSubmit}
        className='flex flex-col'
        >
                    <input type="text" placeholder='Title...' onChange={(e) => setTitle(e.target.value)} />
                    <textarea placeholder='Description...' onChange={(e) => setDesc(e.target.value)} />
                    <input type="text" placeholder='Address...' onChange={(e) => setAddress(e.target.value)} />
                    <input type="text" placeholder='Photos...' onChange={(e) => setPhotos(e.target.value)} />
                    <input type="text" placeholder='ExtraInfo...' onChange={(e) => setExtraInfo(e.target.value)} />
                    <input type="number" placeholder='PickUp...' onChange={(e) => setPickUp(e.target.value)} />
                    <input type="number" placeholder='DropOff...' onChange={(e) => setDropOff(e.target.value)} />
                    <input type="number" placeholder='CarSeats...' onChange={(e) => setCarSeats(e.target.value)} />
                    <input type="number" placeholder='Price...' onChange={(e) => setPrice(e.target.value)} />

                    <button>Create</button>
                </form>
            <ToastContainer />
    </div>
  )
}

export default CarForm