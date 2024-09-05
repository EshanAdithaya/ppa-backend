// user.service.ts
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<{ user: Partial<User>; barerToken: string }> {
    this.logger.log(`Creating new user with email: ${createUserDto.Email}`);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.Password, salt);

    // Generate bearer token
    const barerToken = this.generateBearerToken(createUserDto.Email);
    this.logger.debug(`Generated Bearer Token: ${barerToken}`);

    const user = this.userRepository.create({
      ...createUserDto,
      Password: hashedPassword,
      BarerToken: barerToken,
      BarerTokenGeneratedAt: new Date(),
    });

    this.logger.debug('User before save:', JSON.stringify(user, null, 2));

    const savedUser = await this.userRepository.save(user);

    this.logger.debug('Saved User:', JSON.stringify(savedUser, null, 2));

    // Remove sensitive information before returning
    const { Password, ...userResponse } = savedUser;

    return { user: userResponse, barerToken };
  }

  async findAll(): Promise<User[]> {
    this.logger.log('Fetching all users');
    return this.userRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    this.logger.log(`Fetching user with ID: ${id}`);
    const user = await this.userRepository.findOne({ where: { UserID: id } });
    if (!user) {
      this.logger.warn(`User with ID ${id} not found`);
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    this.logger.log(`Updating user with ID: ${id}`);
    const user = await this.findOneById(id);

    // If password is being updated, hash it
    if (updateUserDto.Password) {
      const salt = await bcrypt.genSalt();
      updateUserDto.Password = await bcrypt.hash(updateUserDto.Password, salt);
    }

    // Update the user's fields with the new data
    Object.assign(user, updateUserDto);

    const updatedUser = await this.userRepository.save(user);
    this.logger.debug('Updated User:', JSON.stringify(updatedUser, null, 2));

    return updatedUser;
  }

  private generateBearerToken(email: string): string {
    const payload = { email };
    const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key';
    const options = { expiresIn: '1h' };
    return jwt.sign(payload, secretKey, options);
  }
}