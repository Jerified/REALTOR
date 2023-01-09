import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import { auth } from '../firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const header = () => {

      const [pageState, setPageState] = useState('Sign in')
      const router = useRouter()
      const auth = getAuth()

      const pathRoute = (route: string) => {
      if(route === router.pathname){
        // console.log(router.pathname)
          return true
        }
        }

        useEffect(() => {
          onAuthStateChanged(auth, (user) => {
            if (user) {
              setPageState('Profile')
            } else {
              setPageState('Sign in')
            }
          })
        },[auth])
  return (
    <>
      <div className="bg-white border-b shadow-md sticky py-4 top-0 z-99">
        <header className="flex justify-between px-6 max-w-6xl mx-auto">
          <Link href="/">
            <img
              src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
              alt=""
              className="h-5 cursor-pointer"
            />
          </Link>
          <ul className="flex space-x-10 font-semibold text-gray-400">
            <li
              className={`cursor-pointer border-b-[3px]  border-b-transparent  ${
                pathRoute("/") && "text-black border-b-red-500"
              } `}
            >
              <Link href="/">Home</Link>
            </li>
            <li
              className={`cursor-pointer border-b-[3px]  border-b-transparent  ${
                pathRoute("/Offer") && "text-black border-b-red-500"
              } `}
            >
              <Link href="/Offer">offer</Link>
            </li>
            <li
              className={`cursor-pointer border-b-[3px]  border-b-transparent  ${
                (pathRoute("/SignIn") || pathRoute("/Profile")) && "text-black border-b-red-500"
              } `}
              onClick={() => router.push('/Profile')}
            >
              <Link href="/SignIn">{pageState}</Link>
            </li>
          </ul>
        </header>
      </div>
    </>
  );
}

export default header