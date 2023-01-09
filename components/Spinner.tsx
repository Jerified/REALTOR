import Image from 'next/image'
import React from 'react'
import spinner from '../assets/svg/spinner.svg'

const Spinner: any = () => {
  return (
    <>
    <div className="fixed bg-black bg-opacity-50 flex justify-center items-center z-[999] inset-0">
    <Image src={spinner} alt="loading...." className="" width={96} height={96} />
    </div>
    </>
  )
}

export default Spinner