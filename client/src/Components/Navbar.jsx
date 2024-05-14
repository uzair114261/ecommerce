import React, { useContext, useEffect, useState } from "react";
import { Cart3, PeopleFill, List, X } from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";
import { memo } from "react";
import { useSelector, shallowEqual } from "react-redux";
import DarkModeToggle from "./DarkModeToggle";

function Navbar() {
  const cartItems = useSelector((state) => state.cart, shallowEqual);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const handletoggle = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  return (
    <div className=" left-0 right-0 flex bg-blue-500 dark:bg-gray-900 ">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-3 px-2">
          <Link to="/">
            <h5 className="text-xl sm:text-3xl fon-bold text-white">
              Ecommerce
            </h5>
          </Link>
          <div className="hidden md:block">
            <Link className="mx-2 text-white" to="/">
              Home
            </Link>
            <Link className="mx-2 text-white" to="/product">
              Product
            </Link>
          </div>
          <div className="right flex gap-4 items-center">
            <Link to="/cart">
              <button className="relative mr-3">
                <Cart3 size={20} color="#fff" />
                <span className='absolute top-[-10px] bg-white px-1 rounded right-[-15px] text-xs text-blue-500'>{cartItems.cartItems.length}</span>
              </button>
            </Link>
            <Link to="/account">
              <div className="users">
                <PeopleFill size={22} color="#FFF" />
              </div>
            </Link>
            <DarkModeToggle />
            <button className="md:hidden flex" onClick={handletoggle}>
              {isOpen ? (
                <X size={22} color="#fff" />
              ) : (
                <List size={22} color="#fff" />
              )}
            </button>
          </div>
          {isOpen && (
            <div className="bg-slate-200 dark:bg-gray-800 fixed left-0 right-0 top-[50px] h-[calc(100vh-50px)] flex items-center justify-center overflow-y-auto">
              <div className=" flex flex-col gap-3 py-3 w-full px-3">
                <Link
                  className="bg-blue-500 sm:mx-2 text-white dark:text-black dark:bg-white rounded py-3 text-center"
                  to="/"
                >
                  Home
                </Link>
                <Link
                  className="bg-blue-500 sm:mx-2 text-white dark:text-black dark:bg-white rounded py-3 text-center"
                  to="/product"
                >
                  Product
                </Link>
                <Link
                  className="bg-blue-500 sm:mx-2 text-white dark:text-black dark:bg-white rounded py-3 text-center"
                  to="/product"
                >
                  Product
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(Navbar);
