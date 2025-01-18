export interface User{
  _id: string;
  name: string;
  email: string;
  phone: string;
  province_id: string;
  district_id: string;
  ward_id: string;
  address: string;
  avatar: string | null;
  reward_point: number;
  role: string;
  status: string;
  birthday: Date;
  password: string | null;
}


export interface UserResponse {
  data: User;
  status: number;
  message: string;
}