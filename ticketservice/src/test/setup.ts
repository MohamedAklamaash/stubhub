import { MongoMemoryServer } from "mongodb-memory-server"; // helps multiple mongodb run in dev mode in same host at same time
import mongoose from "mongoose";

//avaliable only in test env
declare global {
    let getAuthCookieAfterSignUp: () => Promise<string>;
}

//global.getAuthCookieAfterSignUp() helps us access that function

let mongo: MongoMemoryServer;
beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const mongouri = mongo.getUri();
    await mongoose.connect(mongouri);
});

//reset all the data inside mongo db
beforeEach(async () => {
    process.env.JWT_KEY = "Aklamaash123%";
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
});
