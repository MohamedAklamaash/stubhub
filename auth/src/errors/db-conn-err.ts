import { CustomErrorType } from "../../types";
import { CustomError } from "./custom-error";

export class DatabaseConnError extends CustomError implements CustomErrorType {
    reason = "Error connecting to database";
    statusCode = 500;
    constructor() {
        super("Error connecting the DB");
        Object.setPrototypeOf(this, DatabaseConnError.prototype);
    }

    serializeErrors() {
        return [{ message: this.reason }];
    }
}
