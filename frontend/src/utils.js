// utils.js
export const reviews = [
  {
    name: "Maria Papadaki",
    stars: 5,
    text: "The perfect spot for a relaxed afternoon with a great cup of coffee. Highly recommend it!",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
    experienceImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400"
  },
  {
    name: "Liam Svensson",
    stars: 4,
    text: "Great vibes and cozy atmosphere. Will definitely come back!",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
    experienceImage: "https://images.unsplash.com/photo-1559628233-52fdfc6f7a6b?w=400"
  },
  {
    name: "Katerina Nikolaou",
    stars: 4,
    text: "Cozy environment with excellent cappuccino! Would love to see some pastries added to the menu.",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    experienceImage: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=400"
  },
  {
    name: "Emma Johansson",
    stars: 5,
    text: "Absolutely love this place! The coffee is amazing and the service is top-notch.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    experienceImage: "https://images.unsplash.com/photo-1536520002442-39764a41e168?w=400"
  },
  {
    name: "Olivia Berg",
    stars: 5,
    text: "Best cappuccino I've ever had. Highly recommend!",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    experienceImage: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400"
  },
  {
    name: "Noah Lindqvist",
    stars: 3,
    text: "Decent experience, but the music was a bit loud for my taste.",
    image: "https://randomuser.me/api/portraits/men/72.jpg",
    experienceImage: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?w=400"
  },
  {
    name: "Dimitris Papadopoulos",
    stars: 5,
    text: "Authentic atmosphere and the espresso reminded me of my favorite kafeneio in Athens!",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    experienceImage: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400"
  },
  {
    name: "Eleni Markou",
    stars: 4,
    text: "Lovely place! Would love to see more vegan options on the menu though.",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
    experienceImage: "https://images.unsplash.com/photo-1507919980194-69c3d8e8e9c9?w=400"
  },
  {
    name: "Sven de Vries",
    stars: 5,
    text: "Perfect spot for remote work. Great Wi-Fi and amazing Dutch style filter coffee!",
    image: "https://randomuser.me/api/portraits/men/58.jpg",
    experienceImage: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=400"
  }
];

// Use import.meta.env for Vite environment variables
export const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${backendUrl}/api/users`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${backendUrl}/api/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; 
  }
};

// Screen width utilities
export const maxSM = () => window.innerWidth < 770;
export const maxMD = () => window.innerWidth < 1000;
export const maxLG = () => window.innerWidth >= 1024;

export const favourites = [
  {
    name: "Cappuccino",
    description: "Rich espresso with steamed milk and a touch of foam.",
    price: "€3.50",
    image: "/showcaseMenu/cappucinoShowcase.png",
  },
  {
    name: "Croissant",
    description: "Flaky, buttery pastry perfect with your morning brew.",
    price: "€2.00",
    image: "/showcaseMenu/croisantShow.jpg",
  },
  {
    name: "Chai Latte",
    description: "Aromatic blend of black tea, spices, milk and love.",
    price: "€3.80",
    image: "/showcaseMenu/chaiLatteShowcase.jpg", // Add this image to your public folder
  },
  {
    name: "Cinnamon bun",
    description: "Sweet, soft, and cinnamon-swirled your perfect fika companion.",
    price: "€3.80",
    image: "/showcaseMenu/canelBulleShowcase.jpg", // Add this image to your public folder
  },
];

// i also have the scroll smooth in the css so cant remove it
export const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' }); 

export const make1stLetterCapital = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const calculateTotal = (cartItems) => {
  if (!Array.isArray(cartItems)) return "0.00 something is wrong";

  return cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.product.price;
    }, 0)
    .toFixed(2);
};


// ----------------------------- CART ----------------------------- //

export const handleAddToCart = async (user, item, backendUrl) => {
  if (!user || !user._id) {
    console.log('No user logged in');
    return;
  }
  
  const payload = {
    userId: user._id,
    productId: item._id,
    quantity: 1,
  };

  try {
    const res = await fetch(`${backendUrl}/api/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log(data); // Optional: show feedback in UI
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

export const updateQuantity = async (action, user, cartItem, setRefresh) => {
    try {
      const res = await fetch(`${backendUrl}/api/cart/update-quantity`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          productId: cartItem.product._id,
          action,
        }),
      });
  
      if (!res.ok) {
        console.error('Failed to update quantity');
        return;
      }
  
      const data = await res.json();
      setRefresh(prev => !prev)
    } catch (err) {
      console.error('Error:', err);
    }
  };

  // ------------------------- Framer Motion ---------------------- //
  export const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };
  
  