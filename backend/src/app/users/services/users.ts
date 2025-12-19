import { UserRepository } from '../repositories/users'
import {
  FindUserByIdPayload,
  FindUserByUsernameAndIdPayload,
  FindUserByUsernamePayload,
  UpdateUserByIdPayload,
} from '../dto/users'

export class UserService {
  private readonly userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  public async findUserByUsername(payload: FindUserByUsernameAndIdPayload) {
    const { username, id } = payload
    const user = await this.userRepository.findUserByUsername(username!)

    if (!user || id === user.id) {
      throw new Error('User Not found')
    }

    return user
  }

  public async findMe(payload: FindUserByIdPayload) {
    const { id } = payload
    const user = await this.userRepository.findUserById(id)

    if (!user) {
      throw new Error('User Not found')
    }

    return { user }
  }

  public async updateUser(payload: UpdateUserByIdPayload) {
    const { id, username, data } = payload
    const user = await this.findUserByUsername({ username: username!, id: id! })
    const result = await this.userRepository.update(user.id, data)

    return result
  }

  public async updateMe(payload: UpdateUserByIdPayload) {
    const { id, data } = payload
    const user = await this.findMe({ id: id! })
    const result = await this.userRepository.update(user.user.id, data)

    return result
  }
}
