import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'juancmandev',
  password: 'admin123',
  database: 'local_db',
});

export default pool;
