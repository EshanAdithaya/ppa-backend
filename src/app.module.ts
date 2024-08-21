import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './logger.middleware';
import { LoggerController } from './logger.controller';
import { LoggerGateway } from './logger.gateway';
import { CustomLoggerService } from './custom-logger.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'srv657.hstgr.io',
      port: 3306,
      username: 'u304157271_eshan',
      password: 'sRdWRawFB_WgBt9',
      database: 'u304157271_ppa',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [LoggerController],
  providers: [LoggerGateway, CustomLoggerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
