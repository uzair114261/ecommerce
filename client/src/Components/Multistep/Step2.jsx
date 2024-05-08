import React, { useContext, useState } from 'react'
import { MultiStepContext } from '../Context/Multistep'
const Step2 = () => {
  const MultiStep = useContext(MultiStepContext)
  const { nextHandler, prevHandler, paymentData, setPaymentData } = MultiStep
  const [alert, showAlert] = useState(false)
  const handleNext = () => {
    if(paymentData.address === ''){
      showAlert(true)
    }else{
      nextHandler()
    }
  }
  return (
    <div>
      <h1 className="text-2xl font-semibold sm:text-3xl sm:font-bold dark:text-white">Shipping Infromation</h1>
      <p className='text-sm dark:text-white'>Please provide your address to ship your order.</p>
      <div className='mt-3'>
        <div className='mb-3'>
          <label htmlFor="" className='label'>Address</label>
          <textarea value={paymentData.address} name='addreess' onChange={(e) => setPaymentData({ ...paymentData, address: e.target.value })} id="" cols="50" rows="4" className='input-text w-full resize-none'></textarea>
        </div>

      </div>
      <div className="flex justify-between items-center sm:h-[100px]">
        <button onClick={prevHandler} className='bg-blue-500 dark:text-black dark:bg-white rounded py-1 px-3 text-white'>Back</button>
        <button onClick={handleNext} className='bg-blue-500 dark:text-black dark:bg-white rounded py-1 px-3 text-white'>Next</button>
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

export default Step2