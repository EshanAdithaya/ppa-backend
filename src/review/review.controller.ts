import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './create-review.dto';
import { UpdateReviewDto } from './update-review.dto';

@ApiTags('reviews') // Make sure the tag matches the DocumentBuilder configuration
@ApiBearerAuth()
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @ApiOperation({ summary: 'Create a new review' })
  @ApiResponse({ status: 201, description: 'The review has been created.' })
  @Post()

  createReview(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a review by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the review to fetch' })
  @ApiResponse({ status: 200, description: 'Review details.' })
  getReview(@Param('id') id: number) {
    return this.reviewService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a review by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the review to update' })
  @ApiResponse({ status: 200, description: 'The review has been updated.' })
  updateReview(@Param('id') id: number, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a review by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the review to delete' })
  @ApiResponse({ status: 200, description: 'The review has been deleted.' })
  deleteReview(@Param('id') id: number) {
    return this.reviewService.delete(id);
  }
}
