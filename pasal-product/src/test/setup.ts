import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt, { sign } from 'jsonwebtoken';

declare global {
    var signin: (permissions:string[]) => string[] 
}
let mongo: any;


beforeAll(async() => {
    process.env.NODE_ENV = "test";
    process.env.JWT_KEY = 'asdf';
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    process.env.CLOUD_NAME="dun5p8e5d";
    process.env.CLOUD_API_KEY="997554415655324";
    process.env.CLOUD_API_SECRET="levxY72Vl-UeqPDDh6mydcGyw9k"

    // For cloudinary
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

beforeEach(async() => {
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async() => {
     mongo.stop();
     mongoose.connection.close();
});

global.signin = (permissions:string[]) => {
    // Build a JWT payload.  { id, email }
    const payload = {
      id: new mongoose.Types.ObjectId().toHexString(),
      email: 'test@test.com',
      permissions: permissions,
      role: 'admin',
    };
  
    // Create the JWT!
    const token = jwt.sign(payload, process.env.JWT_KEY!);
  
    // Build session Object. { jwt: MY_JWT }
    const session = { jwt: token };
  
    // Turn that session into JSON
    const sessionJSON = JSON.stringify(session);
  
    // Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');
  
    // return a string thats the cookie with the encoded data
    return [`express:sess=${base64}`];
  };



