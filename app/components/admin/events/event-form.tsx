'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface Category {
  id: number
  name: string
}

interface EventFormData {
  title: string
  description: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  location: string
  khan: string
  price: number
  capacity: number
  categoryId: number | string
  imageUrls: string[]
}

interface EventFormProps {
  initialData?: EventFormData
  eventId?: number
  mode: 'create' | 'edit'
  categories: Category[] // Pass categories from server
}

export default function EventForm({
  initialData,
  eventId,
  mode,
  categories,
}: EventFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageUrlInput, setImageUrlInput] = useState('')

  const [formData, setFormData] = useState<EventFormData>(
    initialData || {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      location: '',
      khan: '',
      price: 0,
      capacity: 0,
      categoryId: '',
      imageUrls: [],
    }
  )

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }))
  }

  const handleAddImageUrl = () => {
    if (imageUrlInput.trim()) {
      setFormData(prev => ({
        ...prev,
        imageUrls: [...prev.imageUrls, imageUrlInput.trim()],
      }))
      setImageUrlInput('')
    }
  }

  const handleRemoveImageUrl = (index: number) => {
    setFormData(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Prepare data with proper types
      const submitData = {
        ...formData,
        categoryId: parseInt(formData.categoryId.toString()),
        price: parseFloat(formData.price.toString()),
        capacity: parseInt(formData.capacity.toString()),
      }

      const response = await fetch(
        mode === 'create'
          ? '/api/admin/events'
          : `/api/admin/events/${eventId}`,
        {
          method: mode === 'create' ? 'POST' : 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submitData),
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to save event')
      }

      router.push('/admin/events')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='max-w-4xl mx-auto px-6'>
      <div className='mb-6'>
        <Link href='/admin/events'>
          <Button variant='outline' size='sm'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Events
          </Button>
        </Link>
      </div>

      <div className='border bg-input/30 rounded-lg shadow p-6 dark:border-input'>
        <h1 className='text-3xl font-bold mb-6'>
          {mode === 'create' ? 'Create New Event' : 'Edit Event'}
        </h1>

        {error && (
          <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          {/* Title */}
          <div>
            <label
              htmlFor='title'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Title <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              id='title'
              name='title'
              value={formData.title}
              onChange={handleChange}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='Enter event title'
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor='description'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Description <span className='text-red-500'>*</span>
            </label>
            <textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='Enter event description'
            />
          </div>

          {/* Date and Time Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Start Date */}
            <div>
              <label
                htmlFor='startDate'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Start Date <span className='text-red-500'>*</span>
              </label>
              <input
                type='date'
                id='startDate'
                name='startDate'
                value={formData.startDate}
                onChange={handleChange}
                required
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>

            {/* End Date */}
            <div>
              <label
                htmlFor='endDate'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                End Date <span className='text-red-500'>*</span>
              </label>
              <input
                type='date'
                id='endDate'
                name='endDate'
                value={formData.endDate}
                onChange={handleChange}
                required
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>

            {/* Start Time */}
            <div>
              <label
                htmlFor='startTime'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Start Time <span className='text-red-500'>*</span>
              </label>
              <input
                type='time'
                id='startTime'
                name='startTime'
                value={formData.startTime}
                onChange={handleChange}
                required
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>

            {/* End Time */}
            <div>
              <label
                htmlFor='endTime'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                End Time <span className='text-red-500'>*</span>
              </label>
              <input
                type='time'
                id='endTime'
                name='endTime'
                value={formData.endTime}
                onChange={handleChange}
                required
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
          </div>

          {/* Location and Khan Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Location */}
            <div>
              <label
                htmlFor='location'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Location <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='location'
                name='location'
                value={formData.location}
                onChange={handleChange}
                required
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Enter location'
              />
            </div>

            {/* Khan */}
            <div>
              <label
                htmlFor='khan'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Khan <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='khan'
                name='khan'
                value={formData.khan}
                onChange={handleChange}
                required
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Enter khan'
              />
            </div>
          </div>

          {/* Price and Capacity Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Price */}
            <div>
              <label
                htmlFor='price'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Price ($) <span className='text-red-500'>*</span>
              </label>
              <input
                type='number'
                id='price'
                name='price'
                value={formData.price}
                onChange={handleChange}
                required
                min='0'
                step='0.01'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='0.00'
              />
            </div>

            {/* Capacity */}
            <div>
              <label
                htmlFor='capacity'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Capacity <span className='text-red-500'>*</span>
              </label>
              <input
                type='number'
                id='capacity'
                name='capacity'
                value={formData.capacity}
                onChange={handleChange}
                required
                min='1'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='100'
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor='categoryId'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Category <span className='text-red-500'>*</span>
            </label>
            <select
              id='categoryId'
              name='categoryId'
              value={formData.categoryId}
              onChange={handleChange}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            >
              <option value=''>Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image URLs */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Image URLs <span className='text-red-500'>*</span>
            </label>
            <div className='flex gap-2 mb-2'>
              <input
                type='url'
                value={imageUrlInput}
                onChange={e => setImageUrlInput(e.target.value)}
                className='flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='https://example.com/image.jpg'
              />
              <Button
                type='button'
                onClick={handleAddImageUrl}
                variant='outline'
              >
                Add
              </Button>
            </div>
            {formData.imageUrls.length === 0 && (
              <p className='text-sm text-gray-500'>
                At least one image URL is required
              </p>
            )}
            <div className='space-y-2 mt-3'>
              {formData.imageUrls.map((url, index) => (
                <div
                  key={index}
                  className='flex items-center gap-2 bg-gray-50 p-2 rounded'
                >
                  <span className='flex-1 text-sm truncate'>{url}</span>
                  <Button
                    type='button'
                    variant='destructive'
                    size='sm'
                    onClick={() => handleRemoveImageUrl(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className='flex gap-4 pt-4'>
            <Button
              type='submit'
              disabled={loading || formData.imageUrls.length === 0}
            >
              {loading ? (
                <>
                  <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                  {mode === 'create' ? 'Creating...' : 'Updating...'}
                </>
              ) : (
                <>{mode === 'create' ? 'Create Event' : 'Update Event'}</>
              )}
            </Button>
            <Link href='/admin/events'>
              <Button type='button' variant='outline' disabled={loading}>
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
