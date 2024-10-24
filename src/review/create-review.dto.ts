// create-review.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ example: 'Product', description: 'The type of review' })
  type: string;

  @ApiProperty({ example: 5, description: 'The count of items reviewed' })
  count: number;

  @ApiProperty({ example: 'Good product', description: 'The description of the review' })
  description: string;

  @ApiProperty({ example: 123, description: 'ID of the product being reviewed' })
  productId: number;

  @ApiProperty({ example: 456, description: 'ID of the user creating the review' })
  userId: number;

  @ApiProperty({ 
    example: 'https://example.com/images/product.jpg', 
    description: 'URL of the review image',
    required: false 
  })
  imageURL?: string;
}