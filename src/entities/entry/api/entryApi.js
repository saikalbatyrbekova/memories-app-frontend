import axios from 'axios'

export const entryApi = {
  async createEntry(entry) {
    try {
      const response = await axios.post('/api/entries', entry)
      return response.data
    } catch (error) {
      throw new Error('Error creating entry')
    }
  },

  async getEntries() {
    try {
      const response = await axios.get('/api/entries')
      return response.data
    } catch (error) {
      throw new Error('Error fetching entries')
    }
  },
    // Update entry API call
    async updateEntry(entry) {
      try {
        const response = await axios.put(`/api/entries/${entry.id}`, entry)
        return response.data
      } catch (error) {
        throw new Error('Error updating entry')
      }
    },
  
    // Get entry details by ID
    async getEntryById(entryId) {
      try {
        const response = await axios.get(`/api/entries/${entryId}`)
        return response.data
      } catch (error) {
        throw new Error('Error fetching entry')
      }
    },
    async deleteEntry(entryId) {
      const response = await fetch(`/api/entries/${entryId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete entry');
    },
        async getEntries() {
          const response = await fetch('/api/entries', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          if (!response.ok) throw new Error('Failed to fetch entries');
          return response.json();
        },

  async addImage(entryId, file) {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await axios.post(`/api/entries/${entryId}/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;  // Return the uploaded image data (URL or file info)
    } catch (error) {
      throw new Error('Image upload failed');
    }
  },
  async deleteImage(entryId) {
    try {
      await axios.delete(`/api/entries/${entryId}/delete-image`);
    } catch (error) {
      throw new Error('Image delete failed');
    }
  },
};


