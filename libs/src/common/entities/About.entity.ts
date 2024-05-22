import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Admin } from "./Admin.entity";

@Entity()
export class AboutPage extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  content: string

  @OneToOne(() => Admin, (admin) => admin.aboutPage)
  admin: Admin
}
