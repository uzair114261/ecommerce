import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { setStep, setPaymentData } from '../../features/multistep/multistepSlice'

const Step2 = () => {
  const dispatch = useDispatch()
  const paymentData = useSelector(state => state.multistep.paymentData)
  const schema = yup.object().shape({
    address: yup.string().required('Address is required')
  })
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema),
    defaultValues: paymentData
  })
  const prevHandler = () => {
    dispatch(setStep(1))
  }
  const nextHandler = (data) => {
    dispatch(
      setPaymentData({
        address: data.address
      })
    )
    dispatch(setStep(3))
  }
  const [alert, showAlert] = useState(false)
  
  return (
    <div>
      <h1 className="text-2xl font-semibold sm:text-3xl sm:font-bold dark:text-white">Shipping Infromation</h1>
      <p className='text-sm dark:text-white'>Please provide your address to ship your order.</p>
      <div className='mt-3'>
        <div className='mb-3'>
          <label htmlFor="" className='label'>Address</label>
          <textarea  name='addreess' {...register('address')} id="" cols="50" rows="4" className='input-text w-full resize-none'></textarea>
          {errors.address && <span className='errors'>{errors.address.message}</span>}
        </div>

      </div>
      <div className="flex justify-between items-center sm:h-[100px]">
        <button onClick={prevHandler} className='bg-blue-500 dark:text-black dark:bg-white rounded py-1 px-3 text-white'>Back</button>
        <button onClick={handleSubmit(nextHandler)}  className='bg-blue-500 dark:text-black dark:bg-white rounded py-1 px-3 text-white'>Next</button>
      </div>
    </div>
  )
}

export default Step2