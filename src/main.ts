import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());
  app.use(helmet());
  app.enableCors();
  app.useGlobalInterceptors(new LoggingInterceptor());
  const options = new DocumentBuilder()
  .setTitle('API DOC')
  .setDescription('API Document')
  .setVersion('1.0')
  .addTag('API')
  .build();
const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api', app, document);
  await app.listen(3000);
  console.log(process.env.NODE_ENV);
}
bootstrap().then(ele => {setTimeout(() => {
  console.log(process.env.DATABASE_USER)
}, 5000); })
