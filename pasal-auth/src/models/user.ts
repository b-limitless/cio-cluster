import mongoose from "mongoose";
import { Password } from "../utils/password";


// Creating interface
interface UserAttrs {
  email: string;
  password: string;
  role:string;
  permissions: string[];
  industry: string[];
  // employeCount:number;
  // targetMarket: string[];
  // currentWorkFlow: string | null;
  // currentSoftware: string | null;
  // painPoint: string | null;
  // requirements: string | null;
  // tranningAndSupport: string | null;
  firstName: string | null;
  lastName: string | null;
  country: string | null;
  spokenLanguage: string[];
  about: string | null;
  profileImageLink: string | null; 
}

// An interface descript the properties that a user document pass
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  role:string;
  permissions: string[];
  // industry: string[];
  // employeCount:number;
  // targetMarket?: string[];
  // currentWorkFlow?: string | null;
  // currentSoftware?: string | null;
  // painPoint?: string | null;
  // requirements?: string | null;
  // tranningAndSupport?: string | null;
  verified:boolean;
  firstName: string | null;
  lastName: string | null;
  country: string | null;
  spokenLanguage: string[];
  about: string | null;
  profileImageLink: string | null; 
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
    // industry: {
    //   type: [String],
    //   default: [],
    // },
    // employeeCount: {
    //   type: Number,
    //   required: true,
    // },
    // targetMarket: {
    //   type: [String],
    //   default: [],
    // },
    // currentWorkFlow: {
    //   type: String,
    //   default: null,
    // },
    // currentSoftware: {
    //   type: String,
    //   default: null,
    // },
    // painPoint: {
    //   type: String,
    //   default: null,
    // },
    // requirements: {
    //   type: String,
    //   default: null,
    // },
    // trainingAndSupport: {
    //   type: String,
    //   default: null,
    // },
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
