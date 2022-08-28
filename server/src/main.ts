import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { CLIENT_URL, PORT } = process.env;
  app.use(helmet());
  app.use(cookieParser());
  app.enableCors({
    origin: CLIENT_URL,
    credentials: true,
  });
  await app.listen(PORT, () => console.log(`Server on ${PORT}`));
}
bootstrap();
