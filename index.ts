import 'reflect-metadata';
import dataSource from './src/libs/postgres.pool';
import express, { Request, Response } from 'express';
import cors from 'cors';
import routerApi from './src/routes/routerApi';
import dotenv from 'dotenv';

dotenv.config();

dataSource
  .initialize()
  .then(async () => {
    const app = express();
    const port = process.env.PORT || 8080;
    console.log(port);

    const whitelist = [
      'http://localhost:3000',
      'https://the-best-internet-in-my-zone.vercel.app',
    ];
    const options = {
      origin: (origin: any, callback: any) => {
        if (whitelist.includes(origin) || !origin) callback(null, true);
        else callback(new Error('Not allowed by CORS'));
      },
    };

    app.use(express.json());
    app.use(cors(options));

    app.get('/', (req: Request, res: Response) => {
      res.send('This is the REST API of the app');
    });

    routerApi(app);

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.error(err));
