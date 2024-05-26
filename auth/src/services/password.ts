import { scrypt, randomBytes } from "crypto";
import { promisify } from "util"; // converts callback based funcs into a promise based one
const scryptAsync = promisify(scrypt);
//scrpyt creates a buffer and it works with a callback
export class Password {
    static async toHash(password: string) {
        const salt = randomBytes(8).toString("hex");
        const buffer = (await scryptAsync(password, salt, 64)) as Buffer;
        return `${buffer.toString("hex")}.${salt}`;
    }

    static async compare(storedPassword: string, suppliedPasword: string) {
        const [hashedPassword, salt] = storedPassword.split(".");
        const buffer = (await scryptAsync(suppliedPasword, salt, 64)) as Buffer;
        return buffer.toString("hex") === hashedPassword;
    }
}
