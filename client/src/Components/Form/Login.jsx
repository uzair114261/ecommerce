import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'
import * as yup from 'yup';
import { useToast } from '../Context/ToastContext';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToggleForm}) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { notifySuccess, notifyError } = useToast();
    const schema = yup.object().shape({
        email : yup.string().email('Invalid Email').required('Email is required'),
        password: yup.string().min(6, 'Password must be atleast 6 characters').max(12, 'Password is too long').required('Password is required')
    })
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })
    const submitHandler = async (data) => {
        try{
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}account/users/login/`,{
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            console.log(response);
            const responseData = await response.json()
            if(response.ok){
                const {access, refresh, user} = responseData;
                localStorage.clear();
                localStorage.setItem('access', access);
                localStorage.setItem('refresh', refresh);
                localStorage.setItem('customer_data', JSON.stringify(user));
                notifySuccess('Login Successfully.')
                setTimeout(() => {
                    navigate('/cart')
                }, 1500);
            }
            console.log(responseData);
            
            if(!response.ok){
                if(response.statusText === 'Not Found'){
                    notifyError('Customer not Found')
                }else if(response.statusText === 'Unauthorized'){
                    notifyError('Unauthorized access, passowrd is incorrect')
                }
            }
            setLoading(false)
        }catch(error){
            console.error('error in login', error.message)
        }
    }
    return (
        <div>
            <div className='flex flex-col gap-2 min-w-[300px] max-w-[500px] md:w-[350px] bg-white p-5 shadow-lg shadow-gray-300 rounded-lg dark:bg-gray-800 dark:shadow-none'>
                <h2 className='text-gray-700 text-center text-2xl font-bold dark:text-white'>Login Form</h2>
                <form action="" onSubmit={handleSubmit(submitHandler)}>
                    <div className='mb-3'>
                        <label htmlFor="" className='label'>Email</label>
                        <input type="text" {...register('email')} className='input-text' />
                        {errors.email && <span className='text-blue-800 text-sm dark:text-white'>{errors.email.message}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="" className='label'>Password</label>
                        <input type="password"  {...register('password')} className='input-text' />
                        {errors.password && <span className='text-blue-800 text-sm dark:text-white'>{errors.password.message}</span>}
                    </div>
                    <div>
                        <button type='submiy' className="submit-btn">
                            {loading ? (<div className='loader'></div>): (<div>Login</div>)}
                        </button>
                        <div className="flex justify-end items-center">
                            <h2 className='text-sm cursor-pointer dark:text-white' onClick={() => setToggleForm(false)}>Create an account</h2>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Login