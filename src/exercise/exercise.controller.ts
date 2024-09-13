import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './create-exercise.dto';
import { UpdateExerciseDto } from './update-exercise.dto';

@ApiTags('exercises')
@ApiBearerAuth()
@Controller('exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new exercise' })
  @ApiResponse({ status: 201, description: 'The exercise has been created.' })
  createExercise(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exerciseService.create(createExerciseDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an exercise by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the exercise to fetch' })
  @ApiResponse({ status: 200, description: 'Exercise details.' })
  getExercise(@Param('id') id: number) {
    return this.exerciseService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all exercises' })
  @ApiResponse({ status: 200, description: 'List of all exercises.' })
  getAllExercises() {
    return this.exerciseService.findAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an exercise by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the exercise to update' })
  @ApiResponse({ status: 200, description: 'The exercise has been updated.' })
  updateExercise(@Param('id') id: number, @Body() updateExerciseDto: UpdateExerciseDto) {
    return this.exerciseService.update(id, updateExerciseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an exercise by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the exercise to delete' })
  @ApiResponse({ status: 200, description: 'The exercise has been deleted.' })
  deleteExercise(@Param('id') id: number) {
    return this.exerciseService.delete(id);
  }
}
