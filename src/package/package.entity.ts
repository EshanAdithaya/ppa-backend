import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('gym_package')
export class GymPackage {
  @ApiProperty({ example: 1, description: 'The auto-generated id of the package' })
  @PrimaryGeneratedColumn()
  Pack_id: number;

  @ApiProperty({ example: '1 Month', description: 'The duration of the package' })
  @Column()
  Duration: string;

  @ApiProperty({ example: 'Gym Access', description: 'The type of the package' })
  @Column()
  Type: string;

  @ApiProperty({ example: 100, description: 'The price of the package' })
  @Column()
  Price: number;

  @ApiProperty({ example: 'Basic Plan', description: 'The name of the package' })
  @Column()
  Name: string;

  @ApiProperty({ example: 'Access to gym equipment and locker', description: 'The features of the package' })
  @Column()
  Features: string;
}
