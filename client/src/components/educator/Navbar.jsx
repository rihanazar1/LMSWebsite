import React from 'react'
import { assets, dummyEducatorData } from '../../assets/assets'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const educatorData = dummyEducatorData
  const {user} = useUser()

  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-1'>
      <Link to='/'>
        <img src={assets.CourseCampLogo} alt="logo" className='w-40 lg:w-48' />
      </Link>

      <div className='flex items-center gap-5 text-gray-500 relative'>
        <p>Hi! {user ? user.fullName : 'Developers'}</p>
        {user ? <UserButton/> : <img src={assets.profile_img} className='max-w-8'/>}
      </div>
    </div>
  )
}

export default Navbar