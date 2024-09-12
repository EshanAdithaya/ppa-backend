import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';
import { LoginDto } from './login.dto';
import { CreateUserDto } from './auth.user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
}
