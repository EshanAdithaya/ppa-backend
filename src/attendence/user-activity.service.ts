import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserActivity } from './user-activity.entity';
import { CreateUserActivityDto } from './create-user-activity.dto';

@Injectable()
export class UserActivityService {
  constructor(
    @InjectRepository(UserActivity)
    private userActivityRepository: Repository<UserActivity>,
  ) {}

  async create(createUserActivityDto: CreateUserActivityDto): Promise<UserActivity> {
    const activity = this.userActivityRepository.create({
      user_id: createUserActivityDto.userId,
    });
    return this.userActivityRepository.save(activity);
  }

  async findAll(): Promise<UserActivity[]> {
    return this.userActivityRepository.find();
  }
}
