export class ValidationError extends Error {
  statusCode: number;
  errors: string[];

  constructor(message: string, errors: string[]) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}
