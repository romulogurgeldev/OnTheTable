import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'aws-sdk';

require('dotenv').config();

async function bootstrap() {
  config.update({
    accessKeyId: "AKIAVHOQ6K3FHYJLD26Y",
    secretAccessKey: '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',
    region: "sa-east-1"
  })
  const app = await NestFactory.create(AppModule,  { cors: {
    origin: '*',
    credentials: true,
  } });
  // app.enableCors();
  await app.listen(3000, '0.0.0.0', function () {
    console.log('listening on port 3000');
  });
}
bootstrap();
