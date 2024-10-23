// product.controller.ts
import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  Param, 
  Put, 
  Delete, 
  UseGuards,
  Query,
  ParseIntPipe,
  HttpStatus,
  ValidationPipe,
  Patch
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
  ApiProperty,
  ApiBody
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
import { Product } from './product.entity';
import { AuthGuard } from '@nestjs/passport';

class ProductResponseDto extends Product {
  @ApiProperty({ example: ['Protein', 'Post-Workout'], description: 'Product tags' })
  Tags: string[];

  @ApiProperty({ example: 4.5, description: 'Product rating' })
  Rating: number;

  @ApiProperty({ example: '30 servings', description: 'Product details' })
  Details: string;

  @ApiProperty({ example: 'Ultimate pre-workout formula...', description: 'Product description' })
  Description: string;

  @ApiProperty({ example: ['Feature 1', 'Feature 2'], description: 'Product features' })
  Features: string[];
}

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new product with all details' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'The product has been successfully created.',
    type: ProductResponseDto
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid input data.'
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Unauthorized access.'
  })
  create(
    @Body(new ValidationPipe()) createProductDto: CreateProductDto
  ): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products with filters' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'All products retrieved successfully.',
    type: [ProductResponseDto]
  })
  @ApiQuery({ 
    name: 'search', 
    required: false, 
    description: 'Search query string' 
  })
  @ApiQuery({ 
    name: 'tags', 
    required: false, 
    description: 'Filter by tags (comma-separated)',
    type: String
  })
  @ApiQuery({ 
    name: 'minRating', 
    required: false, 
    description: 'Minimum rating filter',
    type: Number
  })
  async getAllProducts(
    @Query('search') search?: string,
    @Query('tags') tags?: string,
    @Query('minRating') minRating?: number
  ): Promise<Product[]> {
    const tagArray = tags?.split(',');
    const ratingNum = minRating ? parseFloat(minRating.toString()) : undefined;
    return this.productService.searchProducts(search, tagArray, ratingNum);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID with all details' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Product retrieved successfully.',
    type: ProductResponseDto
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Product not found.'
  })
  getProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.findOneById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update all product details' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'The product has been successfully updated.',
    type: ProductResponseDto
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Product not found.'
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Unauthorized access.'
  })
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateProductDto: UpdateProductDto
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Patch(':id/tags')
  @ApiOperation({ summary: 'Update product tags' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        tags: {
          type: 'array',
          items: { type: 'string' },
          example: ['Protein', 'Post-Workout']
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Tags updated successfully',
    type: ProductResponseDto
  })
  async updateTags(
    @Param('id', ParseIntPipe) id: number,
    @Body('tags') tags: string[]
  ): Promise<Product> {
    return this.productService.updateTags(id, tags);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Patch(':id/rating')
  @ApiOperation({ summary: 'Update product rating' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        rating: {
          type: 'number',
          example: 4.5
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Rating updated successfully',
    type: ProductResponseDto
  })
  async updateRating(
    @Param('id', ParseIntPipe) id: number,
    @Body('rating') rating: number
  ): Promise<Product> {
    return this.productService.updateRating(id, rating);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Patch(':id/details')
  @ApiOperation({ summary: 'Update product details and description' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        details: {
          type: 'string',
          example: '30 servings'
        },
        description: {
          type: 'string',
          example: 'Ultimate pre-workout formula...'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Details updated successfully',
    type: ProductResponseDto
  })
  async updateDetails(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: { details?: string; description?: string }
  ): Promise<Product> {
    return this.productService.updateDetails(id, updateData);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Patch(':id/features')
  @ApiOperation({ summary: 'Update product features' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        features: {
          type: 'array',
          items: { type: 'string' },
          example: ['Feature 1', 'Feature 2']
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Features updated successfully',
    type: ProductResponseDto
  })
  async updateFeatures(
    @Param('id', ParseIntPipe) id: number,
    @Body('features') features: string[]
  ): Promise<Product> {
    return this.productService.updateFeatures(id, features);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a product' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'The product has been successfully deleted.'
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Product not found.'
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Unauthorized access.'
  })
  deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productService.remove(id);
  }
}