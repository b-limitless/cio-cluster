import express, { Request, Response } from 'express';
import { Febric } from "../models/febric";

const router = express.Router();
const limit = 20;

// Need to implment api for filtering, pagination
// ?type=[shirt,pants,etc]
router.get("/api/products/v1", async(req: Request, res:Response) => {
    const {page} = req.query || 0;
    const filters = JSON.parse(req.query.filters as string);

    const filterQuery:any = {};

    Object.keys(filters).map((key) => {
        if(filters[key].length > 0) {
            filterQuery[key] = {$in: filters[key]};
        }
        
    });
   
    const affectedRows = await Febric.countDocuments({});
    const febrics = await Febric.find(filterQuery, {}).skip(Number(page) * limit).limit(limit);
    res.send({febrics, affectedRows});
});

export { router as indexProductRouter };