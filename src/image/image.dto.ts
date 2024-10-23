// image.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateImageDto {
  @ApiProperty({ type: 'string', format: 'binary', description: 'Image file to upload' })
  @IsNotEmpty()
  file: any;
}