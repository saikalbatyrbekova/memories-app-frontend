import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { entryApi } from '../api/entryApi'
import { useNavigate, useParams } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const entrySchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  content: z.string().min(1, 'Content is required').max(10000, 'Content is too long'),
})

export const EntryEditForm = () => {
  const { entryId } = useParams() // Fetch entry ID from URL params
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(entrySchema),
  })

  // Fetch the entry details to prefill the form
  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const entry = await entryApi.getEntryById(entryId)
        setValue('title', entry.title)
        setContent(entry.content)
      } catch (error) {
        console.error('Error fetching entry:', error)
      }
    }
    fetchEntry()
  }, [entryId, setValue])

  const onEditorChange = (value) => {
    setContent(value)
  }

  const onEditSubmit = async (data) => {
    try {
      await entryApi.updateEntry({ ...data, id: entryId, content })
      navigate('/entries') // Redirect to the entries list
    } catch (error) {
      console.error('Error updating entry:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onEditSubmit)}>
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

      <button type="submit">Save Changes</button>
    </form>
  )
}
