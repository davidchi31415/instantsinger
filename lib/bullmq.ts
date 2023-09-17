import { Queue } from 'bullmq';

declare global {
    var convertWebhookQueue: Queue | undefined;
    var cloneWebhookQueue: Queue | undefined;
}

export const convertWebhookQueue = globalThis.convertWebhookQueue || new Queue("convert webhook",
    { 
        connection: {
            host: process.env.UPSTASH_REDIS_HOST,
            port: parseInt(process.env.UPSTASH_REDIS_PORT as string),
            password: process.env.UPSTASH_REDIS_PASSWORD,
            // tls: {}
        }
    }
);

export const cloneWebhookQueue = globalThis.cloneWebhookQueue || new Queue("clone webhook",
    { 
        connection: {
            host: process.env.UPSTASH_REDIS_HOST,
            port: parseInt(process.env.UPSTASH_REDIS_PORT as string),
            password: process.env.UPSTASH_REDIS_PASSWORD,
            // tls: {}
        }
    }
);

if (process.env.NODE_ENV !== "production") globalThis.convertWebhookQueue = convertWebhookQueue;
if (process.env.NODE_ENV !== "production") globalThis.cloneWebhookQueue = cloneWebhookQueue;