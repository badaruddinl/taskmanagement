import { LoginPayload, RegisterPayload } from '../dto/auth'
import { AuthRepository } from '../repositories/auth'
import { hashData, verifyData } from '@/utils/hashData.util'
import { RoleRepository } from '@/app/role/repositories/role'
import { signAccessToken } from '@/services/token/sign'
import { BaqRequestError, UnauthorizedError } from '@/errorDecorator/fastifyError'

export class AuthService {
  private readonly authRepository: AuthRepository
  private readonly roleRepository: RoleRepository

  constructor() {
    this.authRepository = new AuthRepository()
    this.roleRepository = new RoleRepository()
  }

  public async login(payload: LoginPayload) {
    const existingUser = await this.authRepository.findByUsername(payload.username)

    if (!existingUser) {
      throw new UnauthorizedError('Username or Password incorrect')
    }

    const verifyPassword = await verifyData(existingUser.password, payload.password)

    if (!verifyPassword) {
      throw new UnauthorizedError('Username or Password incorrect')
    }

    const accessToken = await signAccessToken({
      id: existingUser.id,
      username: existingUser.username,
      role: existingUser.role.id,
    })

    return {
      accessToken,
      user: {
        id: existingUser.id,
        name: existingUser.name,
        username: existingUser.username,
        role: existingUser.role,
      },
    }
  }

  public async register(payload: RegisterPayload) {
    const existingUser = await this.authRepository.findByUsername(payload.username)

    if (existingUser) {
      throw new BaqRequestError('Username already exists')
    }

    const hashedPassword = await hashData(payload.password)

    const role = await this.roleRepository.findByRole('user')

    if (!role) {
      throw new BaqRequestError(`Role doesn't exists`)
    }

    return this.authRepository.create({
      name: payload.name,
      username: payload.username,
      password: hashedPassword,
      role,
    })
  }
}
