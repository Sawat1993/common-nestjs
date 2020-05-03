import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { accessLogStream } from './global.middleware';
var morgan = require('morgan');
var cors = require('cors');
var helmet = require('helmet');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('v1');
  app.use(cors());
  app.use(helmet());
  app.use(morgan('combined', { stream: accessLogStream }));
  await app.listen(3000);
}
bootstrap();
