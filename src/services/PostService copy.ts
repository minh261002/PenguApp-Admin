import axiosInstance from "../configs/axios";
import { handleAxiosError } from "@/helpers/axiosHelper";
import type { PostCatalogue, PostCatalogueResponse } from "@/types/PostCatalogue";
import { showToast } from "@/helpers/toastHelper";
import type { Response } from "@/types/Default";

const getAllPostCatalogues = async (): Promise<PostCatalogue[]> => {
  try {
    const response = await axiosInstance.get("/post-catalogue");
    return response.data.data;
  } catch (error) {
    throw handleAxiosError(error, showToast);
  }
}

const getPostCatalogueById = async (_id: string): Promise<PostCatalogueResponse | null> => {
  try {
    const response = await axiosInstance.get(`/post-catalogue/${_id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, showToast);
    return null;
  }
}

const createPostCatalogue = async (data: PostCatalogue): Promise<Response | null> => {
  try {
    const response = await axiosInstance.post("/post-catalogue", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error, showToast);
    return null;
  }
}

const updatePostCatalogue = async (
  _id: string,
  data: PostCatalogue
): Promise<Response | null> => {
  try {
    const response = await axiosInstance.put(`/post-catalogue/${_id}`, data);
    return response.data;
  } catch (error) {
    handleAxiosError(error, showToast);
    return null;
  }
}

const updateStatusPostCatalogue= async (
  _id: string,
  status: string
): Promise<Response | null> => {
  try {
    console.log(_id, status);
    const response = await axiosInstance.patch(`/post-catalogue/${_id}/status`, {
      status,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error,showToast);
    return null;
  }
};

const deletePostCatalogue = async (_id: string): Promise<Response | null> => {
  try {
    const response = await axiosInstance.delete(`/post-catalogue/${_id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, showToast);
    return null;
  }
}

export {
  getAllPostCatalogues,
  updateStatusPostCatalogue,
  deletePostCatalogue,
  getPostCatalogueById,
  createPostCatalogue,
  updatePostCatalogue,
}