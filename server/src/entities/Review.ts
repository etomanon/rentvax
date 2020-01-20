import { User } from "./User";
import { Flat } from "./Flat";
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

  @ManyToOne(type => Flat, flat => flat.reviews)
  flat: Flat;

  @ManyToOne(type => User, user => user.reviews)
  user: User;
}
