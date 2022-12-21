import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../context/UserContext";

const Login = () => {
  const { login, userInfo, signup, currUser, checkIfdup } = useUser();
  const [error, setError] = useState(null);
  const [logging, setLoggingIn] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const { email, password } = data;
    if (logging === true) {
      try {
        await login(email, password);
      } catch (err) {
        setError("Incorrect Email or Password");
      }
      reset();
    } else {
      try {
        const check = await checkIfdup(email);
        console.log(check);
        if (check === false) {
          await signup(email, password);
        } else {
          setError("Account exisit. Please login.");
          reset();
          setLoggingIn(true);
        }
      } catch (err) {
        setError("Unable to signup");
      }
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 5000);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <h1 className="font-extrabold text-2xl sm:text-4xl mb-4">
        {logging && "LOGIN"}
        {!logging && "SIGNUP"}
      </h1>
      {error !== null && <div>{error}</div>}
      <form
        className="rounded flex flex-col items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <input
            type="text"
            placeholder="Email Adress"
            className="outline-none h-10 rounded-lg p-2 text-slate-900 shadow border-b-2 border-solid border-white duration-200 focus:border-cyan-300"
            {...register("email", { required: true })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500" role="alert">
              Email is required!
            </p>
          )}
        </div>

        <div className="mb-1">
          <input
            type="password"
            placeholder="**************"
            className="outline-none h-10 rounded-lg p-2 text-slate-900 border-b-2 border-solid border-white duration-200 focus:border-cyan-300"
            {...register("password", { required: true, minLength: 6 })}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500" role="alert">
              Password missing/ Invalid
            </p>
          )}
        </div>
        <div className="outline-none border-none">
          <button
            className="bg-white rounded-lg text-slate-800 h-10 w-20 m-2 py-1 font-bold hover:bg-slate-300 "
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="w-40	mt-6 relative border-0 hover:border-2  hover:mt-5  bg-slate-800 rounded-lg w-25 flex flex-col items-center justify-canter">
        <button
          onClick={() => {
            logging ? setLoggingIn(false) : setLoggingIn(true);
          }}
          className=" rounded-lg text-white h-10 m-2 py-1 font-bold items-center justify-center"
        >
          {logging && "SIGN UP TODAY"}
          {!logging && "ALREADY HAVE AN ACCOUNT"}
        </button>
      </div>
    </div>
  );
};

export default Login;
