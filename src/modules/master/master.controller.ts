import { Controller, Get, Query, UsePipes, Req } from '@nestjs/common';
import { ExampleService } from './master.service';
import { UserData } from './entities/user.entity';
import { User } from 'src/decorators/user.decorator';
import { ExampleDto } from './dto/example.dto';
import { UpperCasePipe } from 'src/pipes/upperCase.pipe';

@Controller('example')
export class ExampleController {
  private logData;  
  constructor(private services: ExampleService) {
      // this.logData = new log('exampleController');
    }
  @Get()
  async findAll(@Query('id',new UpperCasePipe()) id: any, @Req() req ,@User() user: any ): Promise<UserData []> {
    console.log( user,'>>>>>>',id,req.user);
    return this.services.findAll();
  }

  @Get('/arr')
  async findOne(@Query('id',new UpperCasePipe()) id: any, @Req() req ,@User() user: any ): Promise<UserData []> {
    console.log( user,'>>>>>>',id,req.user);
    return this.services.findOne('user');
  }

}
