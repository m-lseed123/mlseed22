import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { dataSource } from '@app/common/db/datasource.config';
import { AUTH_PACKAGE_NAME } from '@app/grpc/proto/auth';
import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new HttpException(errors, HttpStatus.NOT_ACCEPTABLE);
      },
    }),
  );
  // await app.listen(3000);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      protoPath: join(__dirname, '../../../libs/grpc/src/proto/auth.proto'),
      package: AUTH_PACKAGE_NAME,
      url: 'localhost:5000',
    },
  });
  const PORT = 3001;
  const ORIGIN = '*';
  app.enableCors({ origin: ORIGIN });
  await app.startAllMicroservices();
  await app.listen(PORT);
}
bootstrap();
