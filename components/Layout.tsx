import React, { FC, PropsWithChildren } from 'react'
import Header from './Header'

export interface Iprop extends PropsWithChildren {}
const Layout:FC<Iprop> = ({children}) => {
  return (
    <>
     <Header />
    <main>
        {children}
    </main>
    </>
  )
}

export default Layout