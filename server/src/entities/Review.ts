import { User } from './User'
import { Flat } from './Flat'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

enum Rating {
  WORST = 1,
  BAD = 2,
  NORMAL = 3,
  GOOD = 4,
  BEST = 5,
}

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'enum', enum: Rating })
  rating: number

  @Column({ length: '1500' })
  description: string

  @ManyToOne(
    type => Flat,
    flat => flat.reviews
  )
  flat: Flat

  @ManyToOne(
    type => User,
    user => user.reviews
  )
  user: User
}
