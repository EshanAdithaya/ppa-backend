import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './Products/products.module'; // <-- Import the ProductsModule
import { LoggerMiddleware } from './logger.middleware';
import { LoggerController } from './logger.controller';
import { LoggerGateway } from './logger.gateway';
import { CustomLoggerService } from './custom-logger.service';
import { EmailSenderModule } from './EmailSender/email-sender.module'; // Import the EmailSenderModule
import * as dotenv from 'dotenv';

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
      port: parseInt(process.env.DB_PORT, 10), // Ensure port is an integer
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Path to entity files
      synchronize: true, // Use false in production to avoid accidental schema sync
      extra: {
        // Uncomment and configure SSL if required
        // ssl: {
        //   rejectUnauthorized: false,
        // },
      },

    }),

    // Import feature modules
    UserModule,
    AuthModule,

    ProductsModule, // <-- Add ProductsModule here

    EmailSenderModule, // Include the EmailSenderModule for handling email APIs

  ],
  
  // Register controllers and services
  controllers: [LoggerController],
  providers: [LoggerGateway, CustomLoggerService],
})
export class AppModule implements NestModule {
  // Apply LoggerMiddleware globally
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Logs all incoming requests
  }
}
