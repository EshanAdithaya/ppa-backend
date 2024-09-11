import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsOptional, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'The URL of the product image' })
  @IsNotEmpty()
  @IsString()
  ImageURL: string;

  @ApiProperty({ example: 'Gold Standard Whey Protein', description: 'The title of the product' })
  @IsNotEmpty()
  @IsString()
  Title: string;

  @ApiProperty({ example: 'Gold', description: 'The brand of the product' })
  @IsNotEmpty()
  @IsString()
  Brand: string;

  @ApiProperty({ example: 'supplement', description: 'The type of the product', enum: ['supplement', 'equipment'] })
  @IsNotEmpty()
  @IsString()
  Type: 'supplement' | 'equipment';

  @ApiProperty({ example: 11000, description: 'The price of the product' })
  @IsNotEmpty()
  @IsNumber()
  Price: number;
}