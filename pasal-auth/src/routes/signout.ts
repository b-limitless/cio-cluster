import { requireAuth } from '@pasal/common';
import express, {Request, Response} from 'express';

const router = express.Router();

router.get('/api/users/signout', requireAuth, async(req:Request, res:Response) => {
    req.session = null;
    res.send({});
});

export {router as signoutRouter};