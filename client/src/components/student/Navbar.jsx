import React, { useContext } from 'react'
import {assets} from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { useClerk, useUser, UserButton } from '@clerk/clerk-react'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {

    const {navigate, isEducator, backendUrl, setIsEducator, getToken} = useContext(AppContext)

    const isCourseListPage = location.pathname.includes('/course-list')

    const {openSignIn} = useClerk()
    const {user} = useUser()

    const becomeEducator = async ()=>{
        try {
            if(isEducator){
                navigate('/educator')
                return;
            }
            const token = await getToken()
            const {data} = await axios.get(backendUrl + '/api/educator/update-role',
                {headers : {Authorization : `Bearer ${token}`}})

            if(data.success){
                setIsEducator(true)
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }    
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <div className={`flex items-center justify-between px-4 sm:px-20 md:px-14 lg:px-36 border-b border-gray-500 py-2 ${isCourseListPage ? 'bg-gradient-to-r from-indigo-500 from-5% via-sky-500 via-30% to-purple-500 to-90%' : 'bg-gradient-to-r from-indigo-500 from-5% via-sky-500 via-30% to-purple-500 to-90%'}`}>

        <img  onClick={()=> navigate('/')} src={assets.CourseCampLogo} alt="Logo" className='w-40 lg:w-48 cursor-pointer'/>

        <div className='hidden md:flex items-center gap-5 text-white text-lg'>
            <div className='flex items-center gap-5 '>
                { user && 
                <>
                    <button className='hover:text-black duration-700' onClick={becomeEducator} >{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
                    | <Link to='/my-enrollments' className='hover:text-black duration-700' >My Enrollments</Link>
                </>
                }
            </div>
            
            { user ? <UserButton/> : 
                
                <button onClick={()=> openSignIn()} className='text-white px-5 py-2 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500'>Create Account</button>
            }
        </div>

        {/* For Mobile Screen */}
        <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
            <div className='flex items-center gap-1 sm:gap-2 max-sm:text-xs'>
                { user && 
                    <>
                        <button onClick={becomeEducator} >{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
                        | <Link to='/my-enrollments' >My Enrollments</Link>
                    </>
                }
            </div>
            {
                user ? <UserButton/> : <button onClick={() => openSignIn()}><img src={assets.user_icon} alt="" /></button>
            }
        </div>
    </div>
  )
}

export default Navbar


