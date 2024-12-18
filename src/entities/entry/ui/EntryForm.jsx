import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const entrySchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  content: z.string().min(1, 'Content is required').max(10000, 'Content too long'),
})

export const EntryForm = ({ onSubmit }) => {
  const [content, setContent] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(entrySchema),
  })

  const onEditorChange = (value) => {
    setContent(value)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          {...register('title')}
          id="title"
          type="text"
        />
        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="content">Content</label>
        <ReactQuill
          value={content}
          onChange={onEditorChange}
        />
        {errors.content && <p>{errors.content.message}</p>}
      </div>

      <button type="submit">Create Entry</button>
    </form>
  )
}
const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check for valid image file
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file format');
      return;
    }

    setLoading(true);
    try {
      const imageData = await entryApi.addImage(entryId, file);
      setImage(imageData);  // Store the image data (URL)
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form>
        <label>
          Upload Image:
          <input type="file" onChange={handleImageChange} />
        </label>
        {loading && <p>Uploading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {image && <img src={image.url} alt="Uploaded" width="100" />}
      </form>
    </div>
  );
  
export default EntryForm;


