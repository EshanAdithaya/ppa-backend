import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
import { Product } from './product.entity';

@ApiTags('products') // <-- This ensures the Products API is grouped under 'products' in Swagger
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'The product has been successfully created.', type: Product })
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'All products retrieved successfully.', type: [Product] })
  getAllProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully.', type: Product })
  getProductById(@Param('id') id: number): Promise<Product> {
    return this.productService.findOneById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'The product has been successfully updated.', type: Product })
  updateProduct(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, description: 'The product has been successfully deleted.' })
  deleteProduct(@Param('id') id: number): Promise<void> {
    return this.productService.remove(id);
  }
}
