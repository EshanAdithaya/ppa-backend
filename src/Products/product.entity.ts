import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('products')
export class Product {
  @ApiProperty({ example: 1, description: 'The auto-generated id of the product' })
  @PrimaryGeneratedColumn()
  ProductID: number;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'The URL of the product image' })
  @Column()
  ImageURL: string;

  @ApiProperty({ example: 'Gold Standard Whey Protein', description: 'The title of the product' })
  @Column()
  Title: string;

  @ApiProperty({ example: 'Gold', description: 'The brand of the product' })
  @Column()
  Brand: string;

  @ApiProperty({ example: 'supplement', description: 'The type of the product' })
  @Column()
  Type: 'supplement' | 'equipment';

  @ApiProperty({ example: 11000, description: 'The price of the product' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Price: number;

  @ApiProperty({ example: '2024-08-20T12:34:56.789Z', description: 'The timestamp of when the product was created' })
  @CreateDateColumn()
  CreatedAt: Date;
}
