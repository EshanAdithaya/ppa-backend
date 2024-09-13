import { ApiProperty } from '@nestjs/swagger';

export class CreateExerciseDto {
  @ApiProperty({ example: 'Push-ups', description: 'The name of the exercise' })
  name: string;

  @ApiProperty({ example: 'Push-ups are a great exercise for the chest.', description: 'A description of the exercise' })
  description: string;

  @ApiProperty({ example: 'https://youtube.com/example', description: 'The YouTube link for the exercise' })
  youTubeLink: string;
}
