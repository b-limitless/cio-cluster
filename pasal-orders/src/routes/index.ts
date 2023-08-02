import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/orders/v1', async(req: Request, res: Response) => {
    res.send('Order');
});

export { router as orderIndexRouter };