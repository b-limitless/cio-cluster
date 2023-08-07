import logger from "@pasal/common/build/logger";
import { Febric } from "../models/febric";
import mongoose from "mongoose";

export class FebricServiceLocal {
    async findById(id:string ) {
        const existingUser = await Febric.findById(id);

        return existingUser;
    }

    async build(data:any) {
        try {
            const febric =  Febric.build({...data});
            await febric.save();
            return febric;
        } catch (err:any) {
            logger.log("error", `Could not save febric: ${err}`);
            throw new Error(err);
        }
    }
    
    async findByIdAndDelete(id:string) {
        try {
            await Febric.findByIdAndDelete(id);
        } catch(err) {
            logger.log("info", `Can not find and remove document`);
            throw new Error(`Can not find and remove document`);
        }
    }

    async findByIdAndUpdate(id:string, update:any, options:any) {
        try {
            const updated = await Febric.findByIdAndUpdate(id, update, options)
            return updated;
        } catch(err) {
            logger.log("info", `Can not find and update`);
            throw new Error(`Can not find and update`);
        }
    }

    
}

const FebricService = new FebricServiceLocal();

export { FebricService };
