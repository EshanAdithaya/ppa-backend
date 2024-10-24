import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './offer.entity';
import { CreateOfferDto } from './create-offer.dto';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}

  async create(createOfferDto: CreateOfferDto): Promise<Offer> {
    const offer = this.offerRepository.create({
      productid: createOfferDto.productId,
      discount: createOfferDto.discount,
    });
    return this.offerRepository.save(offer);
  }

  async delete(id: number): Promise<void> {
    await this.offerRepository.delete(id);
  }

  async findAll(): Promise<Offer[]> {
    return this.offerRepository.find();
  }
}
