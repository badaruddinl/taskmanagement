import { User } from '@/schemas'

export interface FindUserByUsernamePayload {
  username: string | 'me'
}

export interface FindUserByUsernameAndIdPayload {
  id?: string
  username?: string
}

export interface FindUserByIdPayload {
  id: string
}

export interface UpdateUserByIdPayload {
  id?: string
  username?: string
  data: Partial<User>
}
