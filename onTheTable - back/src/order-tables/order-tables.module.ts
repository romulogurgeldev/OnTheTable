import { OrderTable, OrderTableSchema } from './entities/order-table.entity';
import { Module } from '@nestjs/common';
import { OrderTablesService } from './order-tables.service';
import { OrderTablesController } from './order-tables.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: OrderTable.name, schema: OrderTableSchema }])],
  controllers: [OrderTablesController],
  providers: [OrderTablesService]
})
export class OrderTablesModule {}
