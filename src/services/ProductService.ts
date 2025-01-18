import axiosInstance from "../configs/axios";
import { handleAxiosError } from "@/helpers/axiosHelper";
import type { Product, ProductResponse } from "@/types/Product";
import { showToast } from "@/helpers/toastHelper";
import type { Response } from "@/types/Default";

const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await axiosInstance.get("/product");
    return response.data.data;
  } catch (error) {
    throw handleAxiosError(error, showToast);
  }
}

const getProductById = async (_id: string): Promise<ProductResponse | null> => {
  try {
    const response = await axiosInstance.get(`/product/${_id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, showToast);
    return null;
  }
}

const createProduct = async (data: Product): Promise<Response | null> => {
  try {
    const response = await axiosInstance.post("/product", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error, showToast);
    return null;
  }
}

const updateProduct = async (
  _id: string,
  data: Product
): Promise<Response | null> => {
  try {
    const response = await axiosInstance.put(`/product/${_id}`, data);
    return response.data;
  } catch (error) {
    handleAxiosError(error, showToast);
    return null;
  }
}

const updateStatusProduct= async (
  _id: string,
  status: string
): Promise<Response | null> => {
  try {
    console.log(_id, status);
    const response = await axiosInstance.patch(`/product/${_id}/status`, {
      status,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error,showToast);
    return null;
  }
};

const deleteProduct= async (_id: string): Promise<Response | null> => {
  try {
    const response = await axiosInstance.delete(`/product/${_id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, showToast);
    return null;
  }
}

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  updateStatusProduct,
  deleteProduct
}