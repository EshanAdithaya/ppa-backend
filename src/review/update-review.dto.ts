import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateReviewDto {
  @ApiProperty({ example: 'Product', description: 'The type of the review', required: false })
  @IsOptional()
  Type?: string;

  @ApiProperty({ example: 5, description: 'The count of items reviewed', required: false })
  @IsOptional()
  Count?: number;

  @ApiProperty({ example: 'Good product', description: 'The description of the review', required: false })
  @IsOptional()
  Description?: string;

  @ApiProperty({ example: 'http://example.com/image.jpg', description: 'The URL of the image', required: false })
  @IsOptional()
  ImageURL?: string;

  @ApiProperty({ example: 'Thanks for the feedback!', description: 'Admin replies to the review', required: false })
  @IsOptional()
  Replies?: string;
}
