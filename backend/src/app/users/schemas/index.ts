import { schemaBuilderModule } from '@/utils/schemaBuilder.util'
import { rawFindOneUserSchema } from './findOneUser'

const module = 'User'
export const findOneUserSchema = schemaBuilderModule(module, rawFindOneUserSchema)
