import React, { useContext, useRef } from 'react'
import { ProductsContext } from '../../App';
import { make1stLetterCapital } from '../../utils';

const SearchBar = ({ searchBarIsActive, setSearchBarIsActive, }) => {
  
  const {searchBarValue, setSearchBarValue} = useContext(ProductsContext);

  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setSearchBarIsActive(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setSearchBarIsActive(false);
    }, 1000);
  };

  const handleInputFocus = () => {
    clearTimeout(timeoutRef.current);
    setSearchBarIsActive(true);
  };

  const handleInputBlur = () => {
    timeoutRef.current = setTimeout(() => {
      setSearchBarIsActive(false);
    }, 1000);
  };

  return (
    <div className='relative textDark text-[14px]'>
      <i 
        className="iNav fas fa-search"   
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
      </i>

      
        <input className={`absolute transition1 ${searchBarIsActive? 'w-[170px]' : 'w-0 opacity-0 pointer-events-none'} right-[28px] top-1/2 transform -translate-y-1/2 grayBorder focus:border-[#ffffff] outline-none
                          px-[10px] py-[5px] roundCorner bg-[#fff1d2]`}
          type="text"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          value={searchBarValue} 
          onChange={(e) => {
            setSearchBarValue(make1stLetterCapital(e.target.value));
          }}
        />
      
    </div>
  )
}

export default SearchBar
