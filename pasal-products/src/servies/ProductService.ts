import logger from "@pasal/common/build/logger";
import { Febric } from "../models/febric";
import { AnyKeys } from "mongoose";

export class UserServiceLocal {
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
    
    async findOneAndRemove(id:string) {
        try {
            await Febric.findOneAndUpdate({_id: id});
        } catch(err) {
            logger.log("info", `Can not find and remove document`);
            throw new Error(`Can not find and remove document`);
        }
    }

    async findOneAndUpdate(conditions:any, update:any, options:any) {
        try {
            const updated = await Febric.findOneAndUpdate(conditions, update, options)
            return updated;
        } catch(err) {
            logger.log("info", `Can not find and update`);
            throw new Error(`Can not find and update`);
        }
    }
}

const UserService = new UserServiceLocal();

export {UserService};