import { Module } from '@nestjs/common';
import { ConfigsService } from './configs.service';
import { ConfigsController } from './configs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Config, ConfigSchema } from './entities/config.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Config.name, schema: ConfigSchema }])],
  controllers: [ConfigsController],
  providers: [ConfigsService]
})
export class ConfigsModule {}
