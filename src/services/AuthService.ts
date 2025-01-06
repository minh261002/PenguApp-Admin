import axiosConfig from '@/configs/axios';
import { handleAxiosError } from '@/helpers/axiosHelper';
import { showToast } from '@/helpers/toastHelper';
import type { Login as LoginType, LoginResponse,UserData } from '@/types/Auth';

const loginHandle = async (data: LoginType): Promise<LoginResponse> => {
  try {
    const response = await axiosConfig.post('/auth/login', data);
    return response.data;
  } catch (error) {
    handleAxiosError(error, showToast);
    throw error;
  }
}

const fetchData = async (): Promise<UserData> => {
  try {
    const response = await axiosConfig.get('/auth/me');
    return response.data.userResponse;
  } catch (error) {
    handleAxiosError(error, showToast);
    throw error;
  }
}

export  {
  loginHandle,
  fetchData
};