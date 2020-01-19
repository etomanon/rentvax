import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

enum Role {
  admin = "admin",
  user = "user"
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  providerId: string;

  @Column({ type: "enum", enum: Role, default: "user" })
  role: string;

  @Column()
  email: string;
}
