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
  if (str.length > 50) {
    return str.substring(0, 25) + '...' + str.substring(str.length - 25, str.length);
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
  return (status === "COMPLETED" || status === "FAILED" || status === "CANCELLED" || status === "TIMED_OUT");
}

export function exclude(data, keys) {
  if (!data) return data;
  for (let i=0; i < keys.length; i++) delete data[keys[i]];

  return data;
}

export function parseYoutubeLink(url: string) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return (match&&match[7].length==11)? match[7] : false;
}

export function mapColor(status: string) {
  let color = "";
  switch (status) {
    case "COMPLETED":
      color = "bg-[#33ff66]/50 text-black";
      break;
    case "FAILED":
    case "TIMED_OUT":
    case "CANCELLED":
      color = "bg-destructive text-white";
      break;
    default:
      color = "bg-primary/25";
  }
  return color;
}

export function mapStatus(status: string) {
  let mappedStatus = status;
  switch (status) {
    case "NOT_SUBMITTED":
      mappedStatus = "SUBMITTING";
      break;
    case "WAITING_FOR_GPU":
      mappedStatus = "WAITING FOR GPU";
      break;
    case "IN_PROGRESS":
      mappedStatus = "IN PROGRESS";
      break;
  }
  return mappedStatus;
}