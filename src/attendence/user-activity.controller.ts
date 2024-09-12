import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserActivityService } from './user-activity.service';
import { CreateUserActivityDto } from './create-user-activity.dto';
import { UserActivity } from './user-activity.entity';

@ApiTags('user-activity')
@Controller('user-activity')
export class UserActivityController {
  constructor(private readonly userActivityService: UserActivityService) {}

  @Post()
  @ApiOperation({ summary: 'Record user activity' })
  @ApiResponse({
    status: 201,
    description: 'The user activity has been successfully recorded.',
    type: UserActivity,
  })
  create(@Body() createUserActivityDto: CreateUserActivityDto): Promise<UserActivity> {
    return this.userActivityService.create(createUserActivityDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user activities' })
  @ApiResponse({
    status: 200,
    description: 'All user activities retrieved successfully.',
    type: [UserActivity],
  })
  getAll(): Promise<UserActivity[]> {
    return this.userActivityService.findAll();
  }
}
    