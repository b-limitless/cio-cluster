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
}

const UserService = new UserServiceLocal();

export {UserService};