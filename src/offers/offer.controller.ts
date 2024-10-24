import { Controller, Post, Body, Delete, Param, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OfferService } from '../offers/offer.service';
import { CreateOfferDto } from './create-offer.dto';
import { Offer } from '../offers/offer.entity';

@ApiTags('offer')
@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new offer' })
  @ApiResponse({
    status: 201,
    description: 'The offer has been successfully created.',
    type: Offer,
  })
  create(@Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    return this.offerService.create(createOfferDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an offer' })
  @ApiResponse({
    status: 200,
    description: 'The offer has been successfully deleted.',
  })
  delete(@Param('id') id: number): Promise<void> {
    return this.offerService.delete(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all offers' })
  @ApiResponse({
    status: 200,
    description: 'All offers retrieved successfully.',
    type: [Offer],
  })
  getAll(): Promise<Offer[]> {
    return this.offerService.findAll();
  }
}
