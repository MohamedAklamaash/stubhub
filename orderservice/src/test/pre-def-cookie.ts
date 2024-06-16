// returns a cookie with the jwt
import jwt from "jsonwebtoken";

export const PreDefinedCookie = () => {
    const payload = {
        name: "Mohamed Aklamaash",
        email: "aklamaash@gmail.com",
        password: "Aklamaashehsan123%",
    };
    const token = jwt.sign(payload, process.env.JWT_KEY!);
    const session = { jwt: token };
    const sessionJSON = JSON.stringify(session);
    const base64 = Buffer.from(sessionJSON).toString("base64"); // converted into base64 to decode it into a jwt token
    return [`express:sess=${base64}`];
};
