import { createContext, useState } from "react"

export const MultiStepContext = createContext()


export const MultiStepProvider = ({ children }) => {
  const [step, setStep] = useState(1)
  const [paymentData, setPaymentData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: '',
    cardHolerName: '',
    cvv: '',
    expDate: '',
    cardNumber: ''
  })
  const [errors, setErrors] = useState({
    email: '',
    cardHolerName: '',
    cvv: '',
    expDate: '',
    cardNumber: ''
  })
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };



  const nextHandler = () => {
    setStep(step + 1);
  }
  const prevHandler = () => {
    setStep(step - 1);
  }

  const contextValues = { step, nextHandler, prevHandler, paymentData, setPaymentData, errors, setErrors, validateEmail }
  return (
    <MultiStepContext.Provider value={contextValues}>
      {children}
    </MultiStepContext.Provider>
  )
}