import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOfferDto {
  @ApiProperty({ example: 1, description: 'ID of the product' })
  @IsNotEmpty()
  productId: number;

  @ApiProperty({ example: 10, description: 'Discount value for the product' })
  @IsNotEmpty()
  discount: number;
}
