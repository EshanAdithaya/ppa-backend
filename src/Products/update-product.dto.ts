import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'The URL of the product image', required: false })
  @IsOptional()
  @IsString()
  ImageURL?: string;

  @ApiProperty({ example: 'Gold Standard Whey Protein', description: 'The title of the product', required: false })
  @IsOptional()
  @IsString()
  Title?: string;

  @ApiProperty({ example: 'Gold', description: 'The brand of the product', required: false })
  @IsOptional()
  @IsString()
  Brand?: string;

  @ApiProperty({ example: 'supplement', description: 'The type of the product', required: false, enum: ['supplement', 'equipment'] })
  @IsOptional()
  @IsString()
  Type?: 'supplement' | 'equipment';

  @ApiProperty({ example: 11000, description: 'The price of the product', required: false })
  @IsOptional()
  @IsNumber()
  Price?: number;
}
