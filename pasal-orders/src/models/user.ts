import mongoose from "mongoose";
interface UserAttrs {
  userId: string;
  email: string;
  password: string;
  role:string;
  permissions: string[];
  firstName: string | null;
  lastName: string | null;
  country: string | null;
  spokenLanguage: string[];
  about: string | null;
  profileImageLink: string | null; 
  verified:boolean;
}
interface UserDoc extends mongoose.Document {
  userId: string;
  email: string;
  password: string;
  role:string;
  permissions: string[];
  verified:boolean;
  firstName: string | null;
  lastName: string | null;
  country: string | null;
  spokenLanguage: string[];
  about: string | null;
  profileImageLink: string | null; 
}
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}
const userSchema = new mongoose.Schema(
  
  {
    userId: {
      type: String
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    permissions: {
      type: [String],
      default: [],
    },
    verified: {
      type: Boolean, 
      default: false
    }, 
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
    },
    spokenLanguage: {
      type: [String],
      default: [],
    },
    about: {
      type: String,
      default: null,
    },
    profileImageLink: {
      type: String,
      default: null,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
export { User };
