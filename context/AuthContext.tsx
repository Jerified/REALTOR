import React, { createContext, FC, PropsWithChildren, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Spinner from '../components/Spinner'


export const AuthContext = createContext(null)

 

interface Idata {
    name: string | null,
    email: string | null
}
export interface Iprop extends PropsWithChildren {}
export const AuthProvider:FC<Iprop> = ({children}) => {
    const [currentUser, setCurrentUser] = useState<any | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [userData, setUserData] = useState<Idata>({
        name: '',
        email: ''
    })

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log(user)
            if (user) {
                const requiredData = {
                    name: user.displayName,
                    email: user.email
                }

                setUserData(requiredData)
                setCurrentUser(user)
            } else {
                setCurrentUser(null)
            }
            setLoading(false)
            
        })
    },[])

    if (loading) {
        return <Spinner />
    }
  return (
    <AuthContext.Provider value={{currentUser, userData, setUserData}}>
        {loading ? null : children}
    </AuthContext.Provider>
  )
}