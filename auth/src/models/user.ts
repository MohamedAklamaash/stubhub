import mongoose from "mongoose";
import { userDetails } from "../../types";
import { Password } from "../services/password";

interface UserModel extends mongoose.Model<userDoc> {
    build(atrrs: userDetails): userDoc;
}

interface userDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.statics.build = (attr: userDetails) => {
    return new User(attr);
};

// arrow func dont' work in pre
userSchema.pre("save", async function (done) {
    if (this.isModified("password")) {
        const hashedPassword = await Password.toHash(this.get("password"));
        this.set("password", hashedPassword);
    }
    done()
});
// model<document,schema>
export const User = mongoose.model<userDoc, UserModel>("User", userSchema);
