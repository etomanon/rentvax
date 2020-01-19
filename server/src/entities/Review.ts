import { Apartment } from "./Apartment";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

enum Rating {
  WORST,
  BAD,
  NORMAL,
  GOOD,
  BEST
}

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: Rating })
  rating: number;

  @ManyToOne(type => Apartment, apartment => apartment.reviews)
  apartment: Apartment;
}
