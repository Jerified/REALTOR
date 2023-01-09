import { getAuth, updateProfile } from 'firebase/auth'
import { auth, db } from '../firebase'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useRouter } from 'next/router'
import PrivateRoute from '../components/PrivateRoute'
import { doc, setDoc } from 'firebase/firestore'
import {FcHome} from 'react-icons/fc'
import Link from 'next/link'

type Ivalue = {
  name: string | null | undefined,
  email: string | null | undefined
}
const Profile = () => {
  const [changeDetail, setChangeDetail] = useState(false)
  const router = useRouter() 
  const { currentUser, userData,setUserData } = useContext(AuthContext)
  const [error, setError] = useState('')

  const {name, email} = userData

  const onLogout = () => {
    auth.signOut()
    router.push('/')
  }
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((...prevState: any) => ({
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser?.displayName !== name) {
        updateProfile(auth.currentUser, {
          displayName: name
        })

        const docRef = doc(db, 'user', auth.currentUser?.uid)
        await setDoc(docRef, {
          name
        })          
      }
    } catch (error: any) {
      setError(error.message)
    }
  }


  // if ( !currentUser ) {
  //   // console.log(currentUser)
  //   router.push('/SignIn')
  //   // return<></>
  // }
  //  else if ( currentUser ) {
  //   router.push('/Profile')
  // }
  //  else {
  // const auth = getAuth()
  // const [formData, setFormData] = useState<string>({
  //   name: auth.currentUser?.displayName,
  //   email: auth.currentUser?.email
  // })
  // const { name, email } = formData
  return (
    <PrivateRoute>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center font-bold mt-6">My Profile</h1>
        <div className="w-full md:w-[50%] pt-6 px-3">
          <form action="">
            {/* Name Input */}
            <input
              type="text"
              id="name"
              value={userData.name}
              onChange={onChange}
              // {changeDetail ? null : disabled}
              disabled={!changeDetail}
              className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out ${
                changeDetail && "bg-red-200 focus:bg-red-200"
              }`}
            />
            {/* Email Input */}
            <input
              type="text"
              id="email"
              value={userData.email}
              disabled
              className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out`}
            />
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="flex items-center text-lg">
                Do you want to change your name?
                <span
                  onClick={() => {
                    changeDetail && onSubmit();
                    setChangeDetail((prevState) => !prevState);
                  }}
                  className={`text-red-600 hover:text-red-600 transition ease-in-out duration-200 ml-1 cursor-pointer text-lg font-semibold`}
                >
                  {changeDetail ? "Apply change" : "Edit"}
                </span>
              </p>
              <p
                onClick={onLogout}
                className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer text-lg font-semibold"
              >
                Sign Out
              </p>
            </div>
          </form>
          <button type='submit' className="w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 mt-4"> 
          <Link href='/create-listing' className='flex justify-center items-center gap-2'>
            <FcHome className='text-3xl rounded-full bg-red-200 p-1 border-2' />
            Sell or rent your home
          </Link>
          </button>
        </div>
      </section>
      <h1 className="text-2xl font-bold text-red-600">{error}</h1>
    </PrivateRoute>
  );
}
// }

export default Profile