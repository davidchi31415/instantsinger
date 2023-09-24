import axios from "axios";
import prismadb from "./prismadb";
import { getDownloadURL } from "./gcloud";
import { exclude, isJobDone } from "./utils";

interface RunpodConvertProps {
    modelId: string;
    hasInstrumentals: boolean;
    hasBackingVocals: boolean;
    convertBackingVocals: boolean;
    jobId: string;
    youtubeId?: string;
}

interface RunpodCloneProps {
    modelId: string;
    jobId: string;
}

interface RunpodOtherProps {
    runpodJobId: string;
}

interface PrismadbProps {
    userId: string;
}

interface GetConvertResultProps {
    convertJob: any;
}

interface GetConversionProps {
    userId: string;
    conversionId: string;
}

interface GetConversionsProps {
    userId: string;
}

interface GetCloneProps {
    userId: string;
}

interface GetClonesProps {
    userId: string;
}

// NAMING CONVENTION - `_` prepended to function means that it should never be returned to frontend data

////////////////////////////////////////////////////////////////////////////////////////////////////////
// Convert
////////////////////////////////////////////////////////////////////////////////////////////////////////

export const _submitConvertJob = async ({
    modelId,
    jobId,
    hasInstrumentals,
    hasBackingVocals,
    convertBackingVocals,
    youtubeId
}: RunpodConvertProps) => {
    const params = {
        "output_id": jobId,
        "model_id": modelId,
        "youtube_id": youtubeId ? youtubeId : "",
        "has_instruments": hasInstrumentals,
        "has_backing_vocals": hasBackingVocals,
        "convert_backing_vocals": convertBackingVocals,
        "transpose": 0,
        "pitch_extraction_algorithm": "mangio-crepe",
        "search_feature_ratio": 0.66,
        "filter_radius": 3,
        "resample_output": 0,
        "volume_envelope": 0.21,
        "voiceless_protection": 0.33,
        "hop_len": 120,
        "vr_chunks": 55,
        "vr_shifts": 5,
        "vr_demucs": "off",
        "vr_mixing_algorithm": "default", // [min_mag, max_mag, default] 
        "vr_normalise": 1, 
        "vr_denoise": 0
    };

    if (!youtubeId) params["input_id"] = jobId;

    const response = await axios.post("https://api.runpod.ai/v2/9afi4omg7sdwt6/run", {
        "input": {   
            "arguments": params
        },
        "webhook": `${process.env.NEXT_PUBLIC_APP_URL}/api/convert/webhook?id=${jobId}`
    }, {
        "headers": {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.RUNPOD_API_KEY}`
        }
    });

    return response;
}

export const _checkConvertJob = async ({ runpodJobId }: RunpodOtherProps) => {
    const response = await axios.get(`https://api.runpod.ai/v2/9afi4omg7sdwt6/status/${runpodJobId}`,
    {
        "headers": {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.RUNPOD_API_KEY}`
        }
    });

    return response;
}

export const _cancelConvertJob = async ({ runpodJobId }: RunpodOtherProps) => {
    const response = await axios.post(`https://api.runpod.ai/v2/9afi4omg7sdwt6/cancel/${runpodJobId}`,
    {
        "headers": {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.RUNPOD_API_KEY}`
        }
    });

    return response;
}

export const _getMostRecentConvertJob = async ({ userId }: PrismadbProps) => {
    const job = await prismadb.convertJob.findFirst({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return job;
}

export const _getConversions = async ({ userId }: PrismadbProps) => {
    const convertJobs = await prismadb.convertJob.findMany({
        where: {
            userId
        }
    });

    return convertJobs;
};

export const _getConversion = async ({ userId, conversionId }: GetConversionProps) => {
    const convertJob = await prismadb.convertJob.findUnique({
        where: {
            id: conversionId
        }
    });

    if (convertJob && convertJob.userId !== userId) return null; // Permission denied

    return convertJob;
};

export const _getConversionPublic = async ({ conversionId }) => {
    const convertJob = await prismadb.convertJob.findUnique({
        where: {
            id: conversionId
        }
    });

    return convertJob;
};

//////////////////////////////////////////////
// For User Data - mask out sensitive IDs
//////////////////////////////////////////////

export const getMostRecentConvertJob = async ({ userId }: PrismadbProps) => {
    const job = await prismadb.convertJob.findFirst({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    if (!job) return null;
    
    return exclude(job, ["userId"]);
}

export const getSubmittedConversions = async ({ userId }: PrismadbProps) => {
    const convertJobs = await prismadb.convertJob.findMany({
        where: {
            userId,
            NOT: {
                status: "NOT_SUBMITTED"
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const convertJobsData = convertJobs.map((job) => exclude(job, ["userId"]));

    return convertJobsData;
};

export const getConversions = async ({ userId }: PrismadbProps) => {
    const convertJobs = await prismadb.convertJob.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const convertJobsData = convertJobs.map((job) => exclude(job, ["userId"]));

    return convertJobsData;
};

export const getCompletedConversions = async ({ userId }: PrismadbProps) => {
    const convertJobs = await prismadb.convertJob.findMany({
        where: {
            userId,
            NOT: {
                OR: [
                    { status: "IN_QUEUE" },
                    { status: "IN_PROGRESS" },
                    { status: "NOT_SUBMITTED"}
                ]
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const convertJobsData = convertJobs.map((job) => exclude(job, ["userId"]));

    return convertJobsData;
};

export const getCurrentConversions = async ({ userId }: GetConversionsProps) => {
    const convertJobs = await prismadb.convertJob.findMany({
        where: {
            userId,
            OR: [
                { status: "IN_QUEUE" },
                { status: "IN_PROGRESS" }
            ]
        }
    });

    const convertJobsData = convertJobs.map((job) => exclude(job, ["userId"]));

    return convertJobsData;
};

export const getConversion = async ({ userId, conversionId }: GetConversionProps) => {
    const convertJob = await prismadb.convertJob.findUnique({
        where: {
            id: conversionId
        }
    });

    if (convertJob && convertJob.userId !== userId) return null; // Permission denied

    return exclude(convertJob, ["userId"]);
};

export const getConversionResults = async ({ convertJob }: GetConvertResultProps) => {
    if (!isJobDone({ status: convertJob.status })) return null;

    if (convertJob.status === "FAILED") {
        return exclude(convertJob, ["userId"]);
    }
    
    const fileName = "combined.wav";
    const url = await getDownloadURL({ directory: `inference_outputs/${convertJob.id}`, fileName });

    return { fileName, url, songName: convertJob.songName, public: convertJob.public, id: convertJob.id };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
// Clone
////////////////////////////////////////////////////////////////////////////////////////////////////////

export const _submitCloneJob = async ({
    modelId, jobId
}: RunpodCloneProps) => {
    const response = await axios.post("https://api.runpod.ai/v2/7k76ez21pt9gba/run", {
        "input": {   
            "arguments": {
                "input_id": jobId,
                "model_id": modelId,
                "num_epoch": 75,
                "save_every": 150,
                "batch_size": 8,
                "pitch_extraction_algorithm": "mangio-crepe",
                "sample_rate": "40k",
                "hop_len": 128
            }
        },
        "webhook": `${process.env.NEXT_PUBLIC_APP_URL}/api/clone/webhook?id=${jobId}`
    }, {
        "headers": {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.RUNPOD_API_KEY}`
        }
    });

    return response;
}

export const _checkCloneJob = async ({ runpodJobId }: RunpodOtherProps) => {
    const response = await axios.get(`https://api.runpod.ai/v2/7k76ez21pt9gba/status/${runpodJobId}`,
    {
        "headers": {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.RUNPOD_API_KEY}`
        }
    });

    return response;
}

export const _cancelCloneJob = async ({ runpodJobId }: RunpodOtherProps) => {
    const response = await axios.post(`https://api.runpod.ai/v2/7k76ez21pt9gba/cancel/${runpodJobId}`,
    {
        "headers": {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.RUNPOD_API_KEY}`
        }
    });

    return response;
}

export const _getMostRecentCloneJob = async ({ userId }: PrismadbProps) => {
    const job = await prismadb.cloneJob.findFirst({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    
    return job;
}

export const _getClone = async ({ userId }: GetCloneProps) => {
    const clone = await prismadb.clone.findUnique({
        where: {
            userId
        }
    });

    return clone;
}

//////////////////////////////////////////////
// For User Data - mask out sensitive IDs
//////////////////////////////////////////////

export const getClone = async ({ userId }) => {
    const clone = await prismadb.clone.findUnique({
        where: {
            userId
        }
    });

    const cloneData = exclude(clone, ["userId"]);
    return cloneData;
}

export const getCurrentCloneJob = async ({ userId }: PrismadbProps) => {
    const job = await prismadb.cloneJob.findFirst({
        where: {
            userId,
            OR: [
                { status: "IN_QUEUE" },
                { status: "IN_PROGRESS" },
                { status: "SUBMITTED" }
            ]
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    if (!job) return null;
    
    return exclude(job, ["userId"]);
}

export const getMostRecentCloneJob = async ({ userId }: PrismadbProps) => {
    const job = await prismadb.cloneJob.findFirst({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    if (!job) return null;
    
    return exclude(job, ["userId"]);
};

export const getCloneJob = async ({ cloneJobId }) => {
    const job = await prismadb.cloneJob.findUnique({
        where: {
            id: cloneJobId,
        }
    });

    if (!job) return null;
    
    return exclude(job, ["userId"]);
}

export const getCurrentUnsubmittedCloneJob = async ({ userId }) => {
    const unsubmittedCloneJob = await prismadb.cloneJob.findFirst({
        where: {
            userId,
            status: "NOT_SUBMITTED"
        }
    });

    return unsubmittedCloneJob;
}

export const getCloneResults = async ({ clone }) => {
    const fileNames = [`${clone.id}/sample_1.wav`, `${clone.id}/sample_2.wav`, `${clone.id}/sample_3.wav`];

    const urls = await Promise.all(
        fileNames.map(
            async (name) => await getDownloadURL({ directory: "inference_outputs", fileName: name })
        )
    );

    return { fileNames, urls };
}