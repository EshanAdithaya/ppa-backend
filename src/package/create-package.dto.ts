import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePackageDto {
  @ApiProperty({ example: '1 Month', description: 'The duration of the package' })
  @IsNotEmpty()
  Duration: string;

  @ApiProperty({ example: 'Gym Access', description: 'The type of the package' })
  @IsNotEmpty()
  Type: string;

  @ApiProperty({ example: 100, description: 'The price of the package' })
  @IsNotEmpty()
  Price: number;

  @ApiProperty({ example: 'Basic Plan', description: 'The name of the package' })
  @IsNotEmpty()
  Name: string;

  @ApiProperty({ example: 'Access to gym equipment and locker', description: 'The features of the package' })
  @IsNotEmpty()
  Features: string;
}
