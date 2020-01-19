import { Review } from "./Review";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Apartment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "geography", srid: 4326 })
  location: number;

  @OneToMany(type => Review, review => review.apartment)
  reviews: Review[];
}

// TODO: CRUD for apartment & reviews
