import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../user/user.entity';
import { OTP } from './otp.entity';
import { EmailSenderService } from '../EmailSender/email-sender.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, OTP]),
    PassportModule,
    JwtModule.register({
      secret: 'your_jwt_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, EmailSenderService],
  controllers: [AuthController],
})
export class AuthModule {}