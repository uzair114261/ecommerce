// import { useState, useEffect, createContext } from "react";

// export const CartContext = createContext();
// export const CartProvider = ({ children }) => {
//     const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []);
//     const [alert, showAlert] = useState(false)
//     const addToCart = (product, quantity = 1) => {
//         const itemIndex = cartItems.findIndex(item => item.id === product.id);

//         if (itemIndex !== -1) {
//             const updatedCart = [...cartItems];
//             const totalQuantity = updatedCart[itemIndex].quantity + quantity;
//             if (totalQuantity <= product.stock_quantity) {
//                 updatedCart[itemIndex].quantity = totalQuantity;
//             } else {
//                 updatedCart[itemIndex].quantity = product.stock_quantity;
//                 showAlert(true)
//             }
//             setCartItems(updatedCart);
//         } else {
//             setCartItems([...cartItems, { ...product, quantity }]);
//         }
//     };

//     const removeFromCart = (item) => {
//         const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
//         if (isItemInCart.quantity === 1) {
//             setCartItems(
//                 cartItems.filter((cartItem) => cartItem.id !== item.id)
//             )
//         } else {
//             setCartItems(
//                 cartItems.map((cartItem) =>
//                     cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
//                 )
//             )
//         }
//     };

//     const clearCart = () => {
//         setCartItems([]);
//     };

//     const getCartTotal = () => {
//         return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
//     }

//     useEffect(() => {
//         localStorage.setItem('cartItems', JSON.stringify(cartItems))
//     }, [cartItems])

//     useEffect(() => {
//         const cartItems = localStorage.getItem('cartItems');
//         if (cartItems) {
//             setCartItems(JSON.parse(cartItems))
//         }
//     }, [])

//     return (
//         <div>
//             <CartContext.Provider value={{ cartItems,setCartItems, addToCart, removeFromCart, clearCart, getCartTotal }}>
//                 {children}
//             </CartContext.Provider>
//             {
//                 alert && (
//                     <div className="popup-container">
//                         <div className="popup">
//                             <h2 className="text-lg font-bold mb-4">Message</h2>
//                             <p className="mb-4">{`Product out of stock. Maximum limit reached for this product. Check out the cart  `}</p>
//                             <div className="flex justify-end">

//                                 <button
//                                     className="px-4 py-2 bg-blue-500 ease-linear duration-200 text-white rounded hover:bg-blue-500"
//                                     onClick={() => showAlert(false)}
//                                 >
//                                     Ok
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )
//             }
//         </div>


//     )
// };