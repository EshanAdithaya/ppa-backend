// review.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    return this.reviewRepository.find();
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({ where: { ReviewID: id } });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found.`);
    }
    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const review = await this.findOne(id);
    
    // Update fields
    Object.assign(review, {
      Type: updateReviewDto.type !== undefined ? updateReviewDto.type : review.Type,
      Count: updateReviewDto.count !== undefined ? updateReviewDto.count : review.Count,
      Description: updateReviewDto.description !== undefined ? updateReviewDto.description : review.Description,
      ImageURL: updateReviewDto.imageURL !== undefined ? updateReviewDto.imageURL : review.ImageURL,
    });

    return this.reviewRepository.save(review);
  }

  async delete(id: number): Promise<void> {
    const result = await this.reviewRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Review with ID ${id} not found.`);
    }
  }

  async findByProduct(productId: number): Promise<Review[]> {
    return this.reviewRepository.find({
      where: { ProductID: productId },
    });
  }

  async findByUser(userId: number): Promise<Review[]> {
    return this.reviewRepository.find({
      where: { UserID: userId },
    });
  }
}