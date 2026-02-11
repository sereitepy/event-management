'use client'

import { Button } from '@/components/ui/button'
import { createCategory, updateCategory } from '@/lib/api/categories'
import { CategoryFormData } from '@/types/category'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface CategoryFormProps {
  initialData?: CategoryFormData
  categoryId?: number
  mode: 'create' | 'edit'
}

export default function CategoryForm({
  initialData,
  categoryId,
  mode,
}: CategoryFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<CategoryFormData>(
    initialData || {
      name: '',
      description: '',
      createdAt: ''
    }
  )

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const result =
        mode === 'create'
          ? await createCategory(formData)
          : await updateCategory(categoryId!, formData)

      if (!result.success) {
        setError(result.message || 'An error occurred')
        return
      }

      router.push('/admin/categories')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='max-w-2xl mx-auto px-6'>
      <div className='mb-6'>
        <Link href='/admin/categories'>
          <Button variant='outline' size='sm'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Categories
          </Button>
        </Link>
      </div>

      <div className='border bg-input/30 rounded-lg shadow p-6 dark:border-input'>
        <h1 className='text-3xl font-bold mb-6'>
          {mode === 'create' ? 'Create New Category' : 'Edit Category'}
        </h1>

        {error && (
          <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          {/* Name */}
          <div>
            <label htmlFor='name' className='block text-lg font-bold mb-2'>
              Name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-100 focus:border-transparent'
              placeholder='Enter category name'
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor='description'
              className='block text-lg font-bold mb-2'
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
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-100 focus:border-transparent'
              placeholder='Enter category description'
            />
          </div>

          {/* Submit Button */}
          <div className='flex gap-4 pt-4'>
            <Button type='submit' disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                  {mode === 'create' ? 'Creating...' : 'Updating...'}
                </>
              ) : (
                <>{mode === 'create' ? 'Create Category' : 'Update Category'}</>
              )}
            </Button>
            <Link href='/admin/categories'>
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
