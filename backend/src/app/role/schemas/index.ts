import { schemaBuilderModule } from '@/utils/schemaBuilder.util'
import { rawCreateRoleSchema } from './createRole'

const module = 'Role'
export const createRoleSchema = schemaBuilderModule(module, rawCreateRoleSchema)
