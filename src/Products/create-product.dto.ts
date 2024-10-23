// create-product.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsArray, IsOptional, Min, IsUrl, MaxLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'Product image URL' })
  @IsNotEmpty()
  @IsUrl()
  ProductImage: string;

  @ApiProperty({ example: 'Product Name', description: 'Product name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  ProductName: string;

  @ApiProperty({ example: 'Brand X', description: 'Product brand' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  Brand: string;

  @ApiProperty({ example: 'supplement', description: 'Product type' })
  @IsNotEmpty()
  @IsString()
  Type: string;

  @ApiProperty({ example: 100, description: 'Product price' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  Price: number;

  @ApiProperty({ example: 50, description: 'Product quantity' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  Quantity: number;

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
}