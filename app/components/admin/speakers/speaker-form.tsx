'use client'

import { Button } from '@/components/ui/button'
import { createSpeaker, updateSpeaker } from '@/lib/api/speakers'
import { SpeakerFormData } from '@/types/speaker'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface SpeakerFormProps {
  initialData?: SpeakerFormData
  speakerId?: number
  mode: 'create' | 'edit'
}

export default function SpeakerForm({
  initialData,
  speakerId,
  mode,
}: SpeakerFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<SpeakerFormData>(
    initialData || {
      fullName: '',
      title: '',
      company: '',
      bio: '',
      imageUrl: '',
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
          ? await createSpeaker(formData)
          : await updateSpeaker(speakerId!, formData)

      if (!result.success) {
        setError(result.message || 'An error occurred')
        return
      }

      router.push('/admin/speakers')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='max-w-2xl mx-auto px-6'>
      <div className='mb-6'>
        <Link href='/admin/speakers'>
          <Button variant='outline' size='sm'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Speakers
          </Button>
        </Link>
      </div>

      <div className='border bg-input/30 rounded-lg shadow p-6 dark:border-input'>
        <h1 className='text-3xl font-bold mb-6'>
          {mode === 'create' ? 'Create New Speaker' : 'Edit Speaker'}
        </h1>

        {error && (
          <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          {/* Full Name */}
          <div>
            <label htmlFor='fullName' className='block text-lg font-bold mb-2'>
              Full Name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              id='fullName'
              name='fullName'
              value={formData.fullName}
              onChange={handleChange}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-100 focus:border-transparent'
              placeholder='Enter speaker full name'
            />
          </div>

          {/* Title */}
          <div>
            <label htmlFor='title' className='block text-lg font-bold mb-2'>
              Title <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              id='title'
              name='title'
              value={formData.title}
              onChange={handleChange}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-100 focus:border-transparent'
              placeholder='Enter speaker title (e.g., IT Professor)'
            />
          </div>

          {/* Company */}
          <div>
            <label htmlFor='company' className='block text-lg font-bold mb-2'>
              Company <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              id='company'
              name='company'
              value={formData.company}
              onChange={handleChange}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-100 focus:border-transparent'
              placeholder='Enter company name'
            />
          </div>

          {/* Bio */}
          <div>
            <label htmlFor='bio' className='block text-lg font-bold mb-2'>
              Bio <span className='text-red-500'>*</span>
            </label>
            <textarea
              id='bio'
              name='bio'
              value={formData.bio}
              onChange={handleChange}
              required
              rows={4}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-100 focus:border-transparent'
              placeholder='Enter speaker bio'
            />
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor='imageUrl' className='block text-lg font-bold mb-2'>
              Image URL <span className='text-red-500'>*</span>
            </label>
            <input
              type='url'
              id='imageUrl'
              name='imageUrl'
              value={formData.imageUrl}
              onChange={handleChange}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-100 focus:border-transparent'
              placeholder='Enter image URL'
            />
            {formData.imageUrl && (
              <div className='mt-2'>
                <Image
                  src={formData.imageUrl}
                  alt='Speaker preview'
                  width={100}
                  height={100}
                  className='w-32 h-32 object-cover rounded-md border border-gray-300'
                  onError={e => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            )}
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
                <>{mode === 'create' ? 'Create Speaker' : 'Update Speaker'}</>
              )}
            </Button>
            <Link href='/admin/speakers'>
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
