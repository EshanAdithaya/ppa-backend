import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('discounts')
export class Offer {
  @ApiProperty({ example: 1, description: 'The auto-generated id of the offer' })
  @PrimaryGeneratedColumn()
  discountid: number;

  @ApiProperty({ example: 1, description: 'ID of the product' })
  @Column()
  productid: number;

  @ApiProperty({ example: 10, description: 'Discount for the product' })
  @Column()
  discount: number;
}
