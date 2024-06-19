/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from 'clsx'
import { UseFormSetError } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
// import { EntityError } from './http'
import { toast } from '../components/ui/use-toast'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface ApiError {
  message: string;
  errors?: { [key: string]: { path: string; msg: string } };
}

interface ApiError {
  message: string;
  errors?: { [key: string]: { path: string; msg: string } };
}

export const handleErrorsApi = ({
  error,
  setError,
  duration
}: {
  error: ApiError,
  setError?: UseFormSetError<any>,
  duration?: number
}) => {
  if (error.errors && setError) {
    Object.keys(error.errors).forEach((key) => {
      const item = error.errors![key]; 
      setError(item.path, {
        type: 'server',
        message: item.msg + " con cac"
      });
    });
  } else {
    toast({
      title: 'Lỗi',
      description: error?.message ?? 'Lỗi Không Xác Định',
      variant: 'destructive',
      duration: duration || 5000
    });
  }
};