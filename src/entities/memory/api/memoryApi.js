import { axiosInstance } from '@shared/api/axios'

const ENDPOINTS = {
  GET_MEMORIES: '/memories',                // Update endpoints to match your app
  GET_MEMORY: (id) => `/memories/${id}`,
  CREATE_MEMORY: '/memories',
  UPDATE_MEMORY: (id) => `/memories/${id}`,
  DELETE_MEMORY: (id) => `/memories/${id}`,
}

export const memoryApi = {
  async getMemories() {
    const { data } = await axiosInstance.get(ENDPOINTS.GET_MEMORIES)
    return data
  },

  async getMemoryById(id) {
    const { data } = await axiosInstance.get(ENDPOINTS.GET_MEMORY(id))
    return data
  },

  async createMemory(memory) {
    const { data } = await axiosInstance.post(ENDPOINTS.CREATE_MEMORY, memory)
    return data
  },

  async updateMemory(id, memory) {
    const { data } = await axiosInstance.put(ENDPOINTS.UPDATE_MEMORY(id), memory)
    return data
  },

  async deleteMemory(id) {
    await axiosInstance.delete(ENDPOINTS.DELETE_MEMORY(id))
  },
}
