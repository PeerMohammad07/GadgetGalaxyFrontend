import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getAllCategorys } from '../Api/adminApi';

const productSchema = z.object({
  name: z.string()
    .min(3, "Product name must be at least 3 characters")
    .max(50, "Product name must be less than 50 characters"),
  price: z.string()
    .transform((val) => Number(val))
    .pipe(
      z.number()
        .min(0, "Price cannot be negative")
        .max(1000000, "Price is too high")
    ),
  quantity: z.string()
    .transform((val) => Number(val))
    .pipe(
      z.number()
        .int("Quantity must be a whole number")
        .min(0, "Quantity cannot be negative")
        .max(10000, "Quantity is too high")
    ),
  description: z.string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  category: z.string().nonempty("Please select a category")  
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData, imageFile?: any) => void;
  initialData?: any;
  mode: 'add' | 'edit';
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<ProductFormData>({
    defaultValues: {
      name: initialData?.name || '',
      price: initialData?.price?.toString() || '0',
      quantity: initialData?.quantity?.toString() || '0',
      description: initialData?.description || '',
      category: initialData?.category || ''
    }
  });

  const { register, handleSubmit, formState: { errors }, reset } = form;

  useEffect(() => {
    if (initialData && mode === 'edit') {
      reset({
        name: initialData.name || '',
        price: initialData.price?.toString() || '0',
        quantity: initialData.quantity?.toString() || '0',
        description: initialData.description || '',
        category: initialData.category || '',
      });
      setImagePreview(initialData.imageUrl); 
    }
  }, [initialData, mode, reset]);

  useEffect(() => {
    const fetch = async () => {
      const response = await getAllCategorys();
      setCategories(response.data);
    };
    fetch();
  }, []);

  const onSubmitHandler = (data: ProductFormData) => {
    setImageError(null);

    if (!imageFile && mode === 'add') {
      setImageError("Please upload an image file");
      return;
    }

    if (imageFile) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validImageTypes.includes(imageFile.type)) {
        setImageError("Please upload a valid image (JPEG, PNG, or GIF)");
        return;
      }
    }

    const transformedData = {
      ...data,
      price: Number(data.price),
      quantity: Number(data.quantity)
    };

    onSubmit(transformedData, imageFile);
    reset();
    setImageFile(null);
    setImageError(null);
    setImagePreview(null);
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageError(null);
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            {mode === 'add' ? 'Add New Product' : 'Edit Product'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmitHandler)} className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input type="text" {...register('name')} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select {...register('category')} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option value="">Select a category</option>
              {categories.map((category: any) => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input type="number" {...register('price')} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input type="number" {...register('quantity')} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea {...register('description')} className="mt-1 block w-full border border-gray-300 rounded-md p-2" rows={3}></textarea>
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
            {imagePreview && <img src={imagePreview} alt="Image Preview" className="mb-2 w-full h-auto rounded-md" />}
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100" />
            {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-end gap-2 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {mode === 'add' ? 'Add Product' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
