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
    cloneName: string;
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
    convertBackingVocals
}: RunpodConvertProps) => {
    const response = await axios.post("https://api.runpod.ai/v2/9afi4omg7sdwt6/run", {
        "input": {   
            "arguments": {
                "input_id": jobId,
                "output_id": jobId,
                "model_id": modelId,
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
            }
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

    if (convertJob && convertJob.userId !== userId) return; // Permission denied

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

    if (!job) return;
    
    return exclude(job, ["userId"]);
}

export const getSubmittedConversions = async ({ userId }: PrismadbProps) => {
    const convertJobs = await prismadb.convertJob.findMany({
        where: {
            userId,
            NOT: {
                status: "NOT_SUBMITTED"
            }
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

    if (convertJob && convertJob.userId !== userId) return; // Permission denied

    return exclude(convertJob, ["userId"]);
};

export const getConversionResults = async ({ convertJob }: GetConvertResultProps) => {
    if (!isJobDone({ status: convertJob.status })) return;
    
    const fileNames = (convertJob.hasInstrumentals || convertJob.hasBackingVocals) ?
        ["background.wav", "vocals.wav", "combined.wav"] : ["vocals.wav"];

    const urls = await Promise.all(
        fileNames.map(
            async (name) => await getDownloadURL({ directory: `inference_outputs/${convertJob.id}`, fileName: name })
        )
    );

    return { fileNames, urls, songName: convertJob.songName };
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

export const _getClone = async ({ userId, cloneName }: GetCloneProps) => {
    const clone = await prismadb.clone.findUnique({
        where: {
            userId_name: {
                userId,
                name: cloneName
            }
        }
    });

    return clone;
}

export const _getClones = async ({ userId }: GetClonesProps) => {
    const clones = await prismadb.clone.findMany({
        where: {
            userId
        }
    });

    return clones;
};

//////////////////////////////////////////////
// For User Data - mask out sensitive IDs
//////////////////////////////////////////////

export const getClones = async ({ userId }: GetClonesProps) => {
    const clones = await prismadb.clone.findMany({
        where: {
            userId
        }
    });

    const clonesData = clones.map((clone) => exclude(clone, ["userId"]));

    return clonesData;
};

export const getMostRecentCloneJob = async ({ userId }: PrismadbProps) => {
    const job = await prismadb.cloneJob.findFirst({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    if (!job) return;
    
    return exclude(job, ["userId"]);
};

export const getCurrentClones = async ({ userId }) => {
    const cloneJobs = await prismadb.cloneJob.findMany({
        where: {
            userId,
            OR: [
                { status: "IN_QUEUE" },
                { status: "IN_PROGRESS" }
            ]
        }
    });

    const cloneJobsData = cloneJobs.map((job) => exclude(job, ["userId"]));

    return cloneJobsData;
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