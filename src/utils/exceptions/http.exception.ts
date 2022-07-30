/**
 * Custom Error object that extends express
 * default error object to make error beautiful
 * to user
 */
class HttpException extends Error {
    public status: number;
    public override message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export default HttpException;
