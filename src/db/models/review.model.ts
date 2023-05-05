import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Point,
  ManyToOne,
} from 'typeorm';
import { isps } from './isp.model';

@Entity()
export class Reviews {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  review: string;

  @Column()
  rating: number;

  @Column({
    type: 'geometry',
  })
  geometry: Point;

  @ManyToOne(() => isps, (isps) => isps.reviews)
  isp: isps;
}
