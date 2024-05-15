import React, { useContext, useState } from "react";
import { MultiStepContext } from "../Context/Multistep";
import InputMask from "react-input-mask";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  setPaymentData,
  setStep,
} from "../../features/multistep/multistepSlice";

const Step1 = () => {
  const dispatch = useDispatch();
  const paymentData = useSelector((state) => state.multistep.paymentData);
  const schema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("Email is required"),
    name: yup.string().required("Please enter the name"),
    phone: yup.string().required("Please enter the phone number"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: paymentData
  });

  const handleNext = (data) => {
    dispatch(
      setPaymentData({
        name: data.name,
        email: data.email,
        phone: data.phone,
      })
    )
    dispatch(setStep(2))
  };
  return (
    <div>
      <h1 className="text-2xl font-semibold sm:text-3xl sm:font-bold dark:text-white">
        Your Information
      </h1>
      <p className="text-sm dark:text-white">
        Please provide your name, email address and phone number.
      </p>
      <div className="sm:w-[350px] mt-3">
        <div className="mb-3">
          <label htmlFor="" className="label">
            Name
          </label>
          <input
            type="text"
            {...register("name")}
            name="name"
            className="input-text"
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="" className="label">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            name="email"
            className="input-text"
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="" className="label">
            Phone Number
          </label>
          <InputMask
            name="phone"
            {...register("phone")}
            className="input-text"
            mask="0399-9999999"
            maskChar="_"
          />
          {errors.phone && (
            <span className="error">{errors.phone.message}</span>
          )}
        </div>
      </div>
      <div className="flex justify-end items-center sm:h-[100px]">
        <button
          type="button"
          onClick={handleSubmit(handleNext)}
          className="bg-blue-500 dark:text-black dark:bg-white rounded py-1 px-3 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1;
