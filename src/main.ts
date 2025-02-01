import * as compression from '@fastify/compress';
import fastifyCsrf from '@fastify/csrf-protection';
import helmet from '@fastify/helmet';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { constants } from 'zlib';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors();

  //@ts-ignore
  await app.register(fastifyCsrf);
  //@ts-ignore
  await app.register(helmet);
  //@ts-ignore
  await app.register(compression, {
    brotliOptions: { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } },
  });

  await app.listen(process.env.PORT ?? 8080);
}

bootstrap().catch(console.error);
