import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-gradient-to-r from-indigo-500 from-5% via-sky-500 via-30% to-purple-500 to-90% md:px-36 text-left w-full mt-10'>
      <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30'>

          <div className='flex flex-col md:items-start items-center w-full'>
            <img className='w-48' src={assets.CourseCampLogo} alt="logo" />
            <p className='mt-3 ml-2 text-center md:text-left text-sm text-white/80'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque laborum qui eaque repellendus nostrum commodi porro, ullam saepe harum voluptatibus quas dignissimos ut illum odio illo ea nemo aliquam omnis.</p>
          </div>


          <div className='flex flex-col md:items-start items-center w-full'>
            <h2 className='font-semibold text-white mb-4 text-lg'>Company</h2>
            <ul className='flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2'>
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>


          <div className='hidden md:flex flex-col items-start w-full'>
            <h2 className='font-semibold text-white mb- text-lg'>Subscribe to our newsletter</h2>
            <p className='text-sm mt-2 text-white/80'>The latest news, articles, and resources, sent to your inbox weekly.</p>
            <div className='flex items-center gap-2 pt-4'>
              <input type="text" placeholder='Enter your email' className='border border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm'/>
              <button className='bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 w-24 h-9 text-white rounded hover:text-black'>Subscribe</button>
            </div>
          </div>
      </div>
      <p className='py-4 text-center text-xs md:text-sm text-white/60'>Copyright 2024 ©Rihan. All Right Reserved.</p>
    </footer>
  )
}

export default Footer