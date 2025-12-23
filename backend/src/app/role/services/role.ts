import { BaqRequestError } from '@/errorDecorator/fastifyError'
import { CreateRolePayload } from '../dto/role'
import { RoleRepository } from '../repositories/role'

export class RoleService {
  private readonly roleRepository: RoleRepository

  constructor() {
    this.roleRepository = new RoleRepository()
  }

  public async createRole(payload: CreateRolePayload) {
    const existingRole = await this.roleRepository.findByRole(payload.name)

    if (existingRole) {
      throw new BaqRequestError('Role already exists')
    }

    return this.roleRepository.create({
      name: payload.name,
    })
  }
}
