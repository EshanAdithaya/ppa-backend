// review.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('reviews')
export class Review {
  @ApiProperty({ example: 1, description: 'The auto-generated ID of the review' })
  @PrimaryGeneratedColumn()
  ReviewID: number;

  @ApiProperty({ example: 'Product', description: 'The type of review' })
  @Column()
  Type: string;

  @ApiProperty({ example: 5, description: 'The count of items reviewed' })
  @Column()
  Count: number;

  @ApiProperty({ example: 'Good product', description: 'The description of the review' })
  @Column('text')
  Description: string;

  @ApiProperty({ example: 123, description: 'ID of the product being reviewed' })
  @Column()
  ProductID: number;

  @ApiProperty({ example: 456, description: 'ID of the user who created the review' })
  @Column()
  UserID: number;

  @ApiProperty({ example: 'https://example.com/images/product.jpg', description: 'The URL of the review image' })
  @Column({ nullable: true })
  ImageURL: string;

  @ApiProperty({ example: 'Thank you for your feedback', description: 'Admin replies to the review' })
  @Column('text', { nullable: true })
  Replies: string;

  @ApiProperty({ example: '2024-08-20T12:34:56.789Z', description: 'The timestamp of when the review was created' })
  @CreateDateColumn()
  CreatedAt: Date;

  @ApiProperty({ example: 1, description: 'ID of the original review if this is an update', required: false })
  @Column({ nullable: true })
  OriginalReviewID: number;

  @DeleteDateColumn()
  DeletedAt: Date;
}