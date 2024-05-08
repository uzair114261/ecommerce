import React, { useContext } from 'react'
import Step1 from './Multistep/Step1'
import Step2 from './Multistep/Step2'
import Step3 from './Multistep/Step3'
import Step4 from './Multistep/Step4'
import { MultiStepContext } from './Context/Multistep'
import { Check2 } from 'react-bootstrap-icons'

const Checkout = () => {
    const MultiStep = useContext(MultiStepContext)
    const { step } = MultiStep
    return (
        <div className='bg-blue-100 dark:bg-gray-700 flex items-center justify-center py-5 px-2'>
            <div className="bg-white dark:bg-gray-800 rounded p-2 sm:p-5 w-full sm:w-[1000px] max-w-[1000px] flex flex-col sm:flex-row">
                <div className="sm:w-[30%] sm:py-14  bg-blue-500 dark:bg-gray-900 sm:rounded-tl sm:rounded-bl flex justify-center">
                    <div className='flex gap-5 w-80 sm:w-[unset] justify-evenly sm:block'>
                        <div className="step flex flex-col sm:flex-row gap-1 sm:gap-5 items-center my-10 ">
                            <div className={`h-[30px] w-[30px] text-sm sm:text-lg border-2  border-white border-solid text-white flex items-center justify-center rounded-[50%] ${step >= 1 ? 'bg-white' : ''}`}>{step >= 1 ? <Check2 color='#333' /> : 1}</div>
                            <div>
                                <h1 className='hidden sm:block leading-5 text-white'>Step 1</h1>
                                <p className='hidden sm:block leading-5 text-sm sm:text-normal text-white'>Personal Info</p>
                            </div>
                        </div>
                        <div className="step flex flex-col sm:flex-row gap-1 sm:gap-5 items-center my-10">
                            <div className={`h-[30px] w-[30px] text-sm sm:text-lg border-2  border-white border-solid text-white flex items-center justify-center rounded-[50%] ${step >= 2 ? 'bg-white' : ''}`}>{step >= 2 ? <Check2 color='#333' /> : 2}</div>
                            <div>
                                <h1 className='hidden sm:block leading-5 text-white'>Step 2</h1>
                                <p className='hidden sm:block leading-5 text-sm sm:text-normal text-white'>Shipping Info</p>
                            </div>
                        </div>
                        <div className="step flex flex-col sm:flex-row gap-1 sm:gap-5 items-center my-10">
                            <div className={`h-[30px] w-[30px] text-sm sm:text-lg border-2  border-white border-solid text-white flex items-center justify-center rounded-[50%] ${step >= 3 ? 'bg-white' : ''}`}>{step >= 3 ? <Check2 color='#333' /> : 3}</div>
                            <div>
                                <h1 className='hidden sm:block leading-5 text-white'>Step 3</h1>
                                <p className='hidden sm:block leading-5 text-sm sm:text-normal text-white'>Payement</p>
                            </div>
                        </div>
                        <div className="step flex flex-col sm:flex-row gap-1 sm:gap-5 items-center my-10">
                            <div className={`h-[30px] w-[30px] text-sm sm:text-lg border-2  border-white border-solid text-white flex items-center justify-center rounded-[50%] ${step >= 4 ? 'bg-white' : ''}`}>4</div>
                            <div>
                                <h1 className='hidden sm:block leading-5 text-white'>Step 1</h1>
                                <p className='hidden sm:block leading-5 text-sm sm:text-normal text-white'>Confirmation</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sm:w-[70%] sm:p-20 p-5">
                    {step === 1 && <Step1 />}
                    {step === 2 && <Step2 />}
                    {step === 3 && <Step3 />}
                    {step === 4 && <Step4 />}
                </div>
            </div>
        </div>
    )
}

export default Checkout