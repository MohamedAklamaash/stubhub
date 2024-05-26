import { Request, Response } from "express";

//jwt is set as a cookie here
export const signOut = (req: Request, res: Response) => {
    req.session = null;
    return res.send({});
};
