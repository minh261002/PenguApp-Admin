import axiosInstance from "../configs/axios";
import { handleAxiosError } from "@/helpers/axiosHelper";
import type { User } from "@/types/User";
import { showToast } from "@/helpers/toastHelper";
import type { Response } from "@/types/Default";

const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axiosInstance.get("/user");
    return response.data.data;
  } catch (error) {
    throw handleAxiosError(error, showToast);
  }
}

const getUserById = async (id: number): Promise<User | null> => {
  try {
    const response = await axiosInstance.get(`/user/${id}`);
    return response.data.data;
  } catch (error) {
    handleAxiosError(error, showToast);
    return null;
  }
}

const createUser = async (data: User): Promise<Response | null> => {
  try {
    const response = await axiosInstance.post("/user", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error, showToast);
    return null;
  }
}

const updateStatusUser= async (
  _id: string,
  status: string
): Promise<Response | null> => {
  try {
    console.log(_id, status);
    const response = await axiosInstance.patch(`/user/${_id}/status`, {
      status,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error,showToast);
    return null;
  }
};

const deleteUser = async (id: number): Promise<Response | null> => {
  try {
    const response = await axiosInstance.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, showToast);
    return null;
  }
}

export {
  getAllUsers,
  updateStatusUser,
  deleteUser,
  getUserById,
  createUser,
}