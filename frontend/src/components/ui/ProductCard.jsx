import React, { useContext, useState } from 'react';
import { ProductsContext } from '../../App';
import { handleAddToCart } from '../../utils';
import { backendUrl } from '../../utils';

const ProductCard = ({ item, pickButton, setPickButton }) => {
  const { user, setRefresh } = useContext(ProductsContext);
  const [customAlertLogInActive, setCustomAlertLogInActive] = useState(false);

  return (
    <div className="bgDark roundCorner px-[10px] py-[5px] flex gap-[15px] items-center" onClick={() => setCustomAlertLogInActive(false)}>
     
     <div className='w-[100px] h-[100px] flex items-center justify-center'>
       <img src={item.image} alt={item.title} className="w-full object-contain rounded-xl" />
     </div>
     

      <div className="flex w-full flex-col">
        <h2 className="text-xl textCream font-bold textDark mb-1">{item.title}</h2>
        <p className="text-[12px] lg:text-[16px]">{item.description}</p>

        <div className="flex gap-[20px] justify-between items-center">
          <span className="textCream text-lg font-semibold">{item.price} kr</span>
          <button onClick={async (e) => {
              e.stopPropagation();
              if (!user) return setCustomAlertLogInActive(true) 
              await handleAddToCart(user, item, backendUrl);
              setRefresh(prev => !prev);
              setPickButton(<i className="textForest text-[18px] fa-solid fa-circle-check"></i>);
              setTimeout(() => setPickButton('Pick'), 1000);
            }}
            className="bgCream min-w-[63px] textDark px-4 py-1 roundCorner transition1 hover:bg-[#f6e0b6]"
          >
            {pickButton}
          </button>
        </div>
      </div>

      {customAlertLogInActive && (
        <>
          {/* Dark background overlay */}
          <div className="fixed inset-0 bg-[#000000ad] bg-opacity-50 z-40" />

          {/* Centered alert box */}
          <div className="fixed z-50 inset-0 flex items-center justify-center">
            <div className="bg-[#f6e0b6] textDark px-6 py-4 roundCorner shadow-lg text-center w-[80%] max-w-[300px]">
              <p className="text-lg textDark font-semibold mb-[10px]">Log in to place an order</p>
              <button
                onClick={() => setCustomAlertLogInActive(false)}
                className="mt-2 px-4 py-1 bgDark textCreamLight roundCorner hover:opacity-90 transition1"
              >
                Got it
              </button>
            </div>
          </div>
        </>
      )}

    </div>
  );
};

export default ProductCard;
