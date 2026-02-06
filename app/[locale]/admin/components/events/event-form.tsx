'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createEventAdmin, updateEventAdmin } from '@/app/actions/admin-events'

interface Category {
  id: number
  name: string
  slug?: string
  description?: string
}

interface EventData {
  title: string
  description: string
  categoryId: number | string
  location?: string
  venue?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
  startDate: string
  endDate: string
  startTime?: string
  endTime?: string
  price?: number | string
  currency?: string
  capacity?: number | string
  organizerName?: string
  organizerEmail?: string
  organizerPhone?: string
  imageUrl?: string
  bannerUrl?: string
  tags?: string[]
  status?: 'draft' | 'published' | 'cancelled'
  isFeatured?: boolean
  isOnline?: boolean
  onlineUrl?: string
  registrationRequired?: boolean
  registrationDeadline?: string
  ticketUrl?: string
  notes?: string
  // Add any other fields your API expects
}

interface EventFormProps {
  categories: Category[]
  initialData: EventData | null
  isEditMode: boolean
  eventId: number | null
}

const defaultFormData: EventData = {
  title: '',
  description: '',
  categoryId: '',
  location: '',
  venue: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  price: '',
  currency: 'USD',
  capacity: '',
  organizerName: '',
  organizerEmail: '',
  organizerPhone: '',
  imageUrl: '',
  bannerUrl: '',
  tags: [],
  status: 'draft',
  isFeatured: false,
  isOnline: false,
  onlineUrl: '',
  registrationRequired: false,
  registrationDeadline: '',
  ticketUrl: '',
  notes: '',
}

export default function EventForm({
  categories,
  initialData,
  isEditMode,
  eventId,
}: EventFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState<
    'basic' | 'details' | 'organizer' | 'settings'
  >('basic')

  const [formData, setFormData] = useState<EventData>(
    initialData || defaultFormData
  )
  const [tagInput, setTagInput] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.imageUrl || null
  )
  const [bannerPreview, setBannerPreview] = useState<string | null>(
    initialData?.bannerUrl || null
  )

  // Handle text input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({
        ...prev,
        [name]: checked,
      }))
    } else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? '' : Number(value),
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  // Handle checkbox changes
  const handleCheckboxChange = (name: keyof EventData) => {
    setFormData(prev => ({
      ...prev,
      [name]: !prev[name],
    }))
  }

  // Handle image URL changes with preview
  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: 'image' | 'banner'
  ) => {
    const url = e.target.value
    if (type === 'image') {
      setFormData(prev => ({ ...prev, imageUrl: url }))
      setImagePreview(url)
    } else {
      setFormData(prev => ({ ...prev, bannerUrl: url }))
      setBannerPreview(url)
    }
  }

  // Handle tags
  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()],
      }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || [],
    }))
  }

  const handleTagInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  // Form validation
  const validateForm = (): string | null => {
    if (!formData.title.trim()) return 'Title is required'
    if (!formData.description.trim()) return 'Description is required'
    if (!formData.categoryId) return 'Category is required'
    if (!formData.startDate) return 'Start date is required'
    if (!formData.endDate) return 'End date is required'

    const start = new Date(formData.startDate)
    const end = new Date(formData.endDate)
    if (end < start) return 'End date must be after start date'

    if (formData.isOnline && !formData.onlineUrl?.trim()) {
      return 'Online URL is required for online events'
    }

    if (!formData.isOnline && !formData.location?.trim()) {
      return 'Location is required for in-person events'
    }

    if (formData.registrationRequired && formData.registrationDeadline) {
      const deadline = new Date(formData.registrationDeadline)
      if (deadline > start) {
        return 'Registration deadline must be before event start date'
      }
    }

    if (formData.organizerEmail && !isValidEmail(formData.organizerEmail)) {
      return 'Invalid organizer email address'
    }

    return null
  }

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    // Validate form
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)

    try {
      // Prepare data for submission
      const submitData = {
        ...formData,
        categoryId: Number(formData.categoryId),
        price: formData.price ? Number(formData.price) : null,
        capacity: formData.capacity ? Number(formData.capacity) : null,
      }

      const result =
        isEditMode && eventId
          ? await updateEventAdmin(eventId, submitData)
          : await createEventAdmin(submitData)

      if (result.success) {
        setSuccess(true)

        // Redirect after short delay to show success message
        setTimeout(() => {
          router.push('/admin/events')
          router.refresh()
        }, 1500)
      } else {
        setError(result.message || 'An error occurred')
      }
    } catch (err) {
      console.error('Form submission error:', err)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Handle cancel
  const handleCancel = () => {
    if (
      confirm(
        'Are you sure you want to cancel? Any unsaved changes will be lost.'
      )
    ) {
      router.push('/admin/events')
    }
  }

  // Tabs configuration
  const tabs = [
    { id: 'basic' as const, label: 'Basic Info', icon: '📝' },
    { id: 'details' as const, label: 'Event Details', icon: '📅' },
    { id: 'organizer' as const, label: 'Organizer', icon: '👤' },
    { id: 'settings' as const, label: 'Settings', icon: '⚙️' },
  ]

  return (
    <div className='max-w-5xl mx-auto'>
      {/* Alert Messages */}
      {error && (
        <div className='mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded'>
          <div className='flex items-center'>
            <span className='text-red-700 font-medium'>Error: </span>
            <span className='ml-2 text-red-600'>{error}</span>
          </div>
        </div>
      )}

      {success && (
        <div className='mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded'>
          <div className='flex items-center'>
            <span className='text-green-700 font-medium'>✓ Success! </span>
            <span className='ml-2 text-green-600'>
              Event {isEditMode ? 'updated' : 'created'} successfully.
              Redirecting...
            </span>
          </div>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className='mb-6 border-b border-gray-200'>
        <div className='flex space-x-1'>
          {tabs.map(tab => (
            <button
              key={tab.id}
              type='button'
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800 hover:border-b-2 hover:border-gray-300'
              }`}
            >
              <span className='mr-2'>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-md rounded-lg p-6'
      >
        {/* BASIC INFO TAB */}
        {activeTab === 'basic' && (
          <div className='space-y-6'>
            <h2 className='text-xl font-semibold mb-4'>Basic Information</h2>

            {/* Title */}
            <div>
              <label
                htmlFor='title'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Event Title <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='title'
                name='title'
                value={formData.title}
                onChange={handleChange}
                required
                maxLength={200}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='e.g., Annual Tech Conference 2024'
              />
              <p className='mt-1 text-sm text-gray-500'>
                {formData.title.length}/200 characters
              </p>
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
                rows={6}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Provide a detailed description of your event...'
              />
              <p className='mt-1 text-sm text-gray-500'>
                {formData.description.length} characters
              </p>
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

            {/* Event Type */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Event Type
              </label>
              <div className='flex items-center space-x-6'>
                <label className='flex items-center cursor-pointer'>
                  <input
                    type='checkbox'
                    name='isOnline'
                    checked={formData.isOnline}
                    onChange={() => handleCheckboxChange('isOnline')}
                    className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                  />
                  <span className='ml-2 text-sm text-gray-700'>
                    Online Event
                  </span>
                </label>
              </div>
            </div>

            {/* Online URL (if online event) */}
            {formData.isOnline && (
              <div>
                <label
                  htmlFor='onlineUrl'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Online Event URL <span className='text-red-500'>*</span>
                </label>
                <input
                  type='url'
                  id='onlineUrl'
                  name='onlineUrl'
                  value={formData.onlineUrl}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  placeholder='https://zoom.us/j/...'
                />
              </div>
            )}

            {/* Images */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Event Image */}
              <div>
                <label
                  htmlFor='imageUrl'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Event Image URL
                </label>
                <input
                  type='url'
                  id='imageUrl'
                  name='imageUrl'
                  value={formData.imageUrl}
                  onChange={e => handleImageChange(e, 'image')}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  placeholder='https://example.com/image.jpg'
                />
                {imagePreview && (
                  <div className='mt-2'>
                    <Image
                      src={imagePreview}
                      alt='Event preview'
                      className='w-full h-40 object-cover rounded border'
                      onError={() => setImagePreview(null)}
                    />
                  </div>
                )}
              </div>

              {/* Banner Image */}
              <div>
                <label
                  htmlFor='bannerUrl'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Banner Image URL
                </label>
                <input
                  type='url'
                  id='bannerUrl'
                  name='bannerUrl'
                  value={formData.bannerUrl}
                  onChange={e => handleImageChange(e, 'banner')}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  placeholder='https://example.com/banner.jpg'
                />
                {bannerPreview && (
                  <div className='mt-2'>
                    <Image
                      src={bannerPreview}
                      alt='Banner preview'
                      className='w-full h-40 object-cover rounded border'
                      onError={() => setBannerPreview(null)}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Tags
              </label>
              <div className='flex gap-2 mb-2'>
                <input
                  type='text'
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyPress={handleTagInputKeyPress}
                  className='flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  placeholder='Add a tag and press Enter'
                />
                <button
                  type='button'
                  onClick={handleAddTag}
                  className='px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300'
                >
                  Add
                </button>
              </div>
              <div className='flex flex-wrap gap-2'>
                {formData.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className='inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800'
                  >
                    {tag}
                    <button
                      type='button'
                      onClick={() => handleRemoveTag(tag)}
                      className='ml-2 text-blue-600 hover:text-blue-800'
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* EVENT DETAILS TAB */}
        {activeTab === 'details' && (
          <div className='space-y-6'>
            <h2 className='text-xl font-semibold mb-4'>Event Details</h2>

            {/* Date and Time */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
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

              <div>
                <label
                  htmlFor='startTime'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Start Time
                </label>
                <input
                  type='time'
                  id='startTime'
                  name='startTime'
                  value={formData.startTime}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

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

              <div>
                <label
                  htmlFor='endTime'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  End Time
                </label>
                <input
                  type='time'
                  id='endTime'
                  name='endTime'
                  value={formData.endTime}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>
            </div>

            {/* Location (if not online) */}
            {!formData.isOnline && (
              <>
                <div>
                  <label
                    htmlFor='location'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Location Name <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    id='location'
                    name='location'
                    value={formData.location}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='e.g., Downtown Convention Center'
                  />
                </div>

                <div>
                  <label
                    htmlFor='venue'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Venue Details
                  </label>
                  <input
                    type='text'
                    id='venue'
                    name='venue'
                    value={formData.venue}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='e.g., Main Hall, Room 301'
                  />
                </div>

                <div>
                  <label
                    htmlFor='address'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Street Address
                  </label>
                  <input
                    type='text'
                    id='address'
                    name='address'
                    value={formData.address}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='123 Main Street'
                  />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div>
                    <label
                      htmlFor='city'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      City
                    </label>
                    <input
                      type='text'
                      id='city'
                      name='city'
                      value={formData.city}
                      onChange={handleChange}
                      className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='state'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      State/Province
                    </label>
                    <input
                      type='text'
                      id='state'
                      name='state'
                      value={formData.state}
                      onChange={handleChange}
                      className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='zipCode'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      ZIP/Postal Code
                    </label>
                    <input
                      type='text'
                      id='zipCode'
                      name='zipCode'
                      value={formData.zipCode}
                      onChange={handleChange}
                      className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='country'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Country
                  </label>
                  <input
                    type='text'
                    id='country'
                    name='country'
                    value={formData.country}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                </div>
              </>
            )}

            {/* Pricing */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label
                  htmlFor='price'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Price
                </label>
                <input
                  type='number'
                  id='price'
                  name='price'
                  value={formData.price}
                  onChange={handleChange}
                  min='0'
                  step='0.01'
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  placeholder='0.00'
                />
                <p className='mt-1 text-sm text-gray-500'>
                  Leave blank or 0 for free events
                </p>
              </div>

              <div>
                <label
                  htmlFor='currency'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Currency
                </label>
                <select
                  id='currency'
                  name='currency'
                  value={formData.currency}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                >
                  <option value='USD'>USD - US Dollar</option>
                  <option value='EUR'>EUR - Euro</option>
                  <option value='GBP'>GBP - British Pound</option>
                  <option value='JPY'>JPY - Japanese Yen</option>
                  <option value='CAD'>CAD - Canadian Dollar</option>
                  <option value='AUD'>AUD - Australian Dollar</option>
                </select>
              </div>
            </div>

            {/* Capacity */}
            <div>
              <label
                htmlFor='capacity'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Event Capacity
              </label>
              <input
                type='number'
                id='capacity'
                name='capacity'
                value={formData.capacity}
                onChange={handleChange}
                min='1'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Maximum number of attendees'
              />
            </div>

            {/* Ticket URL */}
            <div>
              <label
                htmlFor='ticketUrl'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Ticket Purchase URL
              </label>
              <input
                type='url'
                id='ticketUrl'
                name='ticketUrl'
                value={formData.ticketUrl}
                onChange={handleChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='https://tickets.example.com'
              />
            </div>
          </div>
        )}

        {/* ORGANIZER TAB */}
        {activeTab === 'organizer' && (
          <div className='space-y-6'>
            <h2 className='text-xl font-semibold mb-4'>
              Organizer Information
            </h2>

            <div>
              <label
                htmlFor='organizerName'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Organizer Name
              </label>
              <input
                type='text'
                id='organizerName'
                name='organizerName'
                value={formData.organizerName}
                onChange={handleChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='John Doe or Organization Name'
              />
            </div>

            <div>
              <label
                htmlFor='organizerEmail'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Organizer Email
              </label>
              <input
                type='email'
                id='organizerEmail'
                name='organizerEmail'
                value={formData.organizerEmail}
                onChange={handleChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='organizer@example.com'
              />
            </div>

            <div>
              <label
                htmlFor='organizerPhone'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Organizer Phone
              </label>
              <input
                type='tel'
                id='organizerPhone'
                name='organizerPhone'
                value={formData.organizerPhone}
                onChange={handleChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='+1 (555) 123-4567'
              />
            </div>

            <div>
              <label
                htmlFor='notes'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Additional Notes
              </label>
              <textarea
                id='notes'
                name='notes'
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Any additional information or special instructions...'
              />
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className='space-y-6'>
            <h2 className='text-xl font-semibold mb-4'>Event Settings</h2>

            {/* Status */}
            <div>
              <label
                htmlFor='status'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Event Status
              </label>
              <select
                id='status'
                name='status'
                value={formData.status}
                onChange={handleChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                <option value='draft'>Draft</option>
                <option value='published'>Published</option>
                <option value='cancelled'>Cancelled</option>
              </select>
              <p className='mt-1 text-sm text-gray-500'>
                {formData.status === 'draft' &&
                  'Event is not visible to the public'}
                {formData.status === 'published' &&
                  'Event is live and visible to everyone'}
                {formData.status === 'cancelled' && 'Event has been cancelled'}
              </p>
            </div>

            {/* Featured */}
            <div className='flex items-start'>
              <div className='flex items-center h-5'>
                <input
                  type='checkbox'
                  id='isFeatured'
                  name='isFeatured'
                  checked={formData.isFeatured}
                  onChange={() => handleCheckboxChange('isFeatured')}
                  className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                />
              </div>
              <div className='ml-3'>
                <label
                  htmlFor='isFeatured'
                  className='font-medium text-gray-700 cursor-pointer'
                >
                  Featured Event
                </label>
                <p className='text-sm text-gray-500'>
                  Display this event prominently on the homepage
                </p>
              </div>
            </div>

            {/* Registration Required */}
            <div className='flex items-start'>
              <div className='flex items-center h-5'>
                <input
                  type='checkbox'
                  id='registrationRequired'
                  name='registrationRequired'
                  checked={formData.registrationRequired}
                  onChange={() => handleCheckboxChange('registrationRequired')}
                  className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                />
              </div>
              <div className='ml-3'>
                <label
                  htmlFor='registrationRequired'
                  className='font-medium text-gray-700 cursor-pointer'
                >
                  Registration Required
                </label>
                <p className='text-sm text-gray-500'>
                  Attendees must register before attending
                </p>
              </div>
            </div>

            {/* Registration Deadline */}
            {formData.registrationRequired && (
              <div>
                <label
                  htmlFor='registrationDeadline'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Registration Deadline
                </label>
                <input
                  type='date'
                  id='registrationDeadline'
                  name='registrationDeadline'
                  value={formData.registrationDeadline}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>
            )}
          </div>
        )}

        {/* Form Actions */}
        <div className='mt-8 pt-6 border-t border-gray-200 flex flex-wrap gap-4'>
          <button
            type='submit'
            disabled={loading || success}
            className='px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
          >
            {loading ? (
              <span className='flex items-center'>
                <svg
                  className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                {isEditMode ? 'Updating...' : 'Creating...'}
              </span>
            ) : (
              <span>{isEditMode ? 'Update Event' : 'Create Event'}</span>
            )}
          </button>

          <button
            type='button'
            onClick={handleCancel}
            disabled={loading || success}
            className='px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 transition-colors'
          >
            Cancel
          </button>

          {isEditMode && (
            <button
              type='button'
              onClick={() => setFormData(initialData || defaultFormData)}
              disabled={loading || success}
              className='px-6 py-3 bg-yellow-100 text-yellow-800 font-medium rounded-md hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50 transition-colors'
            >
              Reset Form
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
