import { Controller, Post, Body, Get, Param, Put, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'All users retrieved successfully.',
    type: [User],
  })
  getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully.',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.findOneById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id);
  }

  // New PATCH endpoint for updating account status
  @Patch(':id/account-status')
  @ApiOperation({ summary: 'Update user account status' })
  @ApiResponse({
    status: 200,
    description: 'User account status updated successfully.',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async updateAccountStatus(
    @Param('id') id: number,
    @Body('accountStatus') accountStatus: string,
  ): Promise<User> {
    return this.userService.updateAccountStatus(id, accountStatus);
  }

  // New endpoint for marking the account as "Deleted"
  @Delete(':id/status/delete')
  @ApiOperation({ summary: 'Mark user account as Deleted' })
  @ApiResponse({
    status: 200,
    description: 'User account status marked as Deleted.',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async markAsDeleted(@Param('id') id: number): Promise<User> {
    return this.userService.updateAccountStatus(id, 'Deleted');
  }
}
