import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  @IsNotEmpty()
  FirstName: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  @IsNotEmpty()
  LastName: string;

  @ApiProperty({ example: '123456789', description: 'The NIC number of the user' })
  @IsNotEmpty()
  NICNumber: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  @IsEmail()
  Email: string;

  @ApiProperty({ example: '1234567890', description: 'The telephone number of the user', required: false })
  @IsOptional()
  TelephoneNo?: string;

  @ApiProperty({ example: 'password123', description: 'The password of the user' })
  @IsNotEmpty()
  Password: string;
}