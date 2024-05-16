import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setStep,
  setPaymentData,
  setSuccess,
} from "../../features/multistep/multistepSlice";
import ReactInputMask from "react-input-mask";
import { getTotalPrice, clearCart } from "../../features/cart/CartSlice";
import {
  submitCODPayment,
  CredictCardTransaction,
} from "../../features/multistep/multistepSlice";

const Step3 = () => {
  const totalPrice = useSelector(getTotalPrice);
  const dispatch = useDispatch();
  const paymentData = useSelector((state) => state.multistep.paymentData);
  const loading = useSelector((state) => state.multistep.loading);
  const [alert, showAlert] = useState(false);

  const handlePaymentType = (e) => {
    dispatch(
      setPaymentData({
        paymentMethod: e.target.value,
      })
    );
  };
  const prevHandler = () => {
    dispatch(setStep(2));
  };

  const handlePaymentConfirmation = () => {
    if (paymentData.paymentMethod === "COD") {
      sendCODPaymentToServer();
    } else if (paymentData.paymentMethod === "Credit Card") {
      CardTransactionHandler();
    } else {
      showAlert(true);
    }
  };
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const purchasedItems = cartItems?.map((item) => ({
    id: item.id,
    quantity: item.quantity,
  }));

  const sendCODPaymentToServer = async () => {
    try {
      const formData = new FormData();
      formData.append("cust_name", paymentData.name);
      formData.append("cust_email", paymentData.email);
      formData.append("cust_phone", paymentData.phone);
      formData.append("cust_address", paymentData.address);
      formData.append("price", totalPrice);
      formData.append("payment_method", paymentData.paymentMethod);
      formData.append("purchased_items", JSON.stringify(purchasedItems));
      const resultAction = await dispatch(submitCODPayment(formData));
      if (submitCODPayment.fulfilled.match(resultAction)) {
        const responseData = resultAction.payload;
        if (responseData.ok) {
          dispatch(clearCart());
          dispatch(setStep(4));
          dispatch(setSuccess(true));
        } else {
          dispatch(setStep(4));
          dispatch(setSuccess(false));
        }
      }
    } catch (error) {
      console.error("Error sending payment:", error);
    }
  };

  const CardTransactionHandler = async () => {
    try {
      const formData = new formData();
      formData.append("cust_name", paymentData.name);
      formData.append("cust_email", paymentData.email);
      formData.append("cust_phone", paymentData.phone);
      formData.append("cust_address", paymentData.address);
      formData.append("price", totalPrice);
      formData.append("payment_method", paymentData.paymentMethod);
      formData.append("purchased_items", JSON.stringify(purchasedItems));
      const resultAction = await dispatch(CredictCardTransaction(formData));
      if (CredictCardTransaction.fulfilled.match(resultAction)) {
        const responseData = resultAction.payload;
        if (responseData.ok) {
          dispatch(clearCart());
          dispatch(setStep(4));
          dispatch(setSuccess(true));
        } else {
          dispatch(setStep(4));
          dispatch(setSuccess(false));
        }
      }
    } catch (error) {
      console.log("Error in sending Payment", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold sm:text-3xl sm:font-bold dark:text-white">
        Payement Details
      </h1>
      <p className="text-sm dark:text-white">
        Please provide your payment details to confirm order.
      </p>
      <div className="mt-3">
        <div className="mb-3 sm:w-[350px]">
          <label htmlFor="" className="label">
            Select Payment Type
          </label>
          <select className="selectbox" onChange={handlePaymentType}>
            <option className="py-3" value="">
              Choose
            </option>
            <option className="py-3" value="COD">
              Cash on Delievery
            </option>
            <option className="py-3" value="Credit Card">
              Credit Card
            </option>
          </select>
        </div>
        {paymentData.paymentMethod === "Credit Card" && (
          <div className="card-details">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="card-details-item col-span-2">
                <label htmlFor="" className="label">
                  Card Holder Name
                </label>
                <input
                  onChange={(e) =>
                    dispatch(setPaymentData({ cardHolerName: e.target.value }))
                  }
                  className="input-text"
                  type="text"
                  placeholder="Name on Card"
                />
              </div>
              <div className="flex justify-between gap-4 w-full sm:block">
                <div className="card-details-item col-span-1">
                  <label htmlFor="" className="label">
                    CVV
                  </label>
                  <ReactInputMask
                    onChange={(e) =>
                      dispatch(setPaymentData({ cvv: e.target.value }))
                    }
                    mask={`9999`}
                    maskChar="_"
                    className="input-text"
                    type="text"
                    placeholder="CVV"
                  />
                </div>
                <div className="card-details-item col-span-1 sm:hidden">
                  <label htmlFor="" className="label">
                    Exp Date
                  </label>
                  <ReactInputMask
                    onChange={(e) =>
                      dispatch(setPaymentData({ expDate: e.target.value }))
                    }
                    mask="99-99"
                    maskChar="_"
                    className="input-text"
                    type="text"
                    placeholder="MM/YY"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 mb-3">
              <div className="card-details-item col-span-1 hidden sm:block">
                <label htmlFor="" className="label">
                  Exp Date
                </label>
                <ReactInputMask
                  onChange={(e) =>
                    dispatch(setPaymentData({ expDate: e.target.value }))
                  }
                  mask="99-99"
                  maskChar="_"
                  className="input-text"
                  type="text"
                  placeholder="MM/YY"
                />
              </div>
              <div className="card-details-item col-span-2">
                <label htmlFor="" className="label">
                  Card Number
                </label>
                <ReactInputMask
                onChange={(e) => dispatch(setPaymentData({cardNumber: e.target.value}))}
                  mask="9999 9999 9999 9999"
                  maskChar="_"
                  className="input-text"
                  type="text"
                  placeholder="Name on Card"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center sm:h-[100px]">
        <button
          onClick={prevHandler}
          className="bg-blue-500 dark:text-black dark:bg-white rounded py-1 px-3 text-white"
        >
          Back
        </button>
        <button
          onClick={handlePaymentConfirmation}
          className="flex gap-3 bg-blue-500 dark:text-black dark:bg-white rounded py-1 px-3 text-white"
        >
          <div>Confirm</div> {loading && <div className="spinner"></div>}
        </button>
      </div>
      {alert && (
        <div className="popup-container">
          <div className="popup">
            <h2 className="text-lg font-bold mb-4 dark:text-white">Message</h2>
            <p className="mb-4 dark:text-white">
              {paymentData.paymentMethod === "Credit Card"
                ? "Sending data to server for credit card"
                : paymentData.paymentMethod === "COD"
                ? "Sending data to server for Cash on Delivery"
                : "Please select the payment type"}
            </p>
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
      )}
    </div>
  );
};

export default Step3;
