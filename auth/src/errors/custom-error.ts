
// this is an abstract class that defines how a custom err should be (it is similar to an interface)
// this abstracts all the similar structure classes into a same kind of instance
export abstract class CustomError extends Error {
    abstract statusCode: number;
    constructor(message:string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }
    abstract serializeErrors(): {
        message: string;
        field?: string;
    }[];
}
