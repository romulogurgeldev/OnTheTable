import { FilesService } from './files.service';
/*
https://docs.nestjs.com/providers#services
*/
require('dotenv').config();
import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
    constructor(private readonly filesService: FilesService){

    }
    
    public async addAvatar(imageBuffer: Buffer, filename: string, contentType: string){
        return this.filesService.uploadFile(imageBuffer, filename, contentType)
    }
    public async delete(key: string){
        return this.filesService.deleteFile(key);
    }
}
