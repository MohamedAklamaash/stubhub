
declare namespace NodeJS {
    interface Global {
        getAuthCookieAfterSignUp: () => Promise<string>;
    }
}
