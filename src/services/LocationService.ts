import { Location } from '@/types/Location'
import axiosInstance from '../configs/axios'
import { handleAxiosError } from '@/helpers/axiosHelper'
import { showToast } from '@/helpers/toastHelper'

const getProvinces = async (): Promise<Location[] | null> => {
  try {
    const response = await axiosInstance.get('/location/provinces')
    return response.data.data
  } catch (error) {
    handleAxiosError(error, showToast)
    return null
  }
}

const getDistricts = async (provinceCode: string): Promise<Location[] | null> => {
  try {
    const response = await axiosInstance.get(`/location/districts/${provinceCode}`)
    return response.data.data
  } catch (error) {
    handleAxiosError(error, showToast)
    return null
  }
}

const getWards = async (districtCode: string): Promise<Location[] | null> => {
  try {
    const response = await axiosInstance.get(`/location/wards/${districtCode}`)
    return response.data.data
  } catch (error) {
    handleAxiosError(error, showToast)
    return null
  }
}

export { getProvinces, getDistricts, getWards }
