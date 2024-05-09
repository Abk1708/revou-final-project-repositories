import { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import banner from '../assets/paolo-nicolello---0RlqBni6g-unsplash.jpg';
import Arrow from '../assets/previous.png';
import { useForm } from 'react-hook-form';
import axios from 'axios';
 // Import bcrypt library

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const userData = { ...data};
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', userData);
      console.log(response.data);
      navigate('/Dashboard')
    } catch (error) {
      console.error(error);
      alert('Error registering user');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div>
      <div className="flex flex-wrap items-center">
        <img onClick={handleClick} src={Arrow} className="my-4 mx-4 w-[40px] h-[40px] hover:rounded-full hover:bg-black hover:text-white" alt="back button" />
        <span>Back</span>
      </div>
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-row justify-center items-center h-full mt-10 border-4 rounded-xl object-contain bg-white">
          <div className="flex flex-col text-center justify-center items-center rounded-lg bg-white">
            <h2>Registration</h2>
            <form className='py-5 px-5' onSubmit={handleSubmit(onSubmit)}>
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
              <div className="flex flex-row px-4 py-4 justify-left">
                <label className="px-4">Gender</label>
                <select className="px-4 py-1 rounded-lg bg-slate-300" {...register('gender')}>
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && (
                  <p>
                    {typeof errors.gender.message === 'string' ? errors.gender.message : ''}
                  </p>
                )}
              </div>
              <div className="flex flex-row px-4 py-4 justify-left">
                <label className="px-4">Birth Date</label>
                <input
                  className="px-4 py-1 rounded-lg bg-slate-300"
                  type="date"
                  {...register('birthdate')}
                />
                {errors.birthdate && (
                  <p>
                    {typeof errors.birthdate.message === 'string' ? errors.birthdate.message : ''}
                  </p>
                )}
              </div>
              <button className="bg-slate-800 text-white py-1 px-4 rounded-xl hover:bg-blue-500" type="submit" disabled={isSubmitting}>Register</button>
            </form>
          </div>
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
