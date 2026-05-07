import { Controller, Get,Post, Query, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Render('home')
  @Get()
  public index(@Query('name') name?: string) {
    return { name };
  }

  @Post('/stock/getStocks')
  public about() {
    return {"name":123111};
  }
}
