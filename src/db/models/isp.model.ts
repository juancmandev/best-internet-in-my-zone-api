import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reviews } from './review.model';

@Entity()
export class isps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  urlImage: string;

  @Column()
  availableIn: string;

  @OneToMany(() => Reviews, (review) => review.isp)
  reviews: Reviews[];
}
