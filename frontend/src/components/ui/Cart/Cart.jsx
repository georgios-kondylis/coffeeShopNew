// Cart.jsx
import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../../App";
import CartItemCard from "./CartItemCard";
import { backendUrl, calculateTotal } from "../../../utils";
import { motion, AnimatePresence } from "framer-motion";

const Cart = ({ cartIsActive, setCartIsActive }) => {
  const { refresh, setRefresh, cartItems, setCartItems, user } = useContext(ProductsContext);
  const [customAlertActive, setCustomAlertActive] = useState(false);

  // Only attempt to fetch cart items if user is logged in
  useEffect(() => {
    if (!user?._id) {
      setCartItems([]); // Clear the cart if no user is logged in
      return;
    }

    const fetchCartItems = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/cart/get?userId=${user._id}`);
        const data = await res.json();
        setCartItems(data[0]?.items || []); // Safeguard for empty data
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [user, refresh]);

  const handlePlaceOrder = async () => {
  if (!user || !user.email) return alert("You need to be logged in to place an order.");

  try {
    const res = await fetch(`${backendUrl}/api/order/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        name: user.firstName,
        cartItems,
        total: calculateTotal(cartItems)
      }),
    });

    const data = await res.json();
    if (res.ok) {
       // Clear the cart in backend
       await fetch(`${backendUrl}/api/cart/clear`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id }),
      });
      setCustomAlertActive(true);
      setCartIsActive(false);
      setCartItems([]);
      setRefresh(prev => !prev); // Optionally refresh
    } else {
      alert(data.error || "Failed to send email.");
    }
  } catch (error) {
    console.error("Error sending email:", error);
    alert("Error sending email.");
  }
};

  return (
    <>
      {/* Backdrop */}
      {cartIsActive && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[98]"
             onClick={() => setCartIsActive(false)}>
        </div> )}

      {/* Cart Panel */}
      <div className={`fixed bgDark top-0 right-0 h-full max-w-[300px] min-w-[250px] w-[50%] text-white shadow-lg z-[99] transition1 overflow-y-auto
        ${cartIsActive ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none" }`}
      >
        <div className="flex justify-between items-center px-[15px] h-[70px] border-b border-[#333]">
          <div className="flex items-center gap-[15px]">
          {
            user && user.image ? (
              <img src={user.image} alt="Profile" className="w-[40px] h-[40px] rounded-full object-cover" />
            ) : (
              <i id="CART_ICON" className="fa-solid fa-cart-shopping text-[18px]" />
            )
          }
  
            <div className="flex flex-col">  
              <p> 
                { user && user.firstName
                    ? user.firstName.endsWith("s")
                      ? `${user.firstName}'s` 
                      : `${user.firstName}'s` 
                    : "" // If no user, just display 'nothing'
                }{" "}
                Cart
              </p>
              
              <p className="text-[14px]">Summary: {calculateTotal(cartItems)} SEK</p>{" "}  {/* Display Total */}
            </div>
          </div>

          <i className="fa-solid fa-arrow-right-to-bracket text-[18px] hover:scale-[1.1] transition1 cursor-pointer"
            onClick={() => setCartIsActive(false)} />
        </div>

        <div className="p-[15px] flex flex-col">
          {/* Cart content goes here */}
          {cartItems.length > 0 ? (
            cartItems.map((cartItem, i) => (
             <CartItemCard key={i} cartItem={cartItem} setRefresh={setRefresh} user={user}/>
            ))
          ) : (
            <p className="text-sm text-gray-300">Cart is empty for now.</p>
          )}
        </div>

        {/* Sticky Place Order Button */}
        { cartItems.length > 0 &&
        <div className="sticky bottom-0 bgDark border-t border-[#333] p-[15px]">
          <button className="w-full bgCream textDark py-[10px] rounded-xl font-semibold transition1 hover:brightness-110 "
            onClick={() => handlePlaceOrder()} 
          >
            Place Order {calculateTotal(cartItems)} SEK
          </button>
        </div>}
      </div>
      
      <AnimatePresence>
        {customAlertActive && (
          <motion.div className="fixed inset-0 z-[999] bg-black bg-opacity-60 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="bgBrightMain rounded-2xl shadow-xl p-6 max-w-[350px] w-full text-center"
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h2 className="text-xl font-bold textDark mb-2">Order Confirmed!</h2>
              <p className="text-sm textDark font-bold mb-4">
                A confirmation with your order details has been sent to your email.
              </p>

              <p className="text-sm textDark mb-6 italic">
                Since this is a showcase version of the app no real order was made. <br />
                For now, feel free to explore and daydream the full café experience!
                <span className="not-italic"> 😉</span>
              </p>
              <button
                onClick={() => setCustomAlertActive(false)}
                className="bgDark textLight px-4 py-2 rounded-lg font-semibold hover:brightness-110 transition1"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart;


