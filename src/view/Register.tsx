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
  // const [formData, setFormData] = useState({});
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-10 pt-20">
      <div className="flex justify-center items-center w-full max-w-7xl mx-auto">
        <div className="w-3/5 p-8 bg-white shadow-xl rounded-lg">
          <img onClick={handleClick} src={Arrow} className="cursor-pointer w-8 h-8 mb-4 rounded-full p-1 transition duration-300 ease-in-out hover:bg-gray-200" alt="back button" />
          <h2 className="text-2xl font-bold text-center mb-6">Registration</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Full Name</label>
              <input className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" {...register('fullname')} />
              {errors.fullname && (
                  <p> 
                      {typeof errors.fullname.message === 'string' ? errors.fullname.message : ''}
                  </p>
                )}
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Username</label>
              <input className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" {...register('username')} />
              {errors.username && (
                  <p>
                    {typeof errors.username.message === 'string' ? errors.username.message : ''}
                  </p>
                )}
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Email</label>
              <input className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="email" {...register('email')} />
              {errors.email && (
                  <p>
                    {typeof errors.email.message === 'string' ? errors.email.message : ''}
                  </p>
                )}
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Password</label>
              <input className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="password" {...register('password')} />
              {errors.password && (
                  <p>
                    {typeof errors.password.message === 'string' ? errors.password.message : ''}
                  </p>
                )}
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Gender</label>
              <select className="form-select" {...register('gender')}>
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
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Birth Date</label>
              <input className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="date" {...register('birthdate')} />
              {errors.birthdate && (
                  <p>
                    {typeof errors.birthdate.message === 'string' ? errors.birthdate.message : ''}
                  </p>
                )}
            </div>
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300" type="submit" disabled={isSubmitting}>Register</button>
          </form>
          <div className="text-center mt-4">
            <span>Already have an account?</span>
            <Link to="/login" className="text-blue-500 hover:underline">Sign in!</Link>
          </div>
        </div>
        <div className="w-2/5">
          <img src={banner} className="rounded-lg shadow-xl max-w-full h-auto" alt="registration banner" />
        </div>
      </div>
    </div>
  );
};

export default Register;