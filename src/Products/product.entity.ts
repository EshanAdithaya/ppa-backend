// product.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('products')
export class Product {
  @ApiProperty({ example: 1, description: 'The auto-generated id of the product' })
  @PrimaryGeneratedColumn()
  ProductID: number;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'The product image URL' })
  @Column()
  ProductImage: string;

  @ApiProperty({ example: 'Product Name', description: 'The name of the product' })
  @Column()
  ProductName: string;

  @ApiProperty({ example: 'Brand X', description: 'The brand of the product' })
  @Column()
  Brand: string;

  @ApiProperty({ example: 'supplement', description: 'The type of the product' })
  @Column()
  Type: string;

  @ApiProperty({ example: 100, description: 'The price of the product' })
  @Column('decimal', { precision: 10, scale: 2 })
  Price: number;

  @ApiProperty({ example: 50, description: 'The quantity of the product' })
  @Column()
  Quantity: number;

  @ApiProperty({ example: ['Protein', 'Post-Workout'], description: 'Product tags' })
  @Column('simple-array', { nullable: true })
  Tags: string[];

  @ApiProperty({ example: 4.5, description: 'Product rating' })
  @Column('decimal', { precision: 3, scale: 1, default: 0 })
  Rating: number;

  @ApiProperty({ example: '30 servings', description: 'Product details' })
  @Column({ nullable: true })
  Details: string;

  @ApiProperty({ example: 'Ultimate pre-workout formula...', description: 'Product description' })
  @Column('text', { nullable: true })
  Description: string;

  @ApiProperty({ example: ['Feature 1', 'Feature 2'], description: 'Product features' })
  @Column('simple-array', { nullable: true })
  Features: string[];

  @ApiProperty({ description: 'Date when the product was created' })
  @CreateDateColumn()
  CreatedAt: Date;

  @ApiProperty({ description: 'Date when the product was last updated' })
  @UpdateDateColumn()
  UpdatedAt: Date;

  @ApiProperty({ description: 'Date when the order was placed' })
  @Column({ nullable: true })
  OrderPlacedDate: Date;

  @ApiProperty({ description: 'Indicates if the product is active' })
  @Column({ default: true })
  IsActive: boolean;
}