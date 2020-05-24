import { Review } from './Review'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

enum Role {
  admin = 'admin',
  user = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  providerId: string

  @Column({ type: 'enum', enum: Role, default: 'user' })
  role: string

  @Column()
  email: string

  @OneToMany(
    () => Review,
    review => review.user
  )
  reviews: Review[]

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
