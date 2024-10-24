// review.controller.ts
import { Controller, Post, Get, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './create-review.dto';
import { UpdateReviewDto } from './update-review.dto';

@ApiTags('reviews')
@ApiBearerAuth()
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new review' })
  @ApiResponse({ status: 201, description: 'The review has been created.' })
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

  @Get()
  @ApiOperation({ summary: 'Get all reviews with optional filtering' })
  @ApiQuery({ name: 'productId', required: false, description: 'Filter reviews by product ID' })
  @ApiQuery({ name: 'userId', required: false, description: 'Filter reviews by user ID' })
  @ApiResponse({ status: 200, description: 'List of reviews.' })
  async getAllReviews(
    @Query('productId') productId?: number,
    @Query('userId') userId?: number,
  ) {
    if (productId) {
      return this.reviewService.findByProduct(productId);
    }
    if (userId) {
      return this.reviewService.findByUser(userId);
    }
    return this.reviewService.findAll();
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