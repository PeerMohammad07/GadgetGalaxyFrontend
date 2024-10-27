import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { addAddress } from '../Api/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import toast from 'react-hot-toast';
import { userLogin } from '../Redux/Slices/userSlice';

const addressSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  state: z.string().min(2, { message: "State must be at least 2 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  pinNo: z
    .string()
    .length(6, { message: "PIN must be exactly 6 digits" }),
  phNo: z
    .string()
    .length(10, { message: "Phone number must be exactly 10 digits" }),
});

type AddressFormData = z.infer<typeof addressSchema>;

interface AddAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddAddressModal: React.FC<AddAddressModalProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  const dispatch = useDispatch()
  const userData = useSelector((state:RootState)=> state.user.userData)

  const onSubmit: SubmitHandler<AddressFormData> = async (data) => {
    try {
      const response:any = await addAddress(userData?._id, data);
      if (response.status === 201) {
        dispatch(userLogin(response.data))
        toast.success("Address added successfully!");
        reset()
        onClose(); 
      } else {
        toast.error(response.message || "Failed to add address.");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred while adding the address.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Address</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              {...register("state")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              {...register("city")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">PIN</label>
            <input
              type="text"
              {...register("pinNo")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
            />
            {errors.pinNo && (
              <p className="text-red-500 text-sm mt-1">{errors.pinNo.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              {...register("phNo")}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
            />
            {errors.phNo && (
              <p className="text-red-500 text-sm mt-1">{errors.phNo.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddressModal;
