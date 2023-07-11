import React from 'react'
import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { LoginUser } from '../../apicalls/users';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../redux/slices/loaderSlice';



function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    try {

      dispatch(setLoader(true));
      const response = await LoginUser({
        email: formData.email,
        password: formData.password
      });
      dispatch(setLoader(false));
      console.log("Response in Login.jsx:", response);

      if (response.status) {
        console.log(response);
        toast.success("Meow",response.message);
        localStorage.setItem('token', response.token);
        window.location.href = "/";

      }
      else {
        dispatch(setLoader(false));
        toast.error(response.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }


  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/');
    }
  },[]);
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>


            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{' '}

                <Link to='/register'>Sign up</Link>

              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />

    </section>
  )
}

export default Login

