export abstract class CustomError extends Error {
    abstract statusCode: number;
  
    constructor(message: string, public field?: string) {
      super(message);
      // Set the prototype to the class constructor
      Object.setPrototypeOf(this, CustomError.prototype);
    }
  
    abstract serializeErrors(): { message: string; field?: string }[];
  }