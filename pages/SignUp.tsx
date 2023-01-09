import React, { useEffect, useRef, useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useForm, SubmitHandler } from 'react-hook-form'
import { getAuth } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import OAuth from "../components/OAuth";

type FormValues = {
  password: string | number;
  email: string;
  fullName: string;
};

const SignUp = () => {
  const schema = yup.object().shape({
    fullName: yup.string().required("Full Name is required"),
    email: yup.string().email().required("Email is required please"),
    password: yup.string().min(4).max(15).required(),
  }); 

  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  // console.log(schema.email);
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    console.log(data);

    try {
      const auth = getAuth();
        console.log(data);
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
      const userCur = auth.currentUser;
          if (userCur !== null) {
            updateProfile(userCur, {
              displayName: data.fullName,
            });
          }
      const user = userCredential.user
      console.log(user);
       const formDataCopy = { ...data };
       delete formDataCopy.password;
        formDataCopy.timestamp = serverTimestamp();

        await setDoc(doc(db, 'users', user.uid), formDataCopy)
        router.push('/')
    } catch (error) {
      console.log(error);
    }

    // createUserWithEmailAndPassword(auths, data.email, data.password).then(
    //   (userCredential) => {
    //     const user = auths.currentUser;
    //     if (user !== null) {
    //       updateProfile(user, {
    //         displayName: data.fullName,
    //       });
    //     }
    //     const formDataCopy = { ...data } as Partial<FormValues>;
    //     delete formDataCopy.password;
    //     // formDataCopy.timestamp = serverTimestamp()
    //     // delete data.password
    //     const User = userCredential.user;
    //     console.log(User);

    //   }
    // );
  };
  return (
    <section className="">
      <h1 className="text-3xl mt-6 text-center font-bold">Sign Up</h1>
      <div className="lg:flex px-6 my-12 justify-center items-center lg:gap-14 xl:gap-20 max-w-6xl mx-auto">
        <div className="w-full mb-12 ">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
            className="w-full rounded-2xl lg:h-[60vh] "
          />
        </div>
        <div className="w-full ">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="">
              <input
                // ref={inputRef}
                autoComplete="off"
                className="py-4 px-5 text-xl rounded  transition ease-in-out outline-blue-400 ring-slate-300 shadow-md w-full"
                type="text"
                placeholder="Full Name"
                {...register("fullName")}
                ref={inputRef}
              />
              {/* <p className="text-red-500"> {errors.fullName?.message} </p> */}
            </div>
            <div className="">
              <input
                autoComplete="off"
                className="py-4 px-5 text-xl rounded  transition ease-in-out outline-blue-400 ring-slate-300 shadow-md w-full"
                type="text"
                placeholder="Email address"
                {...register("email")}
              />
              <p className="text-red-500"> {errors.email?.message} </p>
            </div>
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
              <p className="text-red-500"> {errors.password?.message} </p>
            </div>
            <div className="font-semibold flex justify-between whitespace-nowrap text-sm lg:text-lg">
              <p className="">
                Have have a account?
                <Link
                  href="/SignIn"
                  className="text-red-600 transition duration-200 ease-in-out hover:text-red-700 ml-1"
                >
                  Sign in
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
              sign up
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

export default SignUp;
