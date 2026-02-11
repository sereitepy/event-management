export interface CreateSpeakerData {
  bio: string
  company: string
  fullName: string
  imageUrl: string
  title: string
}

export interface Speaker {
  id: number
  bio: string
  company: string
  fullName: string
  imageUrl: string
  title: string
  createdAt?: string
  updatedAt?: string
}

export type SpeakerFormData = CreateSpeakerData
