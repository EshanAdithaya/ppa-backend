import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'The image URL of the product', required: false })
  @IsOptional()
  ProductImage?: string;

  @ApiProperty({ example: 'Product Name', description: 'The name of the product', required: false })
  @IsOptional()
  ProductName?: string;

  @ApiProperty({ example: 'Brand X', description: 'The brand of the product', required: false })
  @IsOptional()
  Brand?: string;

  @ApiProperty({ example: 'Type Y', description: 'The type of the product', required: false })
  @IsOptional()
  Type?: string;

  @ApiProperty({ example: 100, description: 'The price of the product', required: false })
  @IsOptional()
  Price?: number;

  @ApiProperty({ example: 50, description: 'The quantity of the product', required: false })
  @IsOptional()
  Quantity?: number;

  @ApiProperty({ example: '2024-08-20T12:34:56.789Z', description: 'The order placed date of the product', required: false })
  @IsOptional()
  OrderPlacedDate?: Date;
}
