import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/Products/ProductsSlice';
import { useToast } from '../Context/ToastContext';

function Products() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {  notifyError } = useToast();
    const {products, loading, error} = useSelector(state => state.products)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch]);
    
    if(loading){
        return(
            <div className="flex bg-white items-center justify-center h-[calc(100vh-100px)]">
                <div className="loader"></div>
            </div>
        )
    }
    
    if(error){
        notifyError(error)
    }

    return (
        <div className="flex">
            <div className="bg-white dark:bg-gray-800  w-[250px]">
                <div className="text-center mt-3">
                    <h1 className="text-xl font-bold dark:text-white">Apply Filters</h1>
                </div>
                <div className="filters px-4 py-5 dark:text-white">
                    <div className="flex gap-3 items-center mb-4">
                        
                        <input type="checkbox" className='w-4 h-4 rounded text-blue-700 '  id='women'  />
                        <label htmlFor="women">Ladies</label>
                    </div>
                    <div className="flex gap-3 items-center mb-4">
                        <input type="checkbox" className='w-4 h-4 rounded text-blue-700 '  id='men' />
                        <label htmlFor="men">Men</label>
                    </div>
                    <div className="flex gap-3 items-center mb-4">
                        <input type="checkbox" className='w-4 h-4 rounded text-blue-700 '  id='fragrance' />
                        <label htmlFor="fragrance">Fragrances</label>
                    </div>
                    <hr />
                    <div className="mt-4">
                        <label htmlFor="" className='font-bold'>Price</label>
                        <div className="flex gap-2 mt-2">
                            <input type="number" placeholder='min' className='input-text' />
                            <input type="number" placeholder='max' className='input-text' />
                        </div>
                        <button className='button mt-5 w-full'>Apply Filters</button>
                        <button className='button mt-2 w-full' >Clear Filters</button>
                    </div>
                </div>
            </div>
            <div className="">
                {products ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-3 px-5">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white w-[250px] dark:bg-gray-800 p-2 rounded mx-auto hover:shadow-md ease-linear duration-200">
                                <div className="image h-[200px] w-full">
                                    <img className="w-full h-full" src={`${process.env.REACT_APP_BACKEND_URL}${product.image_url}`} alt="" />
                                </div>
                                <div className="px-2 pt-1 dark:text-white">
                                    {product.name.length > 20 ? product.name.substring(0, 20) + '...' : product.name}
                                </div>
                                <div className="flex justify-between items-center py-3 px-2">
                                    <h5 className="text-lg dark:text-white">price <span>{product.price}</span></h5>
                                    <button onClick={() => navigate(`/product-details/${product.slug}`)} className="button">Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded flex justify-center items-center mt-5 mb-5 w-[300px] mx-auto py-5 px-5">
                        <h1 className="text-xl font-bold">No products to Show</h1>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Products;
