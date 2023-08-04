import logger from "../logger";
import { User } from "../models/user";

export class UserServiceLocal {
    async findOne(email:string ) {
        const existingUser = await User.findOne({ email });

        return existingUser;
    }

    async build(data:any) {
        try {
            const user =  User.build({...data});
            await user.save();
            return user;
        } catch (err:any) {
            logger.log("error", `Could not save user: ${err}`);
            throw new Error(err);
        }
    }

    async findByIdAndUpdate(id:string, update:any, options:any) {
        try {
            const updated = await User.findByIdAndUpdate(id, update, options)
            return updated;
        } catch(err) {
            logger.log("info", `Can not find and update`);
            throw new Error(`Can not find and update`);
        }
    }

    async findById(id:string) {
        try {
            const user = await User.findByIdAndUpdate(id)
            return user;
        } catch(err) {
            logger.log("info", `Can not find and update`);
            throw new Error(`Can not find and update`);
        }
    }
}

const UserService = new UserServiceLocal();

export {UserService};