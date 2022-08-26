import React from 'react'
import Star from './Star'

function CartProduct({img, name, price, ratings, onTap}) {

    const getRatings = (num)=>{
        var icons = []
        for (let index = 0; index < num; index++) {
            icons = [...icons, <Star/>]
        }
        return icons
    }
    return (

        <div  className='bg-white border-gray-400 p-4 m-2 flex'>
            <img src={img} width={200} height={100} className="max-h-40"/>
            <div className='flex flex-col'>
                <p>{name}</p>
                <p className='font-bold'>{`$${price}`}</p>
                <div className='flex'>
                    {getRatings(ratings)}
                </div>
                
                <div onClick={()=>onTap()} className='p-1 bg-yellow-500 text-center font-bold w-fit border-r-2 mx-auto mt-4 hover:cursor-pointer active:bg-yellow-400 text-sm'>Remove from Cart</div>
            </div>
        </div>
    )
}

export default CartProduct
