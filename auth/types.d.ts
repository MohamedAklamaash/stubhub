export interface userDetails {
    email: string;
    password: string;
}

export interface CustomErrorType {
    statusCode: number;
    reason?: string;
    serializeErrors(): {
        message: string;
        field?: string;
    }[];
}
