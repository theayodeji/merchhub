import { IStorageService } from './StorageService.interface';
import { S3StorageService } from './S3StorageService';

let storageService: IStorageService;

const provider = process.env.STORAGE_PROVIDER || 'r2';

if (provider === 'r2') {
  storageService = new S3StorageService({
    bucketName: process.env.R2_BUCKET_NAME || '',
    publicUrl: process.env.R2_PUBLIC_URL || '',
    endpoint: process.env.R2_ENDPOINT || '',
    region: 'auto', // R2 uses auto region
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  });
} else if (provider === 's3') {
  storageService = new S3StorageService({
    bucketName: process.env.S3_BUCKET_NAME || '',
    publicUrl: process.env.S3_PUBLIC_URL || '',
    region: process.env.S3_REGION || 'us-east-1',
    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
  });
} else {
  // If you ever add Cloudinary:
  // } else if (provider === 'cloudinary') {
  //   storageService = new CloudinaryStorageService({...})
  // }
  throw new Error(`Unsupported STORAGE_PROVIDER: ${provider}. Check your .env file.`);
}

export { storageService };
export type { IStorageService };
