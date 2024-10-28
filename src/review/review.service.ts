// review.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, LessThan } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewDto } from './create-review.dto';
import { UpdateReviewDto } from './update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const review = this.reviewRepository.create({
      Type: createReviewDto.type,
      Count: createReviewDto.count,
      Description: createReviewDto.description,
      ProductID: createReviewDto.productId,
      UserID: createReviewDto.userId,
      ImageURL: createReviewDto.imageURL,
      Replies: '',
    });
    return this.reviewRepository.save(review);
  }

  async findAll(): Promise<Review[]> {
    return this.reviewRepository.find({
      where: { DeletedAt: IsNull() },
      order: { CreatedAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { ReviewID: id, DeletedAt: IsNull() },
    });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found.`);
    }
    return review;
  }

  private async checkReviewPermissions(review: Review, userId: number): Promise<void> {
    if (review.UserID !== userId) {
      throw new ForbiddenException('You can only modify your own reviews');
    }

    const now = new Date();
    const createdAt = new Date(review.CreatedAt);
    const hoursSinceCreation = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
    const daysSinceCreation = hoursSinceCreation / 24;

    if (daysSinceCreation > 3) {
      throw new ForbiddenException('Reviews cannot be modified after 3 days');
    }
  }

  async update(id: number, updateReviewDto: UpdateReviewDto, userId: number): Promise<Review> {
    const review = await this.findOne(id);
    await this.checkReviewPermissions(review, userId);

    const hoursSinceCreation = (new Date().getTime() - new Date(review.CreatedAt).getTime()) / (1000 * 60 * 60);
    if (hoursSinceCreation > 24) {
      throw new ForbiddenException('Reviews can only be updated within 24 hours of creation');
    }

    // Create a new review entry with reference to the original
    const updatedReview = this.reviewRepository.create({
      Type: updateReviewDto.type !== undefined ? updateReviewDto.type : review.Type,
      Count: updateReviewDto.count !== undefined ? updateReviewDto.count : review.Count,
      Description: updateReviewDto.description !== undefined ? updateReviewDto.description : review.Description,
      ImageURL: updateReviewDto.imageURL !== undefined ? updateReviewDto.imageURL : review.ImageURL,
      ProductID: review.ProductID,
      UserID: review.UserID,
      OriginalReviewID: review.OriginalReviewID || review.ReviewID,
      Replies: review.Replies,
    });

    // Soft delete the old review
    await this.reviewRepository.softDelete(id);

    // Save the new review
    return this.reviewRepository.save(updatedReview);
  }

  async delete(id: number, userId: number): Promise<void> {
    const review = await this.findOne(id);
    await this.checkReviewPermissions(review, userId);

    const hoursSinceCreation = (new Date().getTime() - new Date(review.CreatedAt).getTime()) / (1000 * 60 * 60);
    if (hoursSinceCreation > 72) {
      throw new ForbiddenException('Reviews can only be deleted within 3 days of creation');
    }

    await this.reviewRepository.softDelete(id);
  }

  async findByProduct(productId: number): Promise<Review[]> {
    return this.reviewRepository.find({
      where: { 
        ProductID: productId,
        DeletedAt: IsNull()
      },
      order: { CreatedAt: 'DESC' }
    });
  }

  async findByUser(userId: number): Promise<Review[]> {
    return this.reviewRepository.find({
      where: { 
        UserID: userId,
        DeletedAt: IsNull()
      },
      order: { CreatedAt: 'DESC' }
    });
  }
}