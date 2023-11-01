import express from 'express';
import {currentUser, requireAuth} from '@pasal/common';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { User } from '../models/user';
import logger from '../logger';


const router = express.Router();


router.get('/api/users/currentuser',  requireAuth, currentUser, (req, res) => {
  //!req.session || !req.session.jwt is equal to
  res.send({currentUser: req.currentUser || null});
});

// Get user by it
router.get('/api/users/:id', requireAuth, async(req: Request, res:Response) => {
  let id:string|mongoose.Types.ObjectId = '';

   const userId = req.params.id;
   id = new mongoose.Types.ObjectId(userId);
   
   

  try {
    const user = await User.findOne({_id: id}).populate('permissions');
    res.send(user);
  } catch (err:any) {
    logger.log('error', `Can not find user ${err}`);
    throw new Error(err);
  }
})

export { router as currentUserRouter };
