import axios from 'axios'

export const BASE_URL = 'https://memories-app-deploy-production.up.railway.app/'

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
