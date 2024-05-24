import { ValidationError } from "express-validator";
import { CustomErrorType } from "../../types";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError implements CustomErrorType {
    statusCode = 400;
    constructor(public errors: ValidationError[]) {
        super("Invalid credentials");
        // obj.setproto makes all the props of both the base class and the extending class available within an object
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeErrors() {
        return this.errors.map((error) => {
            if (error.type === "field") {
                return { message: error.msg, field: error.path };
            }
            return { message: error.msg };
        });
    }
}
