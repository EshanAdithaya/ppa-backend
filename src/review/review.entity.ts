import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
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

  @ApiProperty({ example: 'http://example.com/image.jpg', description: 'The URL of the image' })
  @Column({ nullable: true })
  ImageURL: string;

  @ApiProperty({ example: 'Thank you for your feedback', description: 'Admin replies to the review' })
  @Column('text', { nullable: true })
  Replies: string;

  @ApiProperty({ example: '2024-08-20T12:34:56.789Z', description: 'The timestamp of when the review was created' })
  @CreateDateColumn()
  CreatedAt: Date;
}
