import React from 'react'
import Star from './Star'

function Product({img, name, price, ratings, onTap}) {

    const getRatings = (num)=>{
        var icons = []
        for (let index = 0; index < num; index++) {
            icons = [...icons, <Star/>]
        }
        return icons
    }

  return (
    <div  className='bg-white border-gray-400 p-4 m-2 flex flex-col '>
        <p>{name}</p>
        <p className='font-bold'>{`$${price}`}</p>
        <div className='flex'>
            {getRatings(ratings)}
        </div>
        <img src={img} width={300} height={200} className="max-h-40"/>
        <button onClick={()=>onTap()} className='p-2 bg-yellow-500 text-center font-bold w-fit border-r-2 mx-auto mt-4 hover:cursor-pointer active:bg-yellow-400'>Add To Cart</button>
    </div>
  )
}

export default Product
