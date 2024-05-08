import React, { useContext, useState } from 'react'
import { MultiStepContext } from '../Context/Multistep'
import { CartContext } from '../Cart';

const Step3 = () => {
  const { getCartTotal, setCartItems } = useContext(CartContext)
  const { prevHandler, paymentData, setPaymentData } = useContext(MultiStepContext);
  const [paymentType, setPaymentType] = useState('');
  const [loading, setLoading] = useState(false)
  const [alert, showAlert] = useState(false)

  const handlePaymentType = (e) => {
    setPaymentType(e.target.value);
    setPaymentData({ ...paymentData, paymentMethod: e.target.value })
  }

  const handlePaymentConfirmation = () => {
    if (paymentType === 'COD') {
      sendCODPaymentToServer()
    } else if (paymentType === 'Credit Card') {
      showAlert(true)
    } else {
      showAlert(true)
    }
  }
  const cartItems = JSON.parse(localStorage.getItem('cartItems'))
  const purchasedItems = cartItems?.map(item => ({ id: item.id, quantity: item.quantity }))

  const sendCODPaymentToServer = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('cust_name', paymentData.name);
    formData.append('cust_email', paymentData.email);
    formData.append('cust_phone', paymentData.phone);
    formData.append('cust_address', paymentData.address);
    formData.append('price', getCartTotal());
    formData.append('payment_method', paymentData.paymentMethod);
    formData.append('purchased_items', JSON.stringify(purchasedItems));

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}payments/cod-payment`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Payment successful');
        setCartItems([]);
        setPaymentData({})
      } else {
        console.error('Server returned error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error sending payment:', error);
    }

    setTimeout(() => {

      setLoading(false);
    }, 1500);
  };


  return (
    <div>
      <h1 className="text-2xl font-semibold sm:text-3xl sm:font-bold dark:text-white">Payement Details</h1>
      <p className='text-sm dark:text-white'>Please provide your payment details to confirm order.</p>
      <div className='mt-3'>
        <div className='mb-3 sm:w-[350px]'>
          <label htmlFor="" className='label'>Select Payment Type</label>
          <select className='selectbox' onChange={handlePaymentType}>
            <option className='py-3' value="">Choose</option>
            <option className='py-3' value="COD">Cash on Delievery</option>
            <option className='py-3' value="Credit Card">Credit Card</option>
          </select>
        </div>
        {
          paymentType === 'Credit Card' && (
            <div className='card-details'>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className='card-details-item col-span-2'>
                  <label htmlFor="" className='label'>Card Holder Name</label>
                  <input className='input-text' type="text" placeholder="Name on Card" />
                </div>
                <div className='flex justify-between gap-4 w-full sm:block'>
                  <div className='card-details-item col-span-1'>
                    <label htmlFor="" className='label'>CVV</label>
                    <input className='input-text' type="text" placeholder="CVV" />
                  </div>
                  <div className='card-details-item col-span-1 sm:hidden'>
                    <label htmlFor="" className='label'>Exp Date</label>
                    <input className='input-text' type="text" placeholder="MM/YY" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 mb-3">
                <div className='card-details-item col-span-1 hidden sm:block'>
                  <label htmlFor="" className='label'>Exp Date</label>
                  <input className='input-text' type="text" placeholder="MM/YY" />
                </div>
                <div className='card-details-item col-span-2'>
                  <label htmlFor="" className='label'>Card Number</label>
                  <input className='input-text' type="text" placeholder="Name on Card" />
                </div>
              </div>
            </div>
          )
        }


      </div>
      <div className="flex justify-between items-center sm:h-[100px]">
        <button onClick={prevHandler} className='bg-blue-500 dark:text-black dark:bg-white rounded py-1 px-3 text-white'>Back</button>
        <button onClick={handlePaymentConfirmation} className='flex gap-3 bg-blue-500 dark:text-black dark:bg-white rounded py-1 px-3 text-white'>
          <div>Confirm</div> {loading && <div className='loader'></div>}
        </button>
      </div>
      {
        alert && (
          <div className="popup-container">
            <div className="popup">
              <h2 className="text-lg font-bold mb-4 dark:text-white">Message</h2>
              <p className="mb-4 dark:text-white">{paymentType === 'Credit Card'
                ? 'Sending data to server for credit card'
                : paymentType === 'COD'
                  ? 'Sending data to server for Cash on Delivery'
                  : 'Please select the payment type'}</p>
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
  )
}

export default Step3