import { Review } from './Review'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Flat {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  // https://github.com/typeorm/typeorm/issues/2610#issuecomment-473903882
  @Column({ type: 'geography', srid: 4326, spatialFeatureType: 'Point' })
  geom: GeoJSON.Point

  @OneToMany(
    () => Review,
    review => review.flat
  )
  reviews: Review[]

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
