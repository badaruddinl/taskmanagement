import { LoginPayload, RegisterPayload } from '../dto/auth'
import { AuthRepository } from '../repositories/auth'
import { hashData, verifyData } from '@/utils/hashData.util'
import { RoleRepository } from '@/app/role/repositories/role'
import { FastifyInstance } from 'fastify/fastify'
import { signAccessToken } from '@/services/token/sign'
import { UnauthorizedError } from '@/errorDecorator/unauthorizedError'

export class AuthService {
  private readonly authRepository: AuthRepository
  private readonly roleRepository: RoleRepository

  constructor(private readonly app: FastifyInstance) {
    this.authRepository = new AuthRepository()
    this.roleRepository = new RoleRepository()
  }

  public async login(payload: LoginPayload) {
    const existingUser = await this.authRepository.findByUsername(payload.username)

    if (!existingUser) {
      throw new UnauthorizedError()
    }

    const verifyPassword = await verifyData(existingUser.password, payload.password)

    if (!verifyPassword) {
      throw new UnauthorizedError()
    }

    const accessToken = await signAccessToken({
      sub: existingUser.id,
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
      throw new Error('Username already exists')
    }

    const hashedPassword = await hashData(payload.password)

    const role = await this.roleRepository.findByRole('user')

    if (!role) {
      throw new Error(`Role doesn't exists`)
    }

    return this.authRepository.create({
      name: payload.name,
      username: payload.username,
      password: hashedPassword,
      role,
    })
  }
}
