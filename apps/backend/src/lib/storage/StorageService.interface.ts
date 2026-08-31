export interface IStorageService {
  uploadFile(file: Express.Multer.File, folder: string): Promise<string>;
  deleteFile(fileKey: string): Promise<void>;
  getFileUrl(fileKey: string): string;
}
