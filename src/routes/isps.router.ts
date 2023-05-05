import express, { Request, Response } from 'express';
import { validateIspCreate } from '../middlewares/validate.middleware';
import { IspService } from '../services/isp.service';

const ispRouter = express.Router();
const ispService = new IspService();

ispRouter
  .route('/')
  .post(validateIspCreate, async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const newIsp = await ispService.create(body);

      res.status(201).json(newIsp);
    } catch (error) {
      if (error instanceof Error)
        res.status(500).json({ error: error.message });
    }
  })
  .put(async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const { country } = body;
      const isps = await ispService.findAll(country);

      res.status(200).json(isps);
    } catch (error) {
      if (error instanceof Error)
        res.status(500).json({ error: error.message });
    }
  });
// .delete(async (req: Request, res: Response) => {
//   try {
//     const body = req.body;
//     const id = body.id;

//     await ispService.delete(id);

//     res.status(200).json({ message: 'ISP deleted' });
//   } catch (error) {
//     if (error instanceof Error)
//       res.status(500).json({ error: error.message });
//   }
// });

export default ispRouter;
