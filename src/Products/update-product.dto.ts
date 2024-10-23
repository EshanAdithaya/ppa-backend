// update-product.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsUrl, IsArray, Min, MaxLength } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'Product image URL', required: false })
  @IsOptional()
  @IsUrl()
  ProductImage?: string;

  @ApiProperty({ example: 'Product Name', description: 'Product name', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  ProductName?: string;

  @ApiProperty({ example: 'Brand X', description: 'Product brand', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  Brand?: string;

  @ApiProperty({ example: 'supplement', description: 'Product type', required: false })
  @IsOptional()
  @IsString()
  Type?: string;

  @ApiProperty({ example: 100, description: 'Product price', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  Price?: number;

  @ApiProperty({ example: 50, description: 'Product quantity', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  Quantity?: number;

  @ApiProperty({ example: ['Protein', 'Post-Workout'], description: 'Product tags', required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  Tags?: string[];

  @ApiProperty({ example: 4.5, description: 'Product rating', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  Rating?: number;

  @ApiProperty({ example: '30 servings', description: 'Product details', required: false })
  @IsOptional()
  @IsString()
  Details?: string;

  @ApiProperty({ example: 'Ultimate pre-workout formula...', description: 'Product description', required: false })
  @IsOptional()
  @IsString()
  Description?: string;

  @ApiProperty({ example: ['Feature 1', 'Feature 2'], description: 'Product features', required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  Features?: string[];

  @ApiProperty({ example: '2024-08-20T12:34:56.789Z', description: 'Order placed date', required: false })
  @IsOptional()
  OrderPlacedDate?: Date;

  @ApiProperty({ description: 'Product active status', required: false })
  @IsOptional()
  IsActive?: boolean;
}