import { Checkbox } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import CartProduct from "./CartProduct"
import {selectCart, deleteProduct} from './features/cart/cartSlice'
const CheckOut = () => {
  const dispatch = useDispatch()
  const cart = useSelector(selectCart)
  const getSum = ()=>{
    var sum = 0;
    cart.map(product=>{
      sum += product.price
    })
    return sum;
  }
  return (
    <div className="flex flex-col md:flex-row m-0 md:m-10 items-center md:items-start justify-center text-center">
        <div className="flex-1">
          <div className="h-40 "></div>
          <p className="font-bold text-3xl mb-2">Your Shopping Basket</p>
          <hr/>
      
          <div className="mt-2">
            {
              cart.map(product=>
              <CartProduct
              key={product.id}
              price={product.price}
              img={product.img}
              name={product.name}
              ratings={product.ratings}
             onTap = {()=>dispatch(deleteProduct(product))}

              />)
            }
          </div>
        </div>
        <div className="bg-gray-200 border-gray-100 border-2 p-3 h-44 w-max md:w-1/3">
            <p>Subtotal({cart.length} items): ${getSum()}</p>
            <p><Checkbox /> This Contains a Gift</p>
            <div className='p-2 bg-yellow-500 text-center font-bold  border-r-2 mx-auto mt-4 hover:cursor-pointer active:bg-yellow-400'>Procced to checkout</div>
          </div>
    </div>
  )
}

export default CheckOut
