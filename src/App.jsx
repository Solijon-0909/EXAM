/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";
import AppRoutes from "./routes/AppRoutes";

const StoreContext = createContext(null);

export const products = [
  {
    id: 1,
    name: 'MacBook Air M2 13"',
    category: "Noutbuklar",
    price: 12400000,
    oldPrice: 12900000,
    rating: 4.9,
    reviews: 128,
    badge: "Omborda: 5 ta",
    icon: "laptop",
    image:
      "https://images.unsplash.com/photo-1662569081210-6e8b240def2e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    name: "Sony WH-1000XM5",
    category: "Audio",
    price: 4200000,
    oldPrice: 4500000,
    rating: 4.8,
    reviews: 86,
    badge: "Omborda: 2 ta",
    icon: "headphones",
    image:
      "https://www.wirelessplace.com/cdn/shop/files/103375_original_local_1200x1050_v3_converted_800x700.webp?v=1748490458",
  },
  {
    id: 3,
    name: "Keychron K2 Pro",
    category: "Aksessuarlar",
    price: 1350000,
    oldPrice: null,
    rating: 4.9,
    reviews: 214,
    badge: "Omborda: 4 ta",
    icon: "keyboard",
    image:
      "https://media-cdn.bnn.in.th/364508/keychron-gaming-keyboard-k2-pro-blue-switch-1.jpg",
  },
  {
    id: 4,
    name: "Apple Watch Series 9",
    category: "Aksessuarlar",
    price: 5100000,
    oldPrice: 5600000,
    rating: 4.7,
    reviews: 67,
    badge: "Omborda: 4 ta",
    icon: "watch",
    image:
      "https://multimedia.bbycastatic.ca/multimedia/products/500x500/173/17321/17321866.jpg",
  },
  {
    id: 5,
    name: "ASUS Zenbook 14 OLED",
    category: "Noutbuklar",
    price: 10800000,
    oldPrice: 11500000,
    rating: 4.8,
    reviews: 52,
    badge: "Tugagan",
    icon: "laptop",
    image:
      "https://media-cdn.bnn.in.th/363845/asus-notebook-zenbook-14-oled-ux3405-content-7.jpg",
  },
  {
    id: 6,
    name: "Logitech MX Master 3S",
    category: "Aksessuarlar",
    price: 1180000,
    oldPrice: null,
    rating: 4.8,
    reviews: 173,
    badge: "Omborda: 6 ta",
    icon: "mouse",
    image:
      "https://service.pcconnection.com/images/inhouse/9B37F09F-8797-487D-AC6A-22DE83E9F43D.jpg",
  },
];

export function StoreProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([
    { ...products[1], quantity: 1 },
    { ...products[2], quantity: 2 },
  ]);
  const [favorites, setFavorites] = useState([1, 6]);

  const addToCart = (product) =>
    setCart((current) => {
      const exists = current.find((item) => item.id === product.id);
      return exists
        ? current.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...current, { ...product, quantity: 1 }];
    });
  const updateQuantity = (id, quantity) =>
    quantity < 1
      ? setCart((current) => current.filter((item) => item.id !== id))
      : setCart((current) =>
          current.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        );
  const removeFromCart = (id) =>
    setCart((current) => current.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);
  const login = (profile) => setUser(profile);
  const updateProfile = (profile) =>
    setUser((current) => ({ ...(current || {}), ...profile }));
  const logout = () => setUser(null);
  const toggleFavorite = (id) =>
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  const value = useMemo(
    () => ({
      user,
      login,
      updateProfile,
      logout,
      cart,
      favorites,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      toggleFavorite,
    }),
    [cart, favorites, user],
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}

export default function App() {
  return (
    <StoreProvider>
      <AppRoutes />
    </StoreProvider>
  );
}
