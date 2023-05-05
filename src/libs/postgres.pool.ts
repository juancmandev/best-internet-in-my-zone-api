import { DataSource } from 'typeorm';
import { Reviews } from '../db/models/review.model';
import { isps } from '../db/models/isp.model';
import dotenv from 'dotenv';

dotenv.config();

const ELEPHANTSQL_URL = process.env.ELEPHANTSQL_URL;

const dataSource = new DataSource({
  type: 'postgres',
  url: ELEPHANTSQL_URL,
  entities: [Reviews, isps],
  synchronize: true,
});

export default dataSource;
