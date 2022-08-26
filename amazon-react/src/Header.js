import React from 'react'
import SearchIcon from './SearchIcon'
import ShopingBag from './ShopingBag'
import {Link} from 'react-router-dom'
import {IconButton} from '@mui/material'
import {useSelector} from 'react-redux'
import {selectCart} from './features/cart/cartSlice'
import {selectUser} from './features/user/userSlice'


function Header() {

  const cart = useSelector(selectCart)

  const user = useSelector(selectUser)

  console.log(user);

  return (
    <div className="bg-blue-900 flex stiky shadow-md top-0 w-auto z-20 header">
      <Link to={"/"}><img width={100} className="mx-4 mt-4 mb-1" alt='logo' src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'/></Link>
      <div className='flex flex-1'>
        <input type={"text"} className="my-3 flex-1 border-none outline-0 p-2"/>
        <button className='p-2 bg-orange-300 my-3 hover:cursor-pointer active:bg-orange-200'><SearchIcon/></button>
      </div>
      <nav className='flex mx-3 items-center'>
        <Link to={"/login"} className='flex flex-col text-white mx-2 hover:cursor-pointer active:text-gray-400'>
            <span className="text-xs">Hello</span>
            <span className="font-bold">{user.userName?user.userName:"Sign In"}</span> 
        </Link>
        <div className='hidden md:flex flex-col text-white mx-2 hover:cursor-pointer active:text-gray-400'>
        <span className="text-xs">Return</span>
            <span className="font-bold">& Order</span>
        </div>
        <div className='hidden md:flex flex-col text-white mx-2 hover:cursor-pointer active:text-gray-400'>
        <span className="text-xs">Your</span>
            <span className="font-bold">Prime</span>
        </div>
        <Link to={"/checkout"} className='flex text-white mx-2 hover:cursor-pointer active:text-gray-400'>
              <ShopingBag/>
              <span>{cart.length}</span>
              
        </Link>
      </nav>
    </div>
  )
}

export default Header
