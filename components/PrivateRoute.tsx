import { ImageProps } from 'next/image';
import { useRouter } from 'next/router';
import React, { FC, PropsWithChildren, useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
// import { Outlet } from 'react-router';

export interface Iprop extends PropsWithChildren {}
const PrivateRoute:FC<Iprop> = ({children}) => { 
    const router = useRouter()
    
    const {currentUser} = useContext(AuthContext)

    useEffect(() => {
        if (!currentUser) {
            router.push('/SignIn')
        }
    },[])

    return (
        <>
            {currentUser ? children : null}
        </>
    )
}

export default PrivateRoute