import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { useParams } from "react-router-dom";
import { memo } from "react";
import { Cart } from "react-bootstrap-icons";
import { fetchProductInfo } from "../features/ProductsInfo/ProductInfoSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementCounter,
  decrementCounter,
  hideAlert, resetCounter
} from "../features/ProductsInfo/ProductInfoSlice";
import { addToCart } from "../features/cart/CartSlice";

function ProductDetail() {
  const dispatch = useDispatch();
  const { product, loading, error, counter, alert } = useSelector(
    (state) => state.productInfo
  );
  
  const { slug } = useParams();
  // const [outOfStock, setOutOfStock] = useState(false);

  useEffect(() => {
    dispatch(fetchProductInfo(slug));
    dispatch(resetCounter(1))
  }, [slug]);

  const handleIncrement = useCallback(() => {
    dispatch(incrementCounter());
  }, [dispatch]);

  const handleDecrement = () => {
    dispatch(decrementCounter());
  };
  console.log("Rendered");

  return (
    <div className="container mx-auto pt-12">
      {product ? (
        <div className="grid grid-cols-1 md:grid-cols-2 py-5">
          <div className="flex justify-center">
            <div className="image h-[500px] w-[400px] border-white dark:border-gray-800 border-[10px] border-solid">
              <img
                className="w-full h-full "
                src={`${process.env.REACT_APP_BACKEND_URL}${product.image_url}`}
                alt=""
              />
            </div>
          </div>
          <div className="details bg-white dark:bg-gray-800 rounded-lg px-4 py-5">
            <h1 className="text-xl font-bold dark:text-white">
              {product.name}
            </h1>
            <div className="py-2 dark:text-white">
              <h2 className="text-lg">Description</h2>
              <p className="text-justify text-sm">{product.description}</p>
            </div>
            <p className="text-xl dark:text-white">Price {product.price}</p>
            <div className="add-to-cart flex items-center mt-4">
              <div className="quantity">
                <div className="flex mr-4 dark:text-white">
                  <button
                    onClick={handleDecrement}
                    className="border px-2 font-bold"
                  >
                    -
                  </button>
                  <button className="border px-5">{counter}</button>
                  <button
                    onClick={handleIncrement}
                    className="border px-2 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => dispatch(addToCart({product, quantity:counter}))}
                className="button flex items-center"
              >
                <Cart className="mr-2" /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="transition-opacity w-full h-[80vh] flex items-center justify-center text-white">
          <div class="custom-loader"></div>
        </div>
      )}
      {alert && (
        <div className="popup-container">
          <div className="popup">
            <h2 className="text-lg font-bold mb-4 dark:text-white">Message</h2>
            <p className="mb-4 dark:text-white">{`Product out of stock. You can only purchase this product less than ${product?.stock_quantity}`}</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-blue-500 ease-linear duration-200 text-white rounded hover:bg-blue-500 dark:bg-white dark:text-black"
                onClick={() => dispatch(hideAlert())}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
