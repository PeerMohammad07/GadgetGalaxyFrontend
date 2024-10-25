export interface IAdmin {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface AdminState {
  adminData: IAdmin | null;
}
