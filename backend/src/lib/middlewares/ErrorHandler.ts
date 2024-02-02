import { AxiosError } from 'axios';

export class ErrorHandler extends Error {
  config: any;
  response: any;
  isAxiosError: boolean;
  constructor(message: string, axiosError: AxiosError) {
    super(message);

    this.stack = axiosError.stack;
    this.config = axiosError.config;
    this.response = axiosError.response;
    this.isAxiosError = axiosError.isAxiosError;
  }
}
