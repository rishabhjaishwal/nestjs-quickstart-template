import { Module } from '@nestjs/common';
import { ExampleController } from './master.controller';
import { ExampleService } from './master.service';
import { UserData } from './entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
      TypeOrmModule.forFeature([
          UserData,
  ]),
],
  controllers: [ExampleController],
  providers: [ExampleService]
})
export class MasterModule {}
