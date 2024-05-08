// import React, { useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { CartContext } from './Cart';
// const ShoppingCart = () => {
//     const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext)
//     const [alert, showAlert] = useState({
//         show: false,
//         productId: null
//     })
//     const handleIncrement = (item) => {
//         if (item.quantity < item.stock_quantity) {
//             addToCart(item)
//         } else {
//             showAlert({
//                 show: true,
//                 productId: item.id
//             });
//         }
//     };

//     return (
//         <div className="bg-white dark:bg-gray-700 gap-8 p-5 sm:p-10 text-black text-sm">
//             <h1 className="text-2xl text-left font-bold dark:text-white">Shopping Cart</h1>
//             <div className="grid grid-cols-1  md:grid-cols-2  gap-4 p-2">
//                 <div className="overflow-y-auto max-h-[calc(100vh - 250px)]">
//                     {
//                         cartItems.map((item) => (
//                             <div className="block sm:flex mb-3 gap-8 rounded bg-blue-100 dark:bg-gray-800 p-2" key={item.id}>
//                                 <div className="">
//                                     <img src={`${process.env.REACT_APP_BACKEND_URL}${item.image_url}`} alt={item.name} className="rounded-md h-[200px] w-full" />
//                                 </div>
//                                 <div className='dark:text-white flex flex-col justify-between px-2'>
//                                     <div className='block py-2'>
//                                         <h1 className="text-lg font-bold">{item.name}</h1>
//                                     </div>
//                                     <div className='flex items-center justify-between'>
//                                         <div className="flex gap-4 items-center">
//                                             <button onClick={() => removeFromCart(item)} className='px-4 py-2 bg-blue-600 dark:bg-white dark:text-black text-white text-xs font-bold uppercase rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700'>-</button>
//                                             <p className='dark:text-white'>{item.quantity}</p>
//                                             <button onClick={() => handleIncrement(item)} className={`px-4 py-2 bg-blue-600 dark:bg-white dark:text-black text-white text-xs font-bold uppercase rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700} `}>+</button>
//                                         </div>
//                                         <div>
//                                             <p className='text-gray-600 text-lg font-bold dark:text-white'>Rs: {item.price}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     }
//                 </div>

//                 <div className="flex justify-center">
//                     <div className={`bg-blue-100 dark:bg-gray-800 ${cartItems.length > 0 ? 'h-[300px]' : 'h-[220px]'} p-5 sm:p-10 w-[100%] sm:w-[60%]  rounded`}>
//                         <h1 className='text-3xl font-bold mb-5 dark:text-white'>Summary</h1>
//                         <div className="flex items-center justify-between mb-3 dark:text-white">
//                             <p className=''>Total Items</p>
//                             <p>{cartItems.length}</p>
//                         </div>
//                         <div className='bg-black h-[1px] dark:bg-white '></div>
//                         <div className="flex items-center justify-between dark:text-white">
//                             <p className='text-lg font-semibold'>Total Price</p>
//                             <p className='text-lg font-semibold'>Rs: {getCartTotal()}</p>
//                         </div>
//                         {
//                             cartItems.length > 0 ? (
//                                 <div className='mt-5'>
//                                     <Link to='/checkout'>
//                                         <button className="w-full px-4 py-2 bg-blue-600 text-white text-xs font-bold uppercase rounded hover:bg-blue-700 dark:bg-white dark:text-black focus:outline-none focus:bg-gray-700 ease-linear duration-150 mb-2">Check out</button>
//                                     </Link>
//                                     <button onClick={() => clearCart()} className=" w-full px-4 py-2 bg-blue-600 text-white text-xs font-bold uppercase rounded hover:bg-blue-700 dark:bg-white dark:text-black focus:outline-none focus:bg-gray-700 ease-linear duration-150 mb-2">Clear Cart</button>

//                                 </div>
//                             ) : (
//                                 <h1 className="text-lg font-bold dark:text-white">Your cart is empty</h1>
//                             )
//                         }
//                     </div>
//                 </div>
//             </div>

//             {
//                 alert.show && (
//                     <div className="popup-container">
//                         <div className="popup">
//                             <h2 className="text-lg font-bold mb-4 dark:text-white">Message</h2>
//                             <p className="mb-4 dark:text-white">{`Product out of stock. You can only purchase this product less than ${cartItems.find(item => item.id === alert.productId)?.stock_quantity}`}</p>
//                             <div className="flex justify-end">
//                                 <button className="px-4 py-2 bg-blue-500 ease-linear duration-200 text-white rounded hover:bg-blue-500 dark:bg-white dark:text-black" onClick={() => showAlert({ show: false, productId: null })} >OK</button>
//                             </div>
//                         </div>
//                     </div>
//                 )
//             }
//         </div>
//     );
// };

// export default ShoppingCart;
