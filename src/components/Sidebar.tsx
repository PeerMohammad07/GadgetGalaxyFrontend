import { Users, Package, FolderOpen } from 'lucide-react';

const Sidebar:React.FC<any> = ({page,changePage}) => {
  const menuItems = [
    {name : "user" , icon: <Users size={20} />, label: 'User Management', isActive: page=="user" },
    {name : "product", icon: <Package size={20} />, label: 'Products',isActive: page=="product" },
    {name : "category", icon: <FolderOpen size={20} />, label: 'Categories',isActive: page=="category" }
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200">
      <nav className="">
        {menuItems.map((item, index) => (
          <div
          onClick={()=>{
            changePage(item.name)
          }}
            key={index}
            className={`flex items-center px-4 py-3 cursor-pointer hover:bg-orange-50 
              ${item.isActive ? 'bg-orange-50' : ''}
              ${item.isActive ? 'text-[#F6734B]' : 'text-gray-700'}`}
          >
            <span className={`mr-3 ${item.isActive ? 'text-[#F6734B]' : 'text-gray-500'}`}>
              {item.icon}
            </span>
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;