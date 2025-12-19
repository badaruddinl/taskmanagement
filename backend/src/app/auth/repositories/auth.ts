import { Repository } from 'typeorm'
import { AppDataSource } from '@/connections/database'
import { User } from '@/schemas'

export class AuthRepository {
  private readonly repo: Repository<User>

  constructor() {
    this.repo = AppDataSource.getRepository(User)
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.repo.findOne({
      where: { username },
      select: { id: true, username: true, password: true, is_active: true, role: true },
    })
  }

  async create(user: Partial<User>): Promise<User> {
    const entity = this.repo.create(user)
    return this.repo.save(entity)
  }
}
