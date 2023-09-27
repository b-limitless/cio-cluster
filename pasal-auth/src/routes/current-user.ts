import express from "express";
import {currentUser, requireAuth} from '@pasal/common';


const router = express.Router();


router.get("/api/users/currentuser",  requireAuth, currentUser, (req, res) => {
  //!req.session || !req.session.jwt is equal to
  res.send({currentUser: req.currentUser || null});
});

export { router as currentUserRouter };
