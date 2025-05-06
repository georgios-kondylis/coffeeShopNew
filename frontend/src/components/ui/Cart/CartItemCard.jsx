import React from 'react'
import { updateQuantity } from '../../../utils';
import { backendUrl } from '../../../utils';

const CartItemCard = ({cartItem, user, setRefresh}) => {

  const deleteItem = async () => {
    try {
      const res = await fetch(
        `${backendUrl}/api/cart/delete?userId=${user._id}&productId=${cartItem.product._id}`,
         { method: 'DELETE' });
      const data = await res.json();

      if (res.ok) {
        setRefresh((prev) => !prev);
      } else {
        console.error('Delete failed:', data.message);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }
  
  return (
    <div className="flex justify-between items-center border-b border-[#333] py-[10px]" >
      <div className="flex items-center gap-[10px]">
        {/* Product Image */}
        {cartItem.product.image && 
          <img
            src={cartItem.product.image}
            alt={cartItem.product.title}
            className="w-[50px] h-[50px] object-cover"
          /> }
        <div className="flex flex-col gap-[10px]">
          <p className="font-semibold text-sm">
            {cartItem.product.title}
          </p>{" "}
          {/* Product Name */}
          <div className="flex items-center gap-[10px]">
            <p className="subText text-nowrap">
              Quantity: {cartItem.quantity}
            </p>{" "}
            {/* Quantity */}
            <div className="flex gap-[10px] text-[20px]">
              <i className="fa-solid fa-square-minus hover:text-[#e0bf7f] cursor-pointer"
                 onClick={() => updateQuantity('decrease', user, cartItem, setRefresh)}>
              </i>
              <i className="fa-solid fa-square-plus hover:text-[#e0bf7f] cursor-pointer"
                 onClick={() => updateQuantity('increase', user, cartItem, setRefresh)}>
              </i>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[9px] justify-between items-end">
        <p className="text-sm text-nowrap">
          {(cartItem.quantity * cartItem.product.price).toFixed(2)}{" "}
          SEK
        </p>{" "}
        {/* Total for this item */}
        <i className="fa-solid fa-trash text-[18px] hover:text-[#b83b3b] cursor-pointer"
           onClick={deleteItem}>
        </i>
      </div>
    </div>
  )
}

export default CartItemCard