import { FilesService } from './files.service';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [
        MulterModule.register({
            dest: './uploads',

        }),],
    controllers: [
        UploadController,],
    providers: [
        UploadService, FilesService],
        exports : [UploadService]
})
export class UploadModule { }
