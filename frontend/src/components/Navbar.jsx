import React from 'react'
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

// #242f39
// #22348e
function Navbar({user}) {
    const navigate = useNavigate();
  return (
    <div className='flex justify-between items-center bg-secondary p-5'>
    <h1 className="text-2xl text-white">Merchant Plaza</h1>
    
    <div className='bg-white py-2 px-5 rounded flex gap-1 items-center cursor-pointer'>    
        <span onClick={()=>navigate('/profile')}>
        {user.fullName}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" className="ml-5" onClick={()=>{
            localStorage.removeItem("token");
            navigate('/login')
            toast.success("Logout Successfull");
        }} viewBox="0 0 24 24" width="18" height="18"><path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"></path></svg>
      </div>
    </div>
  )
}

export default Navbar
