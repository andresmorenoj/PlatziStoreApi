import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column('text')
  description: string;

  @Column('int')
  price: number;

  @Column('int')
  stock: number;

  @Column('varchar')
  image: string;
}
