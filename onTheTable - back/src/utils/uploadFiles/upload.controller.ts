import { UploadService } from './upload.service';
import { imageFilter } from './file.helper';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { BadRequestException, Controller, Get, Param, Post, Req, Res, UploadedFile, UseInterceptors, Delete } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import { ApiConsumes } from '@nestjs/swagger';
import { Express } from 'express';


const getStream = require('get-stream');
const multer = require('multer');


@Controller()
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}
    @Post('/upload')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('image', {
        storage: multer.memoryStorage(),
        fileFilter: imageFilter
    }))
    uploadFile(@UploadedFile() image: Express.Multer.File, @Req() req: any){
        if (!image || req.fileValidationError){
            throw new BadRequestException('invalid file provided, [images files allowed]')

        }
        const buffer = image.buffer;
        // const stream = getStream(image.buffer);
        console.log(image)
        return this.uploadService.addAvatar(buffer, image.originalname, image.mimetype);

    }
  
    @Delete('/upload/:key')
    seeUploadFile(@Param('key') key){
      return this.uploadService.delete(key);
    }
}






