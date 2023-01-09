import React from 'react'
import Router, { useRouter } from 'next/router'

const allDate = () => {
    const router = useRouter()
    const value = router.query.slug
  return (
    <div>{value}</div>
  )
}

// export  

export default allDate