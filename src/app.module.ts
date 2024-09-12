import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './Products/products.module'; // <-- Import the ProductsModule
import { LoggerMiddleware } from './logger.middleware';
import { LoggerController } from './logger.controller';
import { LoggerGateway } from './logger.gateway';
import { CustomLoggerService } from './custom-logger.service';
import * as dotenv from 'dotenv';

dotenv.config();

console.log({
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
});


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
           // Adjust SSL settings based on your requirement
           extra: {
            // Only include SSL settings if your server supports SSL
          //  ssl: {
          //    rejectUnauthorized: false,
          //  },
          },
    }),
    UserModule,
    AuthModule,
    ProductsModule, // <-- Add ProductsModule here
  ],
  controllers: [LoggerController],
  providers: [LoggerGateway, CustomLoggerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
