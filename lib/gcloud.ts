import { Storage } from "@google-cloud/storage";

const storage = new Storage({
    keyFilename: "./gcloud_key.json"
});

const bucketName = "sainatra";
const bucket = storage.bucket(bucketName);

interface GCloudProps {
    directory: string;
    fileName: string;
}

export const getUploadURL = async ({directory, fileName}: GCloudProps) => {
    const options = {
        version: "v4",
        action: "write",
        expires: Date.now() + 15 * 60 * 1000 // 15 minutes
    } as any;

    const file = bucket.file(`${directory}/${fileName}`);
    const [url]: any = await file.getSignedUrl(options);

    return url;
}

export const getDownloadURL = async ({directory, fileName}: GCloudProps) => {
    const options = {
        version: "v4",
        action: "read",
        expires: Date.now() + 15 * 60 * 1000 // 15 minutes
    } as any;

    const file = bucket.file(`${directory}/${fileName}`);
    const [url]: any = await file.getSignedUrl(options);

    return url;
}