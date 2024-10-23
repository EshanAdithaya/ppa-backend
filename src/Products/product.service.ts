// product.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      where: { IsActive: true },
      order: { CreatedAt: 'DESC' },
    });
  }

  async findOneById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ 
      where: { ProductID: id, IsActive: true } 
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOneById(id);
    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOneById(id);
    product.IsActive = false; // Soft delete
    await this.productRepository.save(product);
  }

  async searchProducts(search?: string, tags?: string[], minRating?: number): Promise<Product[]> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .where('product.IsActive = :isActive', { isActive: true });

    if (search) {
      queryBuilder.andWhere(
        '(LOWER(product.ProductName) LIKE LOWER(:query) OR ' +
        'LOWER(product.Brand) LIKE LOWER(:query) OR ' +
        'LOWER(product.Type) LIKE LOWER(:query))',
        { query: `%${search}%` }
      );
    }

    if (tags?.length) {
      queryBuilder.andWhere('product.Tags && ARRAY[:...tags]', { tags });
    }

    if (minRating) {
      queryBuilder.andWhere('product.Rating >= :minRating', { minRating });
    }

    return await queryBuilder
      .orderBy('product.CreatedAt', 'DESC')
      .getMany();
  }

  async updateTags(id: number, tags: string[]): Promise<Product> {
    const product = await this.findOneById(id);
    product.Tags = tags;
    return await this.productRepository.save(product);
  }

  async updateRating(id: number, rating: number): Promise<Product> {
    const product = await this.findOneById(id);
    product.Rating = rating;
    return await this.productRepository.save(product);
  }

  async updateDetails(id: number, updateData: { details?: string; description?: string }): Promise<Product> {
    const product = await this.findOneById(id);
    if (updateData.details !== undefined) product.Details = updateData.details;
    if (updateData.description !== undefined) product.Description = updateData.description;
    return await this.productRepository.save(product);
  }

  async updateFeatures(id: number, features: string[]): Promise<Product> {
    const product = await this.findOneById(id);
    product.Features = features;
    return await this.productRepository.save(product);
  }
}