import { useState } from 'react';
import { Link } from 'react-router-dom';
import banner from '../assets/paolo-nicolello---0RlqBni6g-unsplash.jpg';
import Arrow from '../assets/previous.png';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';

const schema = z.object({
  fullname: z.string().min(3, 'too short'),
  username: z.string().min(5, 'too short'),
  email: z.string().email('invalid email').min(3, 'too short'),
  password: z.string().min(6, 'too short'),
  village: z.string().min(3, 'too short'),
  phone: z.string().min(10, 'too short'),
});

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const [step, setStep] = useState(1);

  const handleClickBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('api-url', data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col text-center justify-center items-center rounded-lg bg-white">
            <h2>Step 1: Personal Information</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-row px-4 py-4 justify-left">
                <label className="px-4">Full Name</label>
                <input className="px-4 py-1 rounded-lg bg-slate-300" type="text" {...register('fullname')} />
                {errors.fullname && (
                  <p>
                    {typeof errors.fullname.message === 'string' ? errors.fullname.message : ''}
                  </p>
                )}
              </div>
              <div className="flex flex-row px-4 py-4 justify-left">
                <label className="px-4">Username</label>
                <input className="px-4 py-1 rounded-lg bg-slate-300" type="text" {...register('username')} />
                {errors.username && (
                  <p>
                    {typeof errors.username.message === 'string' ? errors.username.message : ''}
                  </p>
                )}
              </div>
              <div className="flex flex-row px-4 py-4 justify-left">
                <label className="px-4">Email</label>
                <input className="px-4 py-1 rounded-lg bg-slate-300" type="text" {...register('email')} />
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
              <button className="bg-slate-800 text-white py-1 px-4 rounded-xl hover:bg-blue-500" type="submit">Next</button>
            </form>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col text-center justify-center items-center rounded-lg bg-white">
            <h2>Step 2: Address and Contact Information</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-row px-4 py-4 justify-left">
                <label className="px-4">Village / Address</label>
                <input className="px-4 py-1 rounded-lg bg-slate-300" type="text" {...register('village')} />
                {errors.village && (
                  <p>
                    {typeof errors.village.message === 'string' ? errors.village.message : ''}
                  </p>
                )}
              </div>
              <div className="flex flex-row px-4 py-4 justify-left">
                <label className="px-4">Phone</label>
                <input className="px-4 py-1 rounded-lg bg-slate-300" type="text" {...register('phone')} />
                {errors.phone && (
                  <p>
                    {typeof errors.phone.message === 'string' ? errors.phone.message : ''}
                  </p>
                )}
              </div>
              <button className="bg-slate-800 text-white py-1 px-4 rounded-xl hover:bg-blue-500" type="submit">Submit</button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center">
        <img src={Arrow} onClick={handleClickBack} className="my-4 mx-4 w-[40px] h-[40px] hover:rounded-full hover:bg-black hover:text-white" alt="back button" />
        <span>Back</span>
      </div>
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-row justify-center items-center h-full mt-10 border-4 rounded-xl object-contain bg-white">
          {renderStep()}
          <div className="flex h-full rounded-xl">
            <img className="flex w-[220px] h-full rounded-lg" src={banner} alt="registration banner" />
          </div>
        </div>
      </div>
      <div className="flex flex-row py-4 px-4">
        <span>Already have an account?</span>
        <Link to="/login" className="hover:bg-slate-800 hover:text-white hover:rounded-lg hover:px-2">Sign in!</Link>
      </div>
    </div>
  );
};

export default Register;
