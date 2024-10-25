import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import DataTable from "../../components/Table";
import { getAllCategorys, getAllProducts, getAllUsers } from "../../Api/adminApi";
import AdminNavbar from "../../components/AdminNavbar";
import { Category, Product, User } from "../../Interfaces/IUserData";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [page, setPage] = useState<'user' | 'product' | 'category'>('user');
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const adminData = useSelector((state:RootState)=> state.admin.adminData)
  const navigate = useNavigate()

  useEffect(()=>{
    if(!adminData){
      navigate("/admin/login")
    }
  },[adminData])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userResponse, categoryResponse, productResponse] = await Promise.all([
          getAllUsers(),
          getAllCategorys(),
          getAllProducts(),
        ]);
        setUsers(userResponse.data);
        setCategories(categoryResponse.data);
        setProducts(productResponse.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const changePage = (newPage: 'user' | 'product' | 'category') => {
    setPage(newPage);
  };

  const addValueFromChild = (value:any,type:string)=>{
    if(type=="product"){
      setProducts((prevValue)=> [...prevValue,value])
    }else if(type=="category"){
      setCategories((prevValue)=> [...prevValue,value])
    }
  }

  const returnData = (currentPage: 'user' | 'product' | 'category') => {
    switch (currentPage) {
      case 'user':
        return users;
      case 'product':
        return products;
      case 'category':
        return categories;
      default:
        return [];
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="flex">
        <Sidebar page={page} changePage={changePage} />
        <div className="flex-1 p-6">
          <DataTable addValueFromChild={addValueFromChild} type={page} data={returnData(page)} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;