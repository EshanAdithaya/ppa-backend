import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'John', description: 'The first name of the user', required: false })
  @IsOptional()
  FirstName?: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user', required: false })
  @IsOptional()
  LastName?: string;

  @ApiProperty({ example: '123456789', description: 'The NIC number of the user', required: false })
  @IsOptional()
  NICNumber?: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user', required: false })
  @IsEmail()
  @IsOptional()
  Email?: string;

  @ApiProperty({ example: '1234567890', description: 'The telephone number of the user', required: false })
  @IsOptional()
  TelephoneNo?: string;

  @ApiProperty({ example: 'password123', description: 'The password of the user', required: false })
  @IsOptional()
  Password?: string;

  @ApiProperty({ example: 'admin', description: 'The role of the user', required: false })
  @IsOptional()
  Role?: string;
}
