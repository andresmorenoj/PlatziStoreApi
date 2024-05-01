import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';

const API_KEY = '12345';
const API_KEY_PROD = 'PROD_12345';

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'my_db',
  password: '123a56t',
  port: 5432,
});

client.connect();
// client.query('SELECT * FROM tasks', (err, res) => {
//   if (err) console.log(err);

//   if (res) console.log(res.rows);
// });

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useValue: client,
    },
  ],
  exports: ['API_KEY', 'PG'],
})
export class DatabaseModule {}
