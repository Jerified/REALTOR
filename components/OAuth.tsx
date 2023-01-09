import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import {FcGoogle} from 'react-icons/fc'
import { db } from '../firebase'

const OAuth = () => {

  const [error, setError] = useState<any |  null>(null)
  const router = useRouter()
  const onGoogleClick = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)
      
      if(!docSnap.exists()){
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp()
        })
      }
      router.push('/')

    } catch (error: any) {
      setError(error?.message)
      console.log(error)
    }
  }
  return (
    <>
    <button type='button' onClick={onGoogleClick} className='flex items-center justify-center w-full bg-red-700 text-white px-7 py-3 uppercase text-small font-medium hover:bg-red-800 active:bg-red-900 shadow-md 
    hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out rounded'>
        <FcGoogle className='text-2xl bg-white rounded-full mr-2' />
        Continue to Google
    </button>
    <p className="text-red-600 ">{error}</p>
    </>
  )
}

export default OAuth