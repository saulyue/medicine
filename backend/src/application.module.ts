import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicineModule } from './medicine/medicine.module';
import { OrderModule } from './order/order.module';
import { SupplierModule } from './supplier/supplier.module';
import { AddressModule } from './address/address.module';
import { StorageModule } from './storage/storage.module';
import { DeliveryModule } from './delivery/delivery.module';
import { InventoryModule } from './inventory/inventory.module';
import { ReceivableModule } from './receivable/receivable.module';
import { PayableModule } from './payable/payable.module';
import { WarehousingDetailsModule } from './warehousing-details/warehousing-details.module';
import { ClientsModule } from './clients/clients.module';
import { SalesDetailsModule } from './sales-details/sales-details.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { StaffModule } from './staff/staff.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: ["error"]
    }),
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
        conf: { useFilesystemPublicRoutes: false },
      }),
    ),
    UserModule,
    MedicineModule,
    OrderModule,
    SupplierModule,
    AddressModule,
    StorageModule,
    DeliveryModule,
    InventoryModule,
    ReceivableModule,
    PayableModule,
    WarehousingDetailsModule,
    ClientsModule,
    SalesDetailsModule,
    ManufacturerModule,
    StaffModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
