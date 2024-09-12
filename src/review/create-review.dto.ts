import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ example: 'Product', description: 'The type of review' })
  type: string;

  @ApiProperty({ example: 5, description: 'The count of items reviewed' })
  count: number;

  @ApiProperty({ example: 'Good product', description: 'The description of the review' })
  description: string;

  @ApiProperty({ example: 'http://example.com/image.jpg', description: 'The URL of the image' })
  imageURL?: string; // Optional
}
