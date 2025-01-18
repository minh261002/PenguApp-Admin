import axiosInstance from "../configs/axios";
import { handleAxiosError } from "@/helpers/axiosHelper";
import type { Category, CategoryResponse } from "@/types/Category";
import { showToast } from "@/helpers/toastHelper";
import type { Response } from "@/types/Default";

const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await axiosInstance.get("/category");
    return response.data.data;
  } catch (error) {
    throw handleAxiosError(error, showToast);
  }
}

const getCategoryById = async (_id: string): Promise<CategoryResponse | null> => {
  try {
    const response = await axiosInstance.get(`/category/${_id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, showToast);
    return null;
  }
}

const createCategory = async (data: Category): Promise<Response | null> => {
  try {
    const response = await axiosInstance.post("/category", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error, showToast);
    return null;
  }
}

const updateCategory = async (
  _id: string,
  data: Category
): Promise<Response | null> => {
  try {
    const response = await axiosInstance.put(`/category/${_id}`, data);
    return response.data;
  } catch (error) {
    handleAxiosError(error, showToast);
    return null;
  }
}

const updateStatusCategory= async (
  _id: string,
  status: string
): Promise<Response | null> => {
  try {
    console.log(_id, status);
    const response = await axiosInstance.patch(`/category/${_id}/status`, {
      status,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error,showToast);
    return null;
  }
};

const deleteCategory = async (_id: string): Promise<Response | null> => {
  try {
    const response = await axiosInstance.delete(`/category/${_id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, showToast);
    return null;
  }
}

export {
  getAllCategories,
  updateStatusCategory,
  deleteCategory,
  getCategoryById,
  createCategory,
  updateCategory,
}