import React, { useEffect, useState } from 'react'
import Product from './Products';
import {useDispatch} from 'react-redux'

import {addProduct} from './features/cart/cartSlice'
import axios from 'axios'

function Home() {
  const dispatch = useDispatch()
  const [data, setData] = useState([])

  useEffect(()=>{
    axios(
      {
      url: "http://localhost:4000/api/v1/products",
      method: "GET",
      }
      ).then((response)=>{
        console.log(response.data);
      setData(response.data)
    })
  },[])
  return (
    <div className='relative bg-gray-200'>
      <img className='top-0 -z-20 w-max' src='ads.jpg' />
      <div className='z-20 p-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 -mt-40'>
       {
        data.map(product => 
        <Product 
        key={product._id}
        price={product.price}
        img={product.img}
        name={product.name}
        ratings={product.ratings}
       onTap = {()=>dispatch(addProduct(product))}
        />)
       }
      </div>
    </div>
  )
}

export default Home;
