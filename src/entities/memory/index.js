export { memoryApi } from './api/memoryApi'
export { MEMORY_ERRORS } from './model/constants'

import { memoryApi } from '@entities/memory'

// Fetch memories
const memories = await memoryApi.getMemories()

// Create a new memory
const newMemory = await memoryApi.createMemory({
  title: 'New Memory',
  description: 'A new memory description',
})

// Update a memory
const updatedMemory = await memoryApi.updateMemory(1, {
  description: 'Updated description',
})

// Delete a memory
await memoryApi.deleteMemory(1)
