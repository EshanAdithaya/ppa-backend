import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('exercises')
export class Exercise {
  @ApiProperty({ example: 1, description: 'The auto-generated ID of the exercise' })
  @PrimaryGeneratedColumn()
  ExerciseID: number;

  @ApiProperty({ example: 'Push-ups', description: 'The name of the exercise' })
  @Column()
  Name: string;

  @ApiProperty({ example: 'Push-ups are a great exercise for the chest.', description: 'A description of the exercise' })
  @Column('text')
  Description: string;

  @ApiProperty({ example: 'https://youtube.com/example', description: 'The YouTube link for the exercise' })
  @Column()
  YouTubeLink: string;

  @ApiProperty({ example: '2024-08-20T12:34:56.789Z', description: 'The timestamp of when the exercise was created' })
  @CreateDateColumn()
  CreatedAt: Date;
}
