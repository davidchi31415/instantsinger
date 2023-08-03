import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function getFileName (str: string) {
  if (str.length > 20) {
    return str.substring(0, 10) + '...' + str.substring(str.length - 10, str.length);
  }

  return str;
}