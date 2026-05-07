export class CreateDeliveryDto {
  salesOrderNumber!: string;
  clientsName!: string;
  shippingAddress!: string;
  shipDate!: Date;
  contactPerson!: string;
  contactPhone!: string;
  amountReceivable!: number;
  amountActuallyReceived!: number;
  balance!: number;
  processor!: string;
  warehouseOrderNumber!: string;
  drugCode!: string;
  lumpSum!: number;
  remark!: string;

}
