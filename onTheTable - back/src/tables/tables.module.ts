import { NotificationsModule } from './../notifications/notifications.module';
import { Table, TableSchema } from './entities/table.entity';
import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Table.name, schema: TableSchema }]), NotificationsModule],
  controllers: [TablesController],
  providers: [TablesService],
  exports: [TablesService],
})
export class TablesModule {}
