import React, { useState } from "react";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "../Context/ToastContext";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../features/auth/registerSlice";

const Singup = ({ setToggleForm }) => {
  const dispatch = useDispatch();
  const { error, loading, response } = useSelector((state) => state.register);
    console.log(response.ok)
  const { notifySuccess, notifyError } = useToast();
  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be atleast 6 characters")
      .max(12, "Password is too long")
      .required("Password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const registerSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("phone_number", data.phoneNumber);
      formData.append("user_image", data.image[0]);
      
      // Dispatch createUser and wait for it to complete
      const action = await dispatch(createUser(formData));
      
      // Handle success case
      notifySuccess("Account has been created successfully");
      setTimeout(() => {
        setToggleForm(true);
      }, 2000);
    } catch (error) {
      // Handle error case
      console.log("error in posting data", error.message);
      const errorMessage = error.payload ? error.payload : 'Failed to create user';
      console.log(errorMessage);
      if (error.email) {
        const errorData = error.email[0];
        notifyError(errorData);
      } else if (error.phone_number) {
        const errorData = error.phone_number[0];
        notifyError(errorData);
      }
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-2 min-w-[320px] max-w-[500px] md:w-[500px] bg-white p-5 shadow-lg shadow-gray-300 rounded-lg dark:bg-gray-800 dark:shadow-none">
        <h2 className="text-gray-700 text-center text-2xl font-bold dark:text-white">
          Create an Account
        </h2>
        <form action="" onSubmit={handleSubmit(registerSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-2">
            <div className="">
              <label htmlFor="" className="label">
                Your Name
              </label>
              <input type="text" {...register("name")} className="input-text" />
            </div>
            <div className="">
              <label htmlFor="" className="label">
                Email
              </label>
              <input
                type="text"
                {...register("email")}
                className="input-text"
              />
              {errors.email && (
                <span className="text-red-800 text-sm dark:text-white">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-2">
            <div className="">
              <label htmlFor="" className="label">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                className="input-text"
              />
              {errors.password && (
                <span className="text-red-800 text-sm dark:text-white">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="">
              <label htmlFor="" className="label">
                Phone Number
              </label>
              <InputMask
                {...register("phoneNumber")}
                className="input-text"
                mask="0399-9999999"
                maskChar="_"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="profileImage"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Profile Picture
            </label>
            <input
              type="file"
              {...register("image")}
              id="profileImage"
              accept="image/*"
              className="input-file"
              multiple={false}
            />
          </div>
          <div>
            <button type="submit" className="submit-btn h-[40px]">
              {loading ? (
                <div className="spinner text-center"></div>
              ) : (
                <div>Sign Up</div>
              )}
            </button>
            <div className="flex justify-end items-center">
              <h2
                className="text-sm cursor-pointer dark:text-white"
                onClick={() => setToggleForm(true)}
              >
                Login to your account
              </h2>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Singup;
