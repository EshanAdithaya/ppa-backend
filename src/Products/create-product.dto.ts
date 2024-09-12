import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'The image URL of the product' })
  @IsNotEmpty()
  ProductImage: string;

  @ApiProperty({ example: 'Product Name', description: 'The name of the product' })
  @IsNotEmpty()
  ProductName: string;

  @ApiProperty({ example: 'Brand X', description: 'The brand of the product' })
  @IsNotEmpty()
  Brand: string;

  @ApiProperty({ example: 'Type Y', description: 'The type of the product' })
  @IsNotEmpty()
  Type: string;

  @ApiProperty({ example: 100, description: 'The price of the product' })
  @IsNotEmpty()
  Price: number;

  @ApiProperty({ example: 50, description: 'The quantity of the product' })
  @IsNotEmpty()
  Quantity: number;

  @ApiProperty({ example: '2024-08-20T12:34:56.789Z', description: 'The order placed date of the product' })
  @IsOptional()
  OrderPlacedDate?: Date;
}