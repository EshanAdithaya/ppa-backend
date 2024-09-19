import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';
import { OTP } from './otp.entity';
import { LoginDto } from './login.dto';
import { CreateUserDto } from './auth.user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(OTP)
    private otpRepository: Repository<OTP>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { Email: email } });
    if (user && (await bcrypt.compare(pass, user.Password))) {
      return user;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.Email, sub: user.UserID, role: user.Role };
    const accessToken = this.jwtService.sign(payload);
    // Update user with latest access time and bearer token
    user.LatestAccessTime = new Date();
    user.LatestIssuedBearerToken = accessToken;
    await this.userRepository.save(user);
    return { accessToken };
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { Email, Password, NICNumber } = createUserDto;
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({ where: { Email } });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(Password, 10);
    // Create new user entity
    const newUser = this.userRepository.create({
      ...createUserDto,
      Password: hashedPassword, // store the hashed password
    });
    return this.userRepository.save(newUser);
  }

  async generatePasswordResetOTP(email: string): Promise<{ otp: string; expiresAt: Date }> {
    const user = await this.userRepository.findOne({ where: { Email: email } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

    const otpEntity = this.otpRepository.create({
      email,
      otp,
      expiresAt,
    });
    await this.otpRepository.save(otpEntity);

    return { otp, expiresAt };
  }

  async verifyPasswordResetOTP(email: string, otp: string): Promise<boolean> {
    const otpEntity = await this.otpRepository.findOne({
      where: { email, otp },
      order: { createdAt: 'DESC' },
    });

    if (!otpEntity) {
      return false;
    }

    const now = new Date();
    if (otpEntity.expiresAt < now) {
      return false;
    }

    return true;
  }

  async resetPassword(email: string, otp: string, newPassword: string): Promise<void> {
    const otpEntity = await this.otpRepository.findOne({
      where: { email, otp },
      order: { createdAt: 'DESC' },
    });

    if (!otpEntity) {
      throw new BadRequestException('Invalid OTP');
    }

    const now = new Date();
    if (otpEntity.expiresAt < now) {
      throw new BadRequestException('Expired OTP');
    }

    const user = await this.userRepository.findOne({ where: { Email: email } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.Password = hashedPassword;
    await this.userRepository.save(user);

    // Remove the used OTP
    await this.otpRepository.remove(otpEntity);
  }
}