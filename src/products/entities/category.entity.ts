import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 235, unique: true })
  name: string;
}
