
import { Link, useNavigate } from 'react-router-dom';
import banner from '../assets/paolo-nicolello---0RlqBni6g-unsplash.jpg';
import Arrow from '../assets/previous.png';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';

const schema = z.object({
  Username: z.string().min(5, 'Username too short'),
  email: z.string().email('Invalid email').min(3, 'Email too short'),
  password: z.string().min(6, 'Password too short'),
});

type FormData = {
  Username: string;
  email: string;
  password: string;
};


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate('/');
  };

  const onSubmit = async (data: { Username: string; email: string; password: string }) => {
    try {
      const response = await axios.post('api-url', data);
      const { token, expiresIn } = response.data;
      const expiryTime = Date.now() + expiresIn * 1000;
      localStorage.setItem('token', token);
      localStorage.setItem('tokenExpiry', expiryTime.toString());
      // Redirect the user or perform other actions based on successful login
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg relative hover:shadow-2xl transition duration-500 w-full max-w-lg">
            <div className="mb-4">
              <img onClick={handleClickBack} src={Arrow} className="cursor-pointer w-8 h-8 mb-4 rounded-full p-1 transition duration-300 ease-in-out hover:bg-gray-200" alt="back button" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-6">Login to your account</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-1">
                <label className="block text-gray-700">Username</label>
                <input className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" {...register('Username')} />
                {errors.Username && (
                  <p>
                    {typeof errors.Username.message === 'string' ? errors.Username.message : ''}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <label className="block text-gray-700">Email</label>
                <input className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="email" {...register('email')} />
                {errors.email && (
                  <p>
                    {typeof errors.email.message === 'string' ? errors.email.message : ''}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <label className="block text-gray-700">Password</label>
                <input className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="password" {...register('password')} />
                {errors.password && (
                  <p>
                    {typeof errors.password.message === 'string' ? errors.password.message : ''}
                  </p>
                )}
              </div>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300" type="submit">Login</button>
              <div className="mt-6 text-center">
                <span className="text-gray-600">Don't have an account yet?</span>
                <Link to="/register" className="text-blue-500 hover:underline">Sign up!</Link>
              </div>
            </form>
          </div>
          <div className="w-2/6">
            <img src={banner} className="rounded-lg shadow-xl max-w-full h-auto" alt="login banner" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
