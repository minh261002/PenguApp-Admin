export interface User{
  _id: number;
  name: string;
  email: string;
  phone: string;
  province_id: string;
  district_id: string;
  ward_id: string;
  address: string;
  avatar: string;
  reward_point: number;
  role: string;
  status: string;
  birthday: Date;
  password: string | null;
}

