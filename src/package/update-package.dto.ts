import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdatePackageDto {
  @ApiProperty({ example: '1 Month', description: 'The duration of the package', required: false })
  @IsOptional()
  Duration?: string;

  @ApiProperty({ example: 'Gym Access', description: 'The type of the package', required: false })
  @IsOptional()
  Type?: string;

  @ApiProperty({ example: 100, description: 'The price of the package', required: false })
  @IsOptional()
  Price?: number;

  @ApiProperty({ example: 'Basic Plan', description: 'The name of the package', required: false })
  @IsOptional()
  Name?: string;

  @ApiProperty({ example: 'Access to gym equipment and locker', description: 'The features of the package', required: false })
  @IsOptional()
  Features?: string;
}
