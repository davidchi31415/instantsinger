import axios from "axios";
import prismadb from "./prismadb";

interface RunpodSubmitProps {
    userId: string;
    outputId: string;
    needsSep: boolean;
}

interface RunpodOtherProps {
    runpodJobId: string;
}

interface PrismadbProps {
    userId: string;
}

export const submitConvertJob = async ({
    userId,
    outputId,
    needsSep
}: RunpodSubmitProps) => {
    const response = await axios.post("https://api.runpod.ai/v2/9afi4omg7sdwt6/run", {
        "input": {   
            "arguments": {
                "input_id": userId,
                "output_id": outputId,
                "model_id": userId,
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
        }
    }, {
        "headers": {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.RUNPOD_API_KEY}`
        }
    });

    return response;
}

export const checkConvertJob = async ({ runpodJobId }: RunpodOtherProps) => {
    const response = await axios.get(`https://api.runpod.ai/v2/9afi4omg7sdwt6/status/${runpodJobId}`,
    {
        "headers": {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.RUNPOD_API_KEY}`
        }
    });

    return response;
}

export const cancelConvertJob = async ({ runpodJobId }: RunpodOtherProps) => {
    const response = await axios.post(`https://api.runpod.ai/v2/9afi4omg7sdwt6/cancel/${runpodJobId}`,
    {
        "headers": {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.RUNPOD_API_KEY}`
        }
    });

    return response;
}

export const getMostRecentConvertJob = async ({ userId }: PrismadbProps) => {
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