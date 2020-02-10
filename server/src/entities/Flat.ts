import { Review } from './Review'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@Entity()
export class Flat {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ type: 'geography', srid: 4326 })
  location: number

  @OneToMany(
    () => Review,
    review => review.flat
  )
  reviews: Review[]
}
