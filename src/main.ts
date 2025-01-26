import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
declare const module: any;

async function bootstrap() {
  // Kích hoạt ValidationPipe toàn cục
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe())

  app.use(cookieParser()); // Sử dụng cookie-parser
  await app.listen(process.env.PORT ?? 3000);


  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
