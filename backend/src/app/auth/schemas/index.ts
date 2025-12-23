import { schemaBuilderModule } from '@/utils/schemaBuilder.util'
import { rawLoginSchema } from './login'
import { rawRegisterSchema } from './register'

const module = 'Auth'
export const registerSchema = schemaBuilderModule(module, rawRegisterSchema)
export const loginSchema = schemaBuilderModule(module, rawLoginSchema)
