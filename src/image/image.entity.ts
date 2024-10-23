// image.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('images')
export class Image {
  @ApiProperty({ example: 1, description: 'The auto-generated id of the image' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'example.jpg', description: 'Original filename of the image' })
  @Column()
  filename: string;

  @ApiProperty({ example: 'https://firebase.../example.jpg', description: 'Firebase Storage URL' })
  @Column()
  url: string;

  @ApiProperty({ example: 'images/example.jpg', description: 'Firebase Storage path' })
  @Column()
  path: string;

  @ApiProperty({ example: '2024-08-20T12:34:56.789Z', description: 'Upload date' })
  @CreateDateColumn()
  uploadDate: Date;
}