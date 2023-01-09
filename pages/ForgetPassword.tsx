import React, { useState, useRef , useEffect} from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import OAuth from "../components/OAuth";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
// import { Link } from 'react-router-dom';
// import OAuth from '../components/OAuth'
type FormValues = {
  password: string;
  email: string;
};
const schema = yup.object().shape({
  email: yup.string().email().required("Email is required please"),
});
const ForgotPassword = () => {

  const inputRef = useRef<HTMLInputElement>(null);
   useEffect(() => {
     inputRef.current?.focus();
   }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, data.email)
    } catch (error) {
      console.log(error);
      
    }
  };
  return (
    <section className="">
      <h1 className="text-3xl mt-6 text-center font-bold">Forgot Password</h1>
      <div className="lg:flex px-6 my-12 justify-center items-center lg:gap-14 xl:gap-20 max-w-6xl mx-auto">
        <div className="w-full mb-12 ">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
            className="w-full rounded-2xl "
          />
        </div>
        <div className="w-full ">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              autoComplete="off"
              className="py-4 px-5 text-xl rounded  transition ease-in-out outline-blue-400 ring-slate-300 shadow-md w-full"
              type="text"
              placeholder="Email address"
              {...register("email")}
              ref={inputRef}
            />
            <p className="text-red-500"> {errors.email?.message} </p>
            <div className="font-semibold flex justify-between whitespace-nowrap text-sm lg:text-lg">
              <p className="">
                Don't have a account?
                <Link
                  href="/SignUp"
                  className="text-red-600 transition duration-200 ease-in-out hover:text-red-700 ml-1"
                >
                  Register
                </Link>
              </p>
              <p className="">
                <Link
                  href="/SignIn"
                  className="text-blue-600 transition duration-200 ease-in-out hover:text-blue-800"
                >
                  sign in instead
                </Link>
              </p>
            </div>
            <button
              className="bg-blue-600 text-white mt-4 uppercase text-sm font-medium  rounded py-3 w-full cursor-pointer shadow-md hover:bg-blue-700 transition ease-in-out duration-150 hover:shadow-lg active:bg-blue-800"
              type="submit"
            >
              Send reset password
            </button>
            <div className=" before:border-t flex before:flex-1 items-center before:border-gray-300 after:border-t  after:flex-1  after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
