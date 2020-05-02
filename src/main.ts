import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './global.middleware';

var cors = require('cors');
const helmet = require('helmet');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.use(helmet());
  app.use(logger);
  await app.listen(3000);
}
bootstrap();
