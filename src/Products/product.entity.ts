import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('products')
export class Product {
  @ApiProperty({ example: 1, description: 'The auto-generated id of the product' })
  @PrimaryGeneratedColumn()
  ProductID: number;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'The image URL of the product' })
  @Column()
  ProductImage: string;

  @ApiProperty({ example: 'Product Name', description: 'The name of the product' })
  @Column()
  ProductName: string;

  @ApiProperty({ example: 'Brand X', description: 'The brand of the product' })
  @Column()
  Brand: string;

  @ApiProperty({ example: 'Type Y', description: 'The type of the product' })
  @Column()
  Type: string;

  @ApiProperty({ example: 100, description: 'The price of the product' })
  @Column()
  Price: number;

  @ApiProperty({ example: 50, description: 'The quantity of the product' })
  @Column()
  Quantity: number;

  @ApiProperty({ example: '2024-08-20T12:34:56.789Z', description: 'The order placed date of the product' })
  @CreateDateColumn()
  OrderPlacedDate: Date;
}
