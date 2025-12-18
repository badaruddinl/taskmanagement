import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm'
import { Role } from './role.schema'

@Entity()
@Index('username', ['username'], { unique: true })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar', length: 50 })
  username!: string

  @Column({ type: 'varchar', length: 255 })
  name!: string

  @Column({ type: 'varchar', length: 255 })
  password!: string

  @ManyToOne(() => Role, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role!: Role

  @Column({ type: 'boolean', default: true })
  is_active!: boolean

  @CreateDateColumn()
  created_at!: Date

  @UpdateDateColumn()
  updated_at!: Date
}
