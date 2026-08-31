import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { IStorageService } from './StorageService.interface';
import crypto from 'crypto';
import path from 'path';

export interface S3Config {
  bucketName: string;
  publicUrl: string;
  endpoint?: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export class S3StorageService implements IStorageService {
  private client: S3Client;
  private bucketName: string;
  private publicUrl: string;

  constructor(config: S3Config) {
    this.bucketName = config.bucketName;
    this.publicUrl = config.publicUrl;
    
    this.client = new S3Client({
      region: config.region,
      endpoint: config.endpoint,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
  }

  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    const ext = path.extname(file.originalname);
    const uuid = crypto.randomUUID();
    const fileName = `${folder}/${Date.now()}-${uuid}${ext}`;
    
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.client.send(command);
    
    // Return just the path/key to store in the database
    return fileName;
  }

  async deleteFile(fileKey: string): Promise<void> {
    // If someone accidentally passes a full URL, try to extract the key
    const key = fileKey.startsWith(this.publicUrl) 
      ? fileKey.replace(`${this.publicUrl}/`, '') 
      : fileKey;
      
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    await this.client.send(command);
  }
  
  getFileUrl(fileKey: string): string {
    return `${this.publicUrl}/${fileKey}`;
  }
}
