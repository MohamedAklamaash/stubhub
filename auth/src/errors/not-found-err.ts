import { CustomError } from "./custom-error";

// if we need to throw an err in async func,we can do that using err
// express-async-error package makes throwing an error in an async func as an priority

export class NotfoundError extends CustomError {
    statusCode = 400;
    constructor() {
        super("Route not found");
        Object.setPrototypeOf(this, NotfoundError.prototype);
    }
    serializeErrors() {
        return [{ message: "Not Found" }];
    }
}
