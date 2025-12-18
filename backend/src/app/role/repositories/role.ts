import { Repository } from 'typeorm'
import { AppDataSource } from '@/connections/database'
import { Role } from '@/schemas/role.schema'

export class RoleRepository {
  private readonly repo: Repository<Role>

  constructor() {
    this.repo = AppDataSource.getRepository(Role)
  }

  async findByRole(name: string): Promise<Role | null> {
    return this.repo.findOne({
      where: { name },
    })
  }

  async findById(id: string): Promise<Role | null> {
    return this.repo.findOne({
      where: { id },
    })
  }

  async create(name: Partial<Role>): Promise<Role> {
    const entity = this.repo.create(name)
    return this.repo.save(entity)
  }
}
