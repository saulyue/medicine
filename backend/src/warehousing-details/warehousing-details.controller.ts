import { Controller, Get, Post, Body, Patch, Param, Delete ,Query} from '@nestjs/common';
import { WarehousingDetailsService } from './warehousing-details.service';
import { CreateWarehousingDetailDto } from './dto/create-warehousing-detail.dto';
import { UpdateWarehousingDetailDto } from './dto/update-warehousing-detail.dto';

@Controller('warehousing')
export class WarehousingDetailsController {
  constructor(private readonly warehousingDetailsService: WarehousingDetailsService) {}

  @Post()
  create(@Body() createWarehousingDetailDto: CreateWarehousingDetailDto) {
    return this.warehousingDetailsService.create(createWarehousingDetailDto);
  }

  @Get()
  findAll( @Query() params: any) {
    return this.warehousingDetailsService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.warehousingDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWarehousingDetailDto: UpdateWarehousingDetailDto) {
    return this.warehousingDetailsService.update(+id, updateWarehousingDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.warehousingDetailsService.remove(+id);
  }
}
