import { Response } from 'express';

type ApiResponse = {
  success: boolean;
  message?: string;
  data?: any;
};

export const sendSuccess = (res: Response, data: any, statusCode = 200) => {
  const response: ApiResponse = {
    success: true,
    data
  };
  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  message = 'Something went wrong',
  statusCode = 500
) => {
  const response: ApiResponse = {
    success: false,
    message
  };
  return res.status(statusCode).json(response);
};
