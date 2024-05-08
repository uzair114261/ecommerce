import React, { useState } from 'react'
import Singup from './Form/Singup';
import Login from './Form/Login';

const UserRegistration = () => {
    const [toggleForm, setToggleForm] = useState(true)

    return (
        <div className='min-h-[100vh] flex justify-center items-center px-10'>
            {toggleForm ? (
                <Login setToggleForm={setToggleForm} />
            ) : (
                <Singup setToggleForm={setToggleForm} />
            )}
        </div>
    )
}

export default UserRegistration