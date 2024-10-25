import React, { useState } from "react";
import { Product } from "../Interfaces/IUserData";
import ProductModal from "./AddEditProductModal";
import { addCategory, addProduct } from "../Api/adminApi";
import CategoryModal from "./AddEdtiCategoryModal";

const DataTable: React.FC<any> = ({ type, data, addValueFromChild }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<{ name: string; description: string } | null>(null);

  const columnConfigs:any = {
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
    ],
    category: [
      { key: 'slNo', label: 'Sl No' },
      { key: 'name', label: 'Name' },
      { key: 'description', label: 'Description' },
    ],
  };

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
      case 'action':
        return (
          <button className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 text-sm">Block</button>
        );
      default:
        return item[column.key];
    }
  };

  const columns = columnConfigs[type] || [];

  const handleSubmit = async (data: any, image?: any) => {
    try {
      if (type === 'product' && editingProduct) {
        // Handle product edit
      } else if (type === 'category' && editingCategory) {
        // Handle category edit
      } else if (type === 'product') {
        const response = await addProduct(data, image);
        addValueFromChild(response.data, "product")
      } else if (type == "category") {
        const response = await addCategory(data)
        addValueFromChild(response.data, "category")
      }
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
