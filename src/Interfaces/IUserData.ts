export default interface IUser{
  _id:string
  name: string;
  email: string;
  addresses : any[]
}


export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  status: 'verified' | 'unverified';
}

export interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface SidebarProps {
  page: 'user' | 'product' | 'category';
  changePage: (page: 'user' | 'product' | 'category') => void;
}

export interface DataTableProps {
  type: 'user' | 'product' | 'category';
  data: User[] | Product[] | Category[];
}

export interface MenuItem {
  name: 'user' | 'product' | 'category';
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

export interface Column {
  key: string;
  label: string;
}
export interface UserState {
  userData: IUser | null;
}