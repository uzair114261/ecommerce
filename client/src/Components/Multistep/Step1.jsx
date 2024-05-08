import React, { useContext, useState } from 'react'
import { MultiStepContext } from '../Context/Multistep'
import InputMask from 'react-input-mask'
const Step1 = () => {
  const MultiStep = useContext(MultiStepContext);
  const { nextHandler, paymentData, setPaymentData, errors, setErrors, validateEmail } = MultiStep;
  const [alert, showAlert] = useState(false)

  const EmailHandler = (e) => {
    const newEmail = e.target.value;
    const emailRegex = /^[^\s'"@]+@[^\s'"@]+\.[^\s'"@]+$/;
    if (!emailRegex.test(newEmail)) {
      setErrors({ ...errors, email: 'Please Enter a valid email address' })
    } else {
      setErrors({ ...errors, email: '' })
    }
    setPaymentData({
      ...paymentData,
      email: newEmail
    })
  };
  const handleNext = () => {
    if (paymentData.name === '' || paymentData.email === '' || paymentData.phone === '') {
      showAlert(true)
    } else {
      if (validateEmail(paymentData.email)) {
        nextHandler();
      }
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-semibold sm:text-3xl sm:font-bold dark:text-white">Your Information</h1>
      <p className='text-sm dark:text-white'>Please provide your name, email address and phone number.</p>
      <div className='sm:w-[350px] mt-3'>
        <div className='mb-3'>
          <label htmlFor="" className='label'>Name</label>
          <input type="text" name='name' value={paymentData.name} onChange={(e) => setPaymentData({ ...paymentData, name: e.target.value })} className='input-text' />

        </div>
        <div className='mb-3'>
          <label htmlFor="" className='label'>Email</label>
          <input type="email" name='email' value={paymentData.email} onChange={EmailHandler} className='input-text' />
          {errors.email && <span className='text-red-600'>{errors.email}</span>}
        </div>
        <div className='mb-3'>
          <label htmlFor="" className='label'>Phone Number</label>
          <InputMask name='phone' value={paymentData.phone} onChange={(e) => setPaymentData({ ...paymentData, phone: e.target.value })} className='input-text' mask="0399-9999999" maskChar="_" />
        </div>
        </div>
        <div className="flex justify-end items-center sm:h-[100px]">
          <button type='button' onClick={handleNext} className='bg-blue-500 dark:text-black dark:bg-white rounded py-1 px-3 text-white'>Next</button>
        </div>
        {
          alert && (
            <div className="popup-container">
              <div className="popup">
                <h2 className="text-lg font-bold mb-4 dark:text-white">Message</h2>
                <p className="mb-4 dark:text-white">Please fill all the fields</p>
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

export default Step1