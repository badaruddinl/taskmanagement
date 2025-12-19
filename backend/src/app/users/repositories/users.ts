import { Repository } from 'typeorm'
import { AppDataSource } from '@/connections/database'
import { User } from '@/schemas'

export class UserRepository {
  private readonly repo: Repository<User>

  constructor() {
    this.repo = AppDataSource.getRepository(User)
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.repo.findOne({
      where: { username },
      select: { id: true, username: true, name: true, is_active: true, role: true },
    })
  }

  async findUserById(user_id: string): Promise<User | null> {
    return this.repo.findOne({
      where: { id: user_id },
      select: { id: true, username: true, name: true, is_active: true, role: true },
    })
  }

  async update(user_id: string, data: Partial<User>): Promise<User> {
    const user = await this.repo.findOne({
      where: { id: user_id },
      select: { id: true, username: true, name: true, is_active: true, role: true },
    })

    if (!user) {
      throw new Error('User not found')
    }

    const updateUser = this.repo.merge(user, data)
    return this.repo.save(updateUser)
  }
}
