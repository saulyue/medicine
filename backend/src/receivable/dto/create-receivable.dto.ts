export class CreateReceivableDto {
  paymentDate!:Date;
  clientsName!:string;
  contactPerson!:string;
  contactPhone!:string;
  amountReceivable!:number;
  amountActuallyReceived!:number;
  balance!:number;
  processor!:string;
  remark!:string;
}
