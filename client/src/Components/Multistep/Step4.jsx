import React from 'react'
import { useSelector } from 'react-redux'

const Step4 = () => {
  const success = useSelector(state => state.multistep.success)
  console.log(success);
  return (
    <div>
      {
        success ? (
          <div className=''>
            Passed
          </div>
        ) : (
          <div>
            Failed
          </div>
        )
      }
    </div>
  )
}

export default Step4