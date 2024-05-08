import { Link, useNavigate } from "react-router-dom"
import banner from '../assets/paolo-nicolello---0RlqBni6g-unsplash.jpg'
import Arrow from '../assets/previous.png'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from "axios";
import { useState } from "react";

const schema = z.object({
  Username:z.string().min(5,'too short'),
  email: z.string().email('invalid email').min(3,'too short'),
  password:z.string().min(6, 'too short'),
});

const Login = () => {
  const [error, setError] = useState<null |string>(null);
  const {register, handleSubmit, formState:{ errors }}=useForm({
    resolver:zodResolver(schema),
  })

  const navigate = useNavigate()
  const handleClickBack = () => {
    navigate('/')
  }

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("api-url", data);
      const { token, expiresIn } = response.data; // Assuming the token and expiresIn are returned from the API
      const expiryTime = Date.now() + expiresIn * 1000; // Convert expiresIn to milliseconds and add to current time
      localStorage.setItem('token', token);
      localStorage.setItem('tokenExpiry', expiryTime.toString());
      // Redirect the user or perform other actions based on successful login
    } catch (error) {
      setError("Invalid email or password");
      console.error(error);
    }
  };

  return (

    <div>
      <div className="flex flex-wrap items-center ">
        <img src={Arrow} onClick={handleClickBack} className="my-4 mx-4 w-[40px] h-[40px] hover:rounded-full hover:bg-black hover:text-white"/>
        <span>back</span>
      </div>
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-row justify-center items-center h-full mt-10 border-4 rounded-xl object-contain bg-white">
          <div className="flex flex-col text-center justify-center items-center rounded-lg bg-white">
            <h2>Login to your account</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row px-4 py-4 justify-left">
                <label className="px-4">Username</label>
                <input className="px-4 py-1 rounded-lg bg-slate-300" type="text" {...register('Username')}/>
                {errors.Username && (
                  <p>
                    {typeof errors.Username.message === 'string' ? errors.Username.message : ''}
                  </p>
                )}
              </div>
              <div className="flex flex-row px-4 py-4 justify-left">
                <label className="px-4">Email</label>
                <input className="px-4 py-1 rounded-lg bg-slate-300 border-red-600" type="text" {...register('email')}/>
                {errors.email && (
                  <p>
                    {typeof errors.email.message === 'string' ? errors.email.message : ''}
                  </p>
                )}
              </div>
              <div className="flex px-4 py-4 justify-left">
                <label className="px-4">Password</label>
                <input className="px-4 py-1 rounded-lg bg-slate-300" type="password" {...register('password')} />
                {errors.password && (
                  <p>
                    {typeof errors.password.message === 'string' ? errors.password.message : ''}
                  </p>
                )}
              </div>
              <button className="bg-slate-800 text-white py-1 px-4 rounded-xl hover:bg-blue-500 text-white" type="submit">Login</button>
              <div className="flex flex-row py-4 px-4">
                <span>doesnt have account yet ?</span>
                <Link className="hover:bg-slate-800 hover:text-white hover:rounded-lg hover:px-2" to="/register">Sign up!</Link>
              </div>
            </form>
          </div>
          <div className=" flex h-full rounded-xl">
            <img className="flex w-[220px] h-full rounded-lg" src={banner} alt="login banner" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login