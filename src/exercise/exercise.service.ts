import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './exercise.entity';
import { CreateExerciseDto } from './create-exercise.dto';
import { UpdateExerciseDto } from './update-exercise.dto';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
  ) {}

  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    const exercise = this.exerciseRepository.create({
      Name: createExerciseDto.name,
      Description: createExerciseDto.description,
      YouTubeLink: createExerciseDto.youTubeLink,
    });
    return this.exerciseRepository.save(exercise);
  }

  async findAll(): Promise<Exercise[]> {
    return this.exerciseRepository.find();
  }

  async findOne(id: number): Promise<Exercise> {
    const exercise = await this.exerciseRepository.findOne({ where: { ExerciseID: id } });
    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found.`);
    }
    return exercise;
  }

  async update(id: number, updateExerciseDto: UpdateExerciseDto): Promise<Exercise> {
    const exercise = await this.findOne(id);
    Object.assign(exercise, updateExerciseDto);
    return this.exerciseRepository.save(exercise);
  }

  async delete(id: number): Promise<void> {
    const result = await this.exerciseRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Exercise with ID ${id} not found.`);
    }
  }
}
