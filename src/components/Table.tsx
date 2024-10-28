import React, { useState } from "react";
import ProductModal from "./AddEditProductModal";
import { addCategory, addProduct, deleteProduct, deleteCategory, editProduct, editCategory } from "../Api/adminApi";
import CategoryModal from "./AddEdtiCategoryModal";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const DataTable: React.FC<any> = ({ type, data, addValueFromChild, removeValueFromChild,updateValueFromChild }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [editingCategory, setEditingCategory] = useState<{_id?:string, name: string; description: string } | null>(null);

  const columnConfigs: any = {
    user: [
      { key: 'slNo', label: 'Sl No' },
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
    ],
    product: [
      { key: 'slNo', label: 'Sl No' },
      { key: 'image', label: 'Image' },
      { key: 'name', label: 'Name' },
      { key: 'category', label: 'Category' },
      { key: 'quantity', label: 'Stock' },
      { key: 'actions', label: 'Actions' },
    ],
    category: [
      { key: 'slNo', label: 'Sl No' },
      { key: 'name', label: 'Name' },
      { key: 'description', label: 'Description' },
      { key: 'actions', label: 'Actions' },
    ],
  };

  const handleDelete = async (id: string) => {
    try {
      if (type === 'product') {
        await deleteProduct(id);
        removeValueFromChild(id, type)
      } else if (type === 'category') {
        await deleteCategory(id);
        removeValueFromChild(id, type)
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // const handleEdit = (item: any) => {
  //   if (type === 'product') {
  //     setEditingProduct(item);
  //   } else if (type === 'category') {
  //     setEditingCategory(item);
  //   }
  //   setIsModalOpen(true);
  // };

  const renderCell = (item: any, column: any, index: number) => {
    switch (column.key) {
      case 'slNo':
        return index + 1;
      case 'image':
        return <img src={item.image || "/api/placeholder/40/40"} alt={item.name} className="w-10 h-10 rounded object-cover" />;
      case 'status':
        return (
          <span className={`px-3 py-1 rounded-full text-sm ${item.status === 'verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {item.status}
          </span>
        );
      case 'actions':
        return (
          <div className="flex gap-2">
            {/* <button
              onClick={() => handleEdit(item)}
              className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 text-sm transition"
            >
              Edit
            </button> */}
            <button
              onClick={() => {
                Swal.fire({
                  title: 'Are you sure?',
                  text: 'You won\'t be able to revert this!',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleDelete(item._id);
                    Swal.fire(
                      'Deleted!',
                      'Your item has been deleted.',
                      'success'
                    );
                  }
                });
              }}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm transition"
            >
              Delete
            </button>
          </div>
        );
      default:
        return item[column.key];
    }
  };

  const columns = columnConfigs[type] || [];

  const handleSubmit = async (formData: any, image?: any) => {
    try {
      if (type === 'product' && editingProduct) {
        const response = await editProduct(formData, editingProduct._id);
        if(response.data){
          updateValueFromChild(response.data, "product");
          toast.success("Product updated successfully")
        }
      } else if (type === 'category' && editingCategory) {
        const response = await editCategory(formData, editingCategory._id);
        if(response.data){
          updateValueFromChild(response.data, "category");
          toast.success("Category updated successfully")
        }
      } else if (type === 'product') {
        const response = await addProduct(formData, image);
        addValueFromChild(response.data, "product")
      } else if (type === "category") {
        const response = await addCategory(formData)
        addValueFromChild(response.data, "category")
      }
      setIsModalOpen(false);
      setEditingProduct(null);
      setEditingCategory(null);
    } catch (error) {
      console.error('Error submitting:', error);
    }
  };

  const handleAddItem = () => {
    if (type === 'product') {
      setEditingProduct(null);
    } else if (type === 'category') {
      setEditingCategory(null);
    }
    setIsModalOpen(true);
  };

  return (
    <>
      {type === 'product' ? (
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          initialData={editingProduct}
          mode={editingProduct ? 'edit' : 'add'}
        />
      ) : type === 'category' ? (
        <CategoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          initialData={editingCategory}
          mode={editingCategory ? 'edit' : 'add'}
        />
      ) : null}

      {type !== 'user' && (
        <div className="mb-4">
          <button
            onClick={handleAddItem}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add {type === 'product' ? 'Product' : 'Category'}
          </button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column: any) => (
                  <th key={column.key} className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((item: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50">
                  {columns.map((column: any) => (
                    <td key={column.key} className="px-6 py-4 text-sm text-gray-700">
                      {renderCell(item, column, index)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DataTable;