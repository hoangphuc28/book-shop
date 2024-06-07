import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AboutPage extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  content: string
  constructor(partial: Partial<AboutPage>) {
    super()
    Object.assign(this, partial)
  }

}
