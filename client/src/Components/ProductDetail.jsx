import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Cart } from 'react-bootstrap-icons';
import { CartContext } from './Cart';

function ProductDetail() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [counter, setCounter] = useState(1);
    const [outOfStock, setOutOfStock] = useState(false);
    const [alert, showAlert] = useState(false)
    const { addToCart } = useContext(CartContext)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}product/api/?slug=${slug}`);
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                console.error('Error fetching data:', err);
                setProduct(null);
            }
        };
        fetchData();
    }, [slug]);

    const handleIncrement = () => {
        if (counter < product?.stock_quantity) {
            setCounter(counter + 1);
            setOutOfStock(false);
        } else {
            showAlert(true);
            setOutOfStock(true);
        }
    };

    useEffect(() => {
        setOutOfStock(counter >= product?.stock_quantity);
    }, [counter, product?.stock_quantity]);



    return (
        <div className='container mx-auto pt-12'>
            {
                product ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 py-5">
                        <div className="flex justify-center">
                            <div className="image h-[500px] w-[400px] border-white dark:border-gray-800 border-[10px] border-solid">
                                <img className='w-full h-full ' src={`${process.env.REACT_APP_BACKEND_URL}${product.image_url}`} alt="" />
                            </div>
                        </div>
                        <div className="details bg-white dark:bg-gray-800 rounded-lg px-4 py-5">
                            <h1 className="text-xl font-bold dark:text-white">{product.name}</h1>
                            <div className='py-2 dark:text-white'>
                                <h2 className='text-lg'>Description</h2>
                                <p className='text-justify text-sm'>{product.description}</p>
                            </div>
                            <p className='text-xl dark:text-white'>Price {product.price}</p>
                            <div className="add-to-cart flex items-center mt-4">
                                <div className="quantity">
                                    <div className="flex mr-4 dark:text-white">
                                        <button onClick={() => counter > 1 && setCounter(counter - 1)} className='border px-2 font-bold'>-</button>
                                        <button className='border px-5'>{counter}</button>
                                        <button onClick={handleIncrement} className='border px-2 font-bold'>+</button>
                                    </div>
                                </div>
                                <button disabled={outOfStock} onClick={()=> addToCart(product, counter)} className={`button flex items-center ${outOfStock && 'disabled:bg-gray-300 cursor-not-allowed'}`}>
                                    <Cart className='mr-2' /> Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='transition-opacity w-full h-[80vh] flex items-center justify-center text-white'>
                        <div class="custom-loader"></div>
                    </div>
                )
            }
            {
                alert && (
                    <div className="popup-container">
                        <div className="popup">
                            <h2 className="text-lg font-bold mb-4 dark:text-white">Message</h2>
                            <p className="mb-4 dark:text-white">{`Product out of stock. You can only purchase this product less than ${product?.stock_quantity}`}</p>
                            <div className="flex justify-end">

                                <button
                                    className="px-4 py-2 bg-blue-500 ease-linear duration-200 text-white rounded hover:bg-blue-500 dark:bg-white dark:text-black"
                                    onClick={() => showAlert(false)}
                                >
                                    Ok
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default ProductDetail;
