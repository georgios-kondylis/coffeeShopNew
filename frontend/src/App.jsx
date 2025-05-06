import React, { useState, useEffect, useContext } from "react";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbars/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import MenuOrder from "./components/Menu/MenuOrder";
import { fetchProducts } from "./utils";

export const ProductsContext = React.createContext();  // create it outside so the App() so new context is not created in evry render


function App() {

  const userData = sessionStorage.getItem('user');  
  const user = userData ? JSON.parse(userData) : null;  //               <--------
  const [refresh, setRefresh] = useState(false);    // global Variables  <--------
  const [coffees, setCoffees] = useState([]);       //                   <--------
  const [fikas, setFikas] = useState([]);           //                   <--------
  const [searchBarValue, setSearchBarValue] = useState(''); //           <--------
  const [cartItems, setCartItems] = useState([]);           //           <--------
  const [acountIsActive, setAcountIsActive] = useState(false);  //       <--------
  const [logInPageActive, setLogInPageActive] = useState(false); //      <--------
  
  const [cartIsActive, setCartIsActive] = useState(false);


  

    useEffect(() => {  // fetch coffees
      const loadProducts = async () => {
        const data = await fetchProducts();
        const coffee = data.filter((item) => item.category === 'coffee')
        const fika = data.filter((item) => item.category === 'pastry')
        setCoffees(coffee.filter((cof) => cof.title.includes(searchBarValue)));
        setFikas(fika.filter((fik) => fik.title.includes(searchBarValue)));
      };
      loadProducts();
    }, [searchBarValue]);
  
  return (
    <ProductsContext.Provider 
        value={{
          user,
          coffees, setCoffees,
          fikas, setFikas, 
          refresh, setRefresh, 
          searchBarValue, setSearchBarValue,
          cartItems, setCartItems,
          acountIsActive, setAcountIsActive,
          logInPageActive, setLogInPageActive
    }}>
      <div className="bgDark w-full overflow-x-hidden">
        <Navbar
          refresh={refresh} 
          setRefresh={setRefresh}
          cartIsActive={cartIsActive}
          setCartIsActive={setCartIsActive}
          coffees={coffees}
          fikas={fikas}
        /> 
      
        <Routes>
          <Route path="/" element={<HomePage/>}/>

          <Route path="/menu" element={ 
            <div className="mx-auto w-full W_LIMIT">
              <MenuOrder/>
            </div>}
          />
        </Routes>
        
      </div>
    </ProductsContext.Provider>
  );
}

export default App;






// 📋 Example 2: Global state using Context

// const CountContext = React.createContext();

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <CountContext.Provider value={{ count, setCount }}>
//       <Child />
//       <AnotherChild />
//     </CountContext.Provider>
//   );
// }

// function Child() {
//   const { setCount } = useContext(CountContext);
//   return <button onClick={() => setCount(c => c + 1)}>Increase</button>;
// }

// function AnotherChild() {
//   const { count } = useContext(CountContext);
//   return <p>Count is: {count}</p>;
// }
// 📋 Example 2: Global state using Context
// jsx
// Copy
// Edit
// const CountContext = React.createContext();

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <CountContext.Provider value={{ count, setCount }}>
//       <Child />
//       <AnotherChild />
//     </CountContext.Provider>
//   );
// }

// function Child() {
//   const { setCount } = useContext(CountContext);
//   return <button onClick={() => setCount(c => c + 1)}>Increase</button>;
// }

// function AnotherChild() {
//   const { count } = useContext(CountContext);
//   return <p>Count is: {count}</p>;
// }
