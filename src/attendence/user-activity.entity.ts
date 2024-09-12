import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user_activity')
export class UserActivity {
  @ApiProperty({ example: 1, description: 'The auto-generated id of the activity' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: 'ID of the user' })
  @Column()
  user_id: number;

  @ApiProperty({ example: '2024-09-12T14:34:56.789Z', description: 'Timestamp of when the activity was recorded' })
  @CreateDateColumn()
  access_time: Date;
}
