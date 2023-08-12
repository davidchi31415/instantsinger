import axios from "axios";
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

export async function downloadFromURL (url: string, name: string) {
  await axios.get(url, { responseType: "blob" }).then((response) => {
    // create file link in browser's memory
    const href = URL.createObjectURL(response.data);

    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', name); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  });
}

export function isJobDone ({ status }: { status: string }) {
  return (status === "COMPLETED" || status === "FAILED" || status === "CANCELLED");
}

export function exclude(data, keys) {
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => !keys.includes(key))
  );
}
