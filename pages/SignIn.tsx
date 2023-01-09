import React, { useState, useRef, useEffect } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import OAuth from "../components/OAuth";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRouter } from "next/router";
// import { Link } from 'react-router-dom';
// import OAuth from '../components/OAuth'

type FormValues = {
  password: string;
  email: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required please"),
  password: yup.string().min(4).max(15).required(),
});
const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter()

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    console.log(data)
    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
        if(userCredential.user){
          router.push('/')
        }

      
      
    } catch (error: any) {
      console.log(error)
      setError(error.message)
    }
  }
  return (
    <section className="">
      <h1 className="text-3xl mt-6 text-center font-bold">Sign In</h1>
      <div className="lg:flex px-6 my-12 justify-center items-center lg:gap-14 xl:gap-20 max-w-6xl mx-auto">
        <div className="w-full mb-12 ">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
            className="w-full rounded-2xl h-[50vh]"
          />
        </div>
        <div className="w-full ">
          <form
            className="flex flex-col gap-2"
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
            <p className="text-red-500 font-semibold"> {errors.email?.message} </p>
            <div className="relative ">
              <input
                className="py-4 px-5 text-xl rounded  transition ease-in-out border-none outline-blue-400 ring-slate-300 shadow-md w-full"
                type={showPassword ? "text" : "password"}
                placeholder="Password..."
                {...register("password")}
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute top-5 right-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <AiFillEye
                  className="absolute top-5 right-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
              <p className="text-red-500 font-semibold"> {errors.password?.message} </p>
            </div>
            <div className="font-semibold flex justify-between text-sm lg:text-lg">
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
                  href="/ForgetPassword"
                  className="text-blue-600 transition duration-200 ease-in-out hover:text-blue-800"
                >
                  Forgot Password?
                </Link>
              </p>
            </div>
            <button
              className="bg-blue-600 text-white mt-4 uppercase text-sm font-medium  rounded py-3 w-full cursor-pointer shadow-md hover:bg-blue-700 transition ease-in-out duration-150 hover:shadow-lg active:bg-blue-800"
              type="submit"
            >
              sign in
            </button>
            <div className=" before:border-t flex before:flex-1 items-center before:border-gray-300 after:border-t  after:flex-1  after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
          <h1 className="">{error}</h1>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
