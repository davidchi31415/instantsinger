import axios from "axios";
import prismadb from "./prismadb";

interface RunpodConvertProps {
    userId: string;
    modelId: string;
    needsSep: boolean;
    jobId: string;
}

interface RunpodCloneProps {
    userId: string;
    modelId: string;
    jobId: string;
}

interface RunpodOtherProps {
    runpodJobId: string;
}

interface PrismadbProps {
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
    userId,
    modelId,
    jobId,
    needsSep,
}: RunpodConvertProps) => {
    const response = await axios.post("https://api.runpod.ai/v2/9afi4omg7sdwt6/run", {
        "input": {   
            "arguments": {
                "input_id": userId,
                "output_id": jobId,
                "model_id": modelId,
                "needs_sep": needsSep,
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
                "vr_mixing_algorithm": "max_mag", // [min_mag, max_mag, default] 
                "vr_normalise": 1, 
                "vr_denoise": 1
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

    if (!job) return job;

    const jobData = {
        status: job.status,
        needsSep: job.needsSep,
        createdAt: job.createdAt,
        updatedAt: job.updatedAt
    }
    
    return jobData;
}

export const getConversions = async ({ userId }: PrismadbProps) => {
    const convertJobs = await prismadb.convertJob.findMany({
        where: {
            userId
        }
    });

    const convertJobsData = convertJobs.map((job) => {
        return (
            {
                status: job.status,
                needsSep: job.needsSep,
                createdAt: job.createdAt,
                updatedAt: job.updatedAt
            }
        );
    });

    return convertJobsData;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////
// Clone
////////////////////////////////////////////////////////////////////////////////////////////////////////

export const _submitCloneJob = async ({
    userId, modelId, jobId
}: RunpodCloneProps) => {
    const response = await axios.post("https://api.runpod.ai/v2/7k76ez21pt9gba/run", {
        "input": {   
            "arguments": {
                "input_id": userId,
                "model_id": modelId,
                "num_epoch": 1,
                "save_every": 150,
                "batch_size": 16,
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

    const clonesData = clones.map((clone) => {
        return ({
            name: clone.name,
            createdAt: clone.createdAt
        });
    });

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

    if (!job) return job;

    const jobData = {
        status: job.status,
        name: job.name, // Model name
        createdAt: job.createdAt,
        updatedAt: job.updatedAt
    }
    
    return jobData;
};