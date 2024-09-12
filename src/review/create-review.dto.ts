import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ example: 'Product Review', description: 'Type of the review' })
  type: string;

  @ApiProperty({ example: 1, description: 'Number of reviews or rating count' })
  count: number;

  @ApiProperty({ example: 'This is a sample review', description: 'Description of the review' })
  description: string;

  @ApiProperty({ example: 'http://example.com/image.png', description: 'URL of the image' })
  imageURL: string;
}
