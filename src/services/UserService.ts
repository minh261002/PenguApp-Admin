import axiosInstance from "../configs/axios";
import { handleAxiosError } from "@/helpers/axiosHelper";
import type { User, UserResponse } from "@/types/User";
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

const getUserById = async (_id: string): Promise<UserResponse | null> => {
  try {
    const response = await axiosInstance.get(`/user/${_id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, showToast);
    return null;
  }
}

const createUser = async (data: User): Promise<Response | null> => {
  try {
    const response = await axiosInstance.post("/user", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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

const deleteUser = async (_id: string): Promise<Response | null> => {
  try {
    const response = await axiosInstance.delete(`/user/${_id}`);
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