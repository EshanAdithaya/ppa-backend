import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserActivityDto {
  @ApiProperty({ example: 1, description: 'ID of the user' })
  @IsNotEmpty()
  userId: number;
}
