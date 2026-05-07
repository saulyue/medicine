import { PartialType } from '@nestjs/mapped-types';
import { CreateWarehousingDetailDto } from './create-warehousing-detail.dto';

export class UpdateWarehousingDetailDto extends PartialType(CreateWarehousingDetailDto) {}
