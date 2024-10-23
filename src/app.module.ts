import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './Products/products.module';
import { LoggerMiddleware } from './logger.middleware';
import { LoggerController } from './logger.controller';
import { LoggerGateway } from './logger.gateway';
import { CustomLoggerService } from './custom-logger.service';
import { EmailSenderModule } from './EmailSender/email-sender.module';
import { UserActivityModule } from './attendence/user-activity.module';
import { ReviewModule } from './review/review.module';
import { PackagesModule } from './package/packages.module';
import { ImageModule } from './image/image.module'; // Add this import
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Load environment variables
dotenv.config();

// Log DB configuration (for debugging purposes)
console.log({
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
});

@Module({
  imports: [
    // Database connection configuration using environment variables
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Use false in production
      extra: {
        // Uncomment and configure SSL if required
        // ssl: {
        //   rejectUnauthorized: false,
        // },
      },
    }),
    UserModule,
    AuthModule,
    ProductsModule,
    EmailSenderModule,
    UserActivityModule,
    ReviewModule,
    PackagesModule,
    ImageModule, // Add the ImageModule here
  ],
  controllers: [AppController, LoggerController],
  providers: [AppService, LoggerGateway, CustomLoggerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}