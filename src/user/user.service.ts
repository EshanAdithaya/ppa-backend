import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.Password, salt);
    const user = this.userRepository.create({ ...createUserDto, Password: hashedPassword });
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { UserID: id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);

    // Update the user's fields with the new data
    Object.assign(user, updateUserDto);

    // If the password is being updated, hash it
    if (updateUserDto.Password) {
      const salt = await bcrypt.genSalt();
      user.Password = await bcrypt.hash(updateUserDto.Password, salt);
    }

    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    const user = await this.findOneById(id);
    await this.userRepository.remove(user);
  }

  async updateAccessInfo(userId: number, latestAccessTime: Date, latestIssuedBearerToken: string): Promise<User> {
    const user = await this.findOneById(userId);
    user.LatestAccessTime = latestAccessTime;
    user.LatestIssuedBearerToken = latestIssuedBearerToken;
    return this.userRepository.save(user);
  }

  // Method for updating user account status
  async updateAccountStatus(id: number, status: string): Promise<User> {
    const user = await this.findOneById(id);
    user.accountStatus = status;
    return this.userRepository.save(user);
  }
}
