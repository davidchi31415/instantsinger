import { MAX_FILE_SIZE } from "@/lib/constants";
import { Storage } from "@google-cloud/storage";

const key = JSON.parse(process.env.GCLOUD_KEY!);
const storageOptions = {
    projectId: key.projectId,
    credentials: {
          client_email: key.client_email,
          private_key: key.private_key
    }
};
const storage = new Storage(storageOptions);

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
        extensionHeaders: {
            "x-goog-content-length-range": `0,${MAX_FILE_SIZE}`,
        },
        expires: Date.now() + 60 * 60 * 1000 // 1 hour
    } as any;

    const file = bucket.file(`${directory}/${fileName}`);
    const [url]: any = await file.getSignedUrl(options);

    return url;
}

export const getDownloadURL = async ({directory, fileName}: GCloudProps) => {
    const options = {
        version: "v4",
        action: "read",
        expires: Date.now() + 120 * 60 * 1000 // 2 hours
    } as any;

    const file = bucket.file(`${directory}/${fileName}`);
    const [url]: any = await file.getSignedUrl(options);

    return url;
}

export const checkFileExists = async ({directory, fileName}: GCloudProps) => {
    const file = bucket.file(`${directory}/${fileName}`);

    let exists = false;

    await file.exists().then((data) => {
        exists = data[0];
    });

    return exists;
}

export const getFileList = async ({ directory }) => {
    const res = await bucket.getFiles({ prefix: directory, autoPaginate: false });

    const fileNames = res[0]
                    .filter(blob => blob && blob !== null)
                    .map(file => file.name.split("/").at(-1));

    return { fileNames };
}

export const deleteFile = async ({ directory, fileName }) => {
    const file = bucket.file(`${directory}/${fileName}`);

    try {
        await file.delete();
        return true;
    } catch (error) {
        console.log(`Tried to delete file ${directory}/${fileName} but failed`, error);
        return false;
    }
}