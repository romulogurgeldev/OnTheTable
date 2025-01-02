import { UploadModule } from './utils/uploadFiles/upload.module';
import { AuthModule } from './auth/auth.module';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressesModule } from './Class/addresses/addresses.module';
import { AdmUsersModule } from './adm-users/adm-users.module';
import { EmployeeUsersModule } from './employee-users/employee-users.module';
import { CategoriesModule } from './categories/categories.module';
import { FoodsModule } from './foods/foods.module';
import { PromotionsModule } from './promotions/promotions.module';
import { ReservationsModule } from './reservations/reservations.module';
import { TablesModule } from './tables/tables.module';
import { OrderFoodsModule } from './order-foods/order-foods.module';
import { OrdersModule } from './orders/orders.module';
import { ClientUsersModule } from './client-users/client-users.module';
import { PlanosModule } from './planos/planos.module';
import { MulterModule } from '@nestjs/platform-express';
import { CartsModule } from './Class/carts/carts.module';
import { OrderTablesModule } from './order-tables/order-tables.module';
import { ConfigsModule } from './configs/configs.module';
import { SalesModule } from './sales/sales.module';
import { MessagesModule } from './messages/messages.module';
import { AtributosComidasModule } from './atributos-comidas/atributos-comidas.module';
import { PlanoUsersModule } from './plano-users/plano-users.module';
import { NotificationsModule } from './notifications/notifications.module';


@Module({
  imports: [
    UploadModule,
    AuthModule,
    MulterModule.register({
      dest: './uploads',

    }),
    UsersModule, RestaurantModule,
    // UsersModule, RestaurantModule, 
    // MongooseModule.forRoot('mongodb://localhost/onTheTable'), 
    MongooseModule.forRoot('mongodb+srv://felipeTable:dviYXi7lDLMro5L6@cluster0.yik6j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
    // MongooseModule.forRoot('mongodb+srv://userTable:NsJvIH4WqQOnzWwj@serverlessinstanceonthe.irk6u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'), 
    AddressesModule, AdmUsersModule, EmployeeUsersModule, CategoriesModule, FoodsModule, PromotionsModule, ReservationsModule,
    TablesModule, OrderFoodsModule, OrdersModule, ClientUsersModule, PlanosModule, CartsModule, OrderTablesModule, ConfigsModule, SalesModule, MessagesModule, AtributosComidasModule, PlanoUsersModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

// UsersModule, RestaurantModule, MongooseModule.forRoot('mongodb+srv://felipeTable:dviYXi7lDLMro5L6@cluster0.yik6j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'), AddressesModule, AdmUsersModule, EmployeeUsersModule, CategoriesModule, FoodsModule, PromotionsModule, ReservationsModule, TablesModule, OrderFoodsModule, OrdersModule, ClientUsersModule, PlanosModule],

// password NsJvIH4WqQOnzWwj 
// mongodb+srv://userTable:NsJvIH4WqQOnzWwj@serverlessinstanceonthe.irk6u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// eu
// serverless config credentials -o --provider aws --key=AKIAQYJ7YKR2B666UMCQ --secret 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
// onthetable
// serverless config credentials -o --provider aws --key=AKIAVHOQ6K3FHYJLD26Y --secret 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