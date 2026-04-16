const { Worker } = require('bullmq');

const connection = { host: process.env.REDIS_HOST || 'redis', port: Number(process.env.REDIS_PORT || 6379) };

new Worker('invoice-processing', async (job) => {
  console.log('[worker] processing job', job.id, job.name, job.data);
  return { processedAt: new Date().toISOString() };
}, { connection });

console.log('Worker started');
