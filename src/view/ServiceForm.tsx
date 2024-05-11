import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import background from '../assets/Service Form Background.png';
import axios from 'axios';
import { useState } from 'react';



interface FormData {
  fullname: string;
  village: string;
  address: string;
  service: string;
  description: string;
}

const schema = z.object({
  fullname: z.string({ message: 'Full name is required' }),
  village: z.string({ message: 'Full name is required' }),
  address: z.string({ message: 'Full name is required' }),
  service: z.string({ message: 'Full name is required' }),
  description: z.string({ message: 'Description is required' }),
});

const ServiceForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });



  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      // Make POST request to API endpoint
      const response = await axios.post('your_api_endpoint', data);
      console.log(response.data); // Handle successful response
    } catch (error) {
      console.error(error); // Handle error
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${background})` }}>
      <div className=" flex flex-col bg-white mt-[50px] bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Service Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {submitting ? 'Submitting...' : 'Submit'}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Full Name</label>
            <input className="form-input" type="text" {...register('fullname')} />
            {errors.fullname && <p className="text-red-500">{errors.fullname.message}</p>}
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Village Name</label>
            <input className="form-input" type="text" {...register('village')} />
            {errors.village && <p className="text-red-500">{errors.village.message}</p>}
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Address</label>
            <input className="form-input" type="text" {...register('address')} />
            {errors.address && <p className="text-red-500">{errors.address.message}</p>}
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Service</label>
            <select className="form-select" {...register('service')}>
              <option value="">Select service</option>
              <option value="tractors">E-tractors</option>
              <option value="irrigation">irrigation</option>
              <option value="solarpanel">Solar panel</option>
              <option value="greenhouse">GreenHouse</option>
            </select>
            {errors.service && <p className="text-red-500">{errors.service.message}</p>}
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Description</label>
            <textarea className="form-textarea" {...register('description')} />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ServiceForm;
