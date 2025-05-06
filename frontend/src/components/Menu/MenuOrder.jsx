import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { scrollToTop } from '../../utils';
import ProductCard from '../ui/ProductCard';
import { ProductsContext } from '../../App';

const MenuOrder = () => {
  useEffect(() => { scrollToTop() }, [])
  const navigate = useNavigate();

  const { coffees, fikas, setAcountIsActive } = useContext(ProductsContext);
  const [displayCoffees, setDisplayCoffees] = useState(true);
  const [pickButtons, setPickButtons] = useState({}); // track each product's button

  const handleSetPickButton = (id, text) => {
    setPickButtons(prev => ({ ...prev, [id]: text }));
  };

  const itemsToShow = displayCoffees ? coffees : fikas;

  return (
    <>
      {/* Preload background image */}
      <link rel="preload" href="/order/top.png" as="image" />
      
      <section className="relative w-full W_LIMIT mt-[70px] h-[100dvh] flex flex-col items-start mainPX py-10" onClick={() => setAcountIsActive(false)}>
        {/* Background Image */}
        <img src="/order/top.png" className="fixed top-0 left-0 w-full h-full object-cover z-0" alt="Menu background" />

        <div className='z-10 flex w-full gap-[30px] items-center'>
          <Link to="/" className="bgDark grayBorder px-[15px] py-[7px] roundCorner hover:bg-[#3a3a3a] transition1">
            Go Back to Homepage
          </Link>

          <div className='bgDark flex items-center grayBorder roundCorner transition1'>
            <button className={`py-[7px] px-[15px] rounded-l-[6px] transition1 ${displayCoffees ? 'bgCream textDark' : 'hover:bg-[#3a3a3a]'}`}
              onClick={() => setDisplayCoffees(true)} >
              Coffee
            </button>
            <span className='h-[38px] rounded-full bg-white w-[2px]'></span>
            <button className={`px-[15px] py-[7px] rounded-r-[6px] ${!displayCoffees ? 'bgCream textDark' : 'hover:bg-[#3a3a3a]'}`}
              onClick={() => setDisplayCoffees(false)} >
              Fika
            </button>
          </div>
        </div>

        <div className="z-10 flex flex-col gap-[20px] w-[60%] max-w-[900px] max-md:w-full mt-[90px]">
          {itemsToShow.map((item) => (
            <ProductCard
              key={item._id}
              item={item}
              pickButton={pickButtons[item._id] || 'Pick'}
              setPickButton={(text) => handleSetPickButton(item._id, text)}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default MenuOrder;
