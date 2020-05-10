import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MasterModule } from './modules/master/master.module';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './filter/http-error.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ChangeRequestPayload } from './middlewares/changeRequestPayload.middleware';

const Filter = [{
  provide: APP_FILTER,
  useClass: HttpErrorFilter
}];

const Interceptor = [{
  provide: APP_INTERCEPTOR,
  useClass: LoggingInterceptor
}];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `./src/environment/${process.env.NODE_ENV}.env`,
      ],
    }),
    TypeOrmModule.forRoot(),
    MasterModule,
    CoreModule
  ],
  controllers: [AppController],
  providers: [AppService,...Filter,...Interceptor
],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ChangeRequestPayload).forRoutes('example');
  }
}
