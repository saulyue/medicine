export class CreateWarehousingDetailDto {
  warehouseOrderNumber: string | undefined;
  drugCode!:string| undefined;
  productionDate!:Date;
  validityPeriod!:Date;
  inboundQuantity!:number;
  purchasePrice!:number;
  lumpSum!:number
}
