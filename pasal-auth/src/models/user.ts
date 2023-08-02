import mongoose from "mongoose";
import { Password } from "../utils/password";


// Creating interface
interface UserAttrs {
  email: string;
  password: string;
  role:string;
  permissions: string[];
  industry: string[];
  employeCount:number;
  targetMarket: string[];
  currentWorkFlow: string | null;
  currentSoftware: string | null;
  painPoint: string | null;
  requirements: string | null;
  tranningAndSupport: string | null;
}

// An interface descript the properties that a user document pass
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  role:string;
  permissions: string[];
  industry: string[];
  employeCount:number;
  targetMarket?: string[];
  currentWorkFlow?: string | null;
  currentSoftware?: string | null;
  painPoint?: string | null;
  requirements?: string | null;
  tranningAndSupport?: string | null;
  verified:boolean;
}

// An interface define build function is available to the model
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// Create schema
const userSchema = new mongoose.Schema(
  {
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
    industry: {
      type: [String],
      default: [],
    },
    employeeCount: {
      type: Number,
      required: true,
    },
    targetMarket: {
      type: [String],
      default: [],
    },
    currentWorkFlow: {
      type: String,
      default: null,
    },
    currentSoftware: {
      type: String,
      default: null,
    },
    painPoint: {
      type: String,
      default: null,
    },
    requirements: {
      type: String,
      default: null,
    },
    trainingAndSupport: {
      type: String,
      default: null,
    },
    verified: {
      type: Boolean, 
      default: false
    }
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

// Before saving the document just hash the password
userSchema.pre("save", async function (done) {
  // Check if password is modified
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  // Call the done function
  done();
});

// Build
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// Create mongoose model
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
export { User };
