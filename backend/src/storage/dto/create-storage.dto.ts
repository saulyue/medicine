export class CreateStorageDto {
  warehouseOrderNumber!:string;
  storageDate!:Date;
  supplierName!:string;
  contactPerson!:string;
  contactPhone!:string;
  processor!:string;
  remark!:string;
  amountsPayable!:number;
  theAmountActuallyPaid!:number;
  acceptanceConclusion!:string;
}
